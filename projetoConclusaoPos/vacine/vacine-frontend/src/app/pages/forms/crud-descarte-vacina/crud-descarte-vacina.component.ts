import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { GenericCrudMestreDetalheComponent } from 'src/app/components/generic-crud-mestre-detalhe/generic-crud-mestre-detalhe.component';
import { ControleAcessoService } from 'src/app/services/authentication/controle-acesso/controle-acesso.service';
import { UsuarioService } from 'src/app/services/crud/usuario/usuario.service';
import { VacinaService } from 'src/app/services/crud/vacina/vacina.service';
import { TemaAcessoUsuario } from 'src/app/shared/classes/acesso.class';
import { RelacionamentoUsuario } from 'src/app/shared/classes/relacionamento-usuario.class';
import { RelacionamentoVacina } from 'src/app/shared/classes/relacionamento-vacina.class';
import { MOTIVOS_DESCARTES_VACINAS } from 'src/app/shared/enums/motivo-descarte-vacina.enum';
import { DefinicaoColunasExibidas } from 'src/app/shared/interfaces/defincao-colunas-exibidas.interface';
import { ValidatorsUtil } from 'src/app/shared/utils/validators-util.util';
import { DescarteVacinaService } from './../../../services/crud/descarte-vacina/descarte-vacina.service';
import { TipoUsuario } from './../../../shared/enums/tipo-usuario.enum';
import { DescarteVacina } from './../../../shared/models/descarte-vacina.model';
import { ItemDescarteVacina } from './../../../shared/models/item-descarte.model';

@Component({
  selector: 'vacine-crud-descarte-vacina',
  templateUrl: './crud-descarte-vacina.component.html',
  styleUrls: ['./crud-descarte-vacina.component.scss'],
})
export class CrudDescarteVacinaComponent extends GenericCrudMestreDetalheComponent<
  DescarteVacina,
  ItemDescarteVacina
> {
  protected readonly nomeCtrlResponsavel = 'usuario_resp_descarte';
  protected readonly nomeCtrlVacina = 'vacina';

  protected readonly nomeAtributoExibirUsuario = 'nome';
  protected readonly nomeAtributoExibirVacina = 'nome';

  protected responsaveis: RelacionamentoUsuario[] = [];
  protected responsaveisFiltrados!: Observable<RelacionamentoUsuario[]>;

  protected vacinas: RelacionamentoVacina[] = [];
  protected vacinasFiltradas!: Observable<RelacionamentoVacina[]>;

  protected qtdMaxDoseDescartar: number | undefined;

  protected motivosDescarte = MOTIVOS_DESCARTES_VACINAS;

  constructor(
    protected override changeDetectorRef: ChangeDetectorRef,
    protected override media: MediaMatcher,
    protected override router: Router,
    protected override serviceAcesso: ControleAcessoService,
    protected override formBuilder: FormBuilder,
    protected override activatedRoute: ActivatedRoute,
    protected override dialogoConf: MatDialog,
    protected override service: DescarteVacinaService,
    private serviceVacina: VacinaService,
    private serviceUsuario: UsuarioService
  ) {
    super(
      changeDetectorRef,
      media,
      router,
      serviceAcesso,
      formBuilder,
      activatedRoute,
      dialogoConf,
      service
    );
  }

  protected getTemaAcesso(): TemaAcessoUsuario {
    return TemaAcessoUsuario.DESCARTE_VACINA;
  }

  protected definirColItensExibidas() {
    this.defColunasExibidas = [
      'vacina',
      'lote',
      'qtd_doses_descarte',
      '',
      'acoes',
    ];
  }

  protected getDefColDetalheExibidas(): DefinicaoColunasExibidas[] {
    return [
      { def: 'vacina' },
      { def: 'lote', showMobileResolution: false },
      { def: 'qtd_doses_descarte' },
      { def: 'acoes' },
    ];
  }

  protected override preencherFormComRegistroId(registro: any): void {
    super.preencherFormComRegistroId(registro);
    this.itens = registro.itens_descarte;
  }

  protected definirIdentificadoresEntidade() {
    this.nomeEntidade = 'descarte de vacina';
    this.pluralEntidade = 'descartes-vacinas';
    this.artigoEntidade = 'o';
    this.nomeCampoFormIdentificaEntidade = 'codigo';
  }

  protected buildFormMestre() {
    this.form = this.formBuilder.group({
      _id: [null],
      codigo: [null, ValidatorsUtil.getValidadorObrigatorioSemEspacos()],
      usuario_resp_descarte: [
        null,
        Validators.compose([
          ValidatorsUtil.getValidadorObrigatorioSemEspacos(),
          ValidatorsUtil.getValidatorValorExisteInpuAutoComplete(),
        ]),
      ],
      data_descarte: [null, ValidatorsUtil.getValidadorObrigatorioSemEspacos()],
      motivo_descarte: [null, Validators.required],
      justificativa_descarte: [
        null,
        ValidatorsUtil.getValidadorObrigatorioSemEspacos(),
      ],
      local_descarte: [
        null,
        ValidatorsUtil.getValidadorObrigatorioSemEspacos(),
      ],
    });
    this.setLookupResponsavel();
    this.itens = [];
  }

  protected buildFormDetalhe() {
    this.formItem = this.formBuilder.group({
      vacina: [
        null,
        Validators.compose([
          ValidatorsUtil.getValidadorObrigatorioSemEspacos(),
          ValidatorsUtil.getValidatorValorExisteInpuAutoComplete(),
        ]),
      ],
      lote: [null, ValidatorsUtil.getValidadorObrigatorioSemEspacos()],
      qtd_doses_descarte: [
        null,
        Validators.compose([
          ValidatorsUtil.getValidadorObrigatorioSemEspacos(),
          Validators.pattern('^[0-9]*$'),
          Validators.min(1),
        ]),
      ],
    });
    this.setLookupVacina();
  }

  private setLookupResponsavel() {
    this.subscription = this.serviceUsuario
      .getAllByTipoConverted<RelacionamentoUsuario>(
        [TipoUsuario.TECNICO_ENFERMAGEM, TipoUsuario.ADMINISTRADOR],
        RelacionamentoUsuario.usuarioToRelacionamentoUsuario
      )
      .subscribe({
        next: (lista) => {
          this.responsaveis = lista;
          this.responsaveis = lista.filter(
            (e) => e.tipo != TipoUsuario.CLIENTE
          );
          this.ordenarLookup(this.responsaveis);
          this.responsaveis.sort((a, b) => a.nome.localeCompare(b.nome));
          this.setChangeRespParaFiltrarValores();
        },
        error: (e) => {
          this.tratarErroCarregarLookup(e, this.nomeCtrlResponsavel);
        },
      });
  }

  private setLookupVacina() {
    this.subscription = this.serviceVacina
      .getAllConverted<RelacionamentoVacina>(
        RelacionamentoVacina.vacinaToRelacionamentoVacina
      )
      .subscribe({
        next: (listaVacina) => {
          this.vacinas = listaVacina;
          this.vacinas = this.vacinas.filter((e) => e.qtd_doses_estoque > 0);
          this.ordenarLookup(this.vacinas);
          this.setChangeVacinaParaFiltrarValores();
        },
        error: (e) => {
          this.tratarErroCarregarLookup(e, this.nomeCtrlVacina);
        },
      });
  }

  protected filtrarResponsavel(value: any) {
    this.filtrarPeloValorAtributo(
      this.form,
      this.responsaveis,
      value,
      this.nomeCtrlResponsavel,
      this.nomeAtributoExibirUsuario
    );
  }

  private setChangeRespParaFiltrarValores() {
    this.responsaveisFiltrados = this.getFormControl(
      this.form,
      this.nomeCtrlResponsavel
    ).valueChanges.pipe(
      startWith(''),
      map((value) =>
        this.filtrarPeloValorAtributo(
          this.form,
          this.responsaveis,
          value,
          this.nomeCtrlResponsavel,
          this.nomeAtributoExibirUsuario
        )
      )
    );
  }

  private setChangeVacinaParaFiltrarValores() {
    this.vacinasFiltradas = this.getFormControl(
      this.formItem,
      this.nomeCtrlVacina
    ).valueChanges.pipe(
      startWith(''),
      map((value) =>
        this.filtrarPeloValorAtributo(
          this.formItem,
          this.vacinas,
          value,
          this.nomeCtrlVacina,
          this.nomeAtributoExibirVacina
        )
      )
    );

    this.subscription = this.formItem.valueChanges.subscribe((value) => {
      const ctrlDoseDescarte = this.getFormControl(
        this.formItem,
        'qtd_doses_descarte'
      );
      if (this.getFormControl(this.formItem, 'vacina').valid) {
        this.qtdMaxDoseDescartar = value.vacina.qtd_doses_estoque;
        this.atualizarValidadores(
          ctrlDoseDescarte,
          Validators.compose([
            ValidatorsUtil.getValidadorObrigatorioSemEspacos(),
            Validators.pattern('^[0-9]*$'),
            Validators.min(1),
            Validators.max(this.qtdMaxDoseDescartar!),
          ])
        );
      } else {
        this.qtdMaxDoseDescartar = undefined;
        this.atualizarValidadores(
          ctrlDoseDescarte,
          Validators.compose([
            ValidatorsUtil.getValidadorObrigatorioSemEspacos(),
            Validators.pattern('^[0-9]*$'),
            Validators.min(1),
          ])
        );
      }
    });
  }

  protected getItemDetalheForm() {
    const item: ItemDescarteVacina = {
      vacina: this.getValorCampoForm(this.formItem, 'vacina'),
      lote: this.getValorCampoForm(this.formItem, 'lote'),
      qtd_doses_descarte: this.getValorCampoForm(
        this.formItem,
        'qtd_doses_descarte'
      ),
    };

    return item;
  }

  protected override getRegistroForm() {
    let descarte: DescarteVacina = new DescarteVacina();
    descarte._id = this.getValorCampoForm(this.form, '_id');
    descarte.codigo = this.getValorCampoForm(this.form, 'codigo');
    descarte.data_descarte = this.getValorCampoForm(this.form, 'data_descarte');
    descarte.motivo_descarte = this.getValorCampoForm(
      this.form,
      'motivo_descarte'
    );
    descarte.justificativa_descarte = this.getValorCampoForm(
      this.form,
      'justificativa_descarte'
    );
    descarte.local_descarte = this.getValorCampoForm(
      this.form,
      'local_descarte'
    );
    descarte.usuario_resp_descarte = this.getValorCampoForm(
      this.form,
      'usuario_resp_descarte'
    );
    descarte.itens_descarte = this.itens;

    return descarte;
  }

  protected calcularTotal(): number {
    const vlTot = this.itens
      .map((i) => i.qtd_doses_descarte)
      .reduce((acum, v) => acum + v, 0);

    return vlTot;
  }
}

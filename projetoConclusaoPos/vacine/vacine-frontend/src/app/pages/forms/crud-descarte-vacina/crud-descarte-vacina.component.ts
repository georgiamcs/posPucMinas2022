import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { map, Observable, startWith } from 'rxjs';
import { GenericCrudMestreDetalheComponent } from 'src/app/components/generic-crud-mestre-detalhe/generic-crud-mestre-detalhe.component';
import { UsuarioService } from 'src/app/services/crud/usuario/usuario.service';
import { VacinaService } from 'src/app/services/crud/vacina/vacina.service';
import { RelacionamentoUsuario } from 'src/app/shared/classes/relacionamento-usuario.class';
import { RelacionamentoVacina } from 'src/app/shared/classes/relacionamento-vacina.class';
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

  constructor(
    private ___router: Router,
    private ___deviceService: DeviceDetectorService,
    private __formBuilder: FormBuilder,
    private __activatedRoute: ActivatedRoute,
    private __dialogoConf: MatDialog,
    private __service: DescarteVacinaService,
    private serviceVacina: VacinaService,
    private serviceUsuario: UsuarioService
  ) {
    super(
      ___router,
      ___deviceService,
      __formBuilder,
      __activatedRoute,
      __dialogoConf,
      __service
    );
  }

  protected definirColItensExibidas() {
    this.defColunasExibidas = [
      'vacina',
      'lote',
      'qtd_doses_descarte',
      'justificativa_descarte',
      'acoes',
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
          Validators.min(0),
        ]),
      ],
      justificativa_descarte: [
        null,
        ValidatorsUtil.getValidadorObrigatorioSemEspacos(),
      ],
    });
    this.setLookupVacina();
  }

  private setLookupResponsavel() {
    this.subscription = this.serviceUsuario
      .getAllConverted<RelacionamentoUsuario>(
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
      this.responsaveis,
      value,
      this.nomeCtrlResponsavel,
      this.nomeAtributoExibirUsuario
    );
  }

  private setChangeRespParaFiltrarValores() {
    this.responsaveisFiltrados = this.getFormControl(
      this.nomeCtrlResponsavel
    ).valueChanges.pipe(
      startWith(''),
      map((value) =>
        this.filtrarPeloValorAtributo(
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
      this.nomeCtrlVacina,
      this.formItem
    ).valueChanges.pipe(
      startWith(''),
      map((value) =>
        this.filtrarPeloValorAtributo(
          this.vacinas,
          value,
          this.nomeCtrlVacina,
          this.nomeAtributoExibirVacina
        )
      )
    );

    this.subscription = this.formItem.valueChanges.subscribe((value) => {
      if (this.getFormControl('vacina', this.formItem).valid) {
        this.getFormControl('vl_item', this.formItem)?.patchValue(
          value.vacina.vl_atual_unit_dose,
          {
            emitEvent: false,
          }
        );
      } else {
        this.getFormControl('vl_item', this.formItem)?.patchValue(null, {
          emitEvent: false,
        });
      }
    });
  }

  protected getItemDetalheForm() {
    const item: ItemDescarteVacina = {
      vacina: this.getValorCampoForm('vacina', this.formItem),
      lote: this.getValorCampoForm('lote', this.formItem),
      qtd_doses_descarte: this.getValorCampoForm(
        'qtd_doses_descarte',
        this.formItem
      ),
      justificativa_descarte: this.getValorCampoForm(
        'justificativa_descarte',
        this.formItem
      ),
    };

    return item;
  }

  protected override getRegistroForm() {
    let descarte: DescarteVacina = new DescarteVacina();
    descarte._id = this.getValorCampoForm('_id');
    descarte.codigo = this.getValorCampoForm('codigo');
    descarte.data_descarte = this.getValorCampoForm('data_descarte');
    descarte.local_descarte = this.getValorCampoForm('local_descarte');
    descarte.usuario_resp_descarte = this.getValorCampoForm(
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

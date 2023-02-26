import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { GenericCrudMestreDetalheComponent } from 'src/app/components/generic-crud-mestre-detalhe/generic-crud-mestre-detalhe.component';
import { UsuarioService } from 'src/app/services/crud/usuario/usuario.service';
import { VacinaService } from 'src/app/services/crud/vacina/vacina.service';
import { RelacionamentoVacina } from 'src/app/shared/classes/relacionamento-vacina.class';
import { Vacinacao } from 'src/app/shared/models/vacinacao.model';
import { ValidatorsUtil } from 'src/app/shared/utils/validators-util.util';
import { VacinacaoService } from './../../../services/crud/vacinacao/vacinacao.service';
import { RelacionamentoUsuario } from './../../../shared/classes/relacionamento-usuario.class';
import { TipoUsuario } from './../../../shared/enums/tipo-usuario.enum';
import { ItemVacinacao } from './../../../shared/models/item-vacinacao.model';

@Component({
  selector: 'vacine-crud-vacinacao',
  templateUrl: './crud-vacinacao.component.html',
  styleUrls: ['./crud-vacinacao.component.scss'],
})
export class CrudVacinacaoComponent extends GenericCrudMestreDetalheComponent<
  Vacinacao,
  ItemVacinacao
> {
  protected readonly nomeCtrlCliente = 'usuario_cliente';
  protected readonly nomeCtrlAplicador = 'usuario_aplicador_vacina';
  protected readonly nomeCtrlVacina = 'vacina';

  protected readonly nomeAtributoExibirUsuario = 'nome';
  protected readonly nomeAtributoExibirVacina = 'nome';

  protected clientes: RelacionamentoUsuario[] = [];
  protected clientesFiltrados!: Observable<RelacionamentoUsuario[]>;

  protected aplicadores: RelacionamentoUsuario[] = [];
  protected aplicadoresFiltrados!: Observable<RelacionamentoUsuario[]>;

  protected vacinas: RelacionamentoVacina[] = [];
  protected vacinasFiltradas!: Observable<RelacionamentoVacina[]>;

  constructor(
    protected override changeDetectorRef: ChangeDetectorRef,
    protected override media: MediaMatcher,
    protected override router: Router,
    protected override formBuilder: FormBuilder,
    protected override activatedRoute: ActivatedRoute,
    protected override dialogoConf: MatDialog,
    protected override service: VacinacaoService,
    private serviceVacina: VacinaService,
    private serviceUsuario: UsuarioService
  ) {
    super(
      changeDetectorRef,
      media,
      router,
      formBuilder,
      activatedRoute,
      dialogoConf,
      service
    );
  }

  protected definirColItensExibidas() {
    this.defColunasExibidas = [
      'vacina',
      'lote',
      'data_validade',
      'vl_item',
      'acoes',
    ];
  }

  protected override preencherFormComRegistroId(registro: Vacinacao): void {
    super.preencherFormComRegistroId(registro);
    this.itens = registro.itens_vacinacao;
  }

  protected definirIdentificadoresEntidade() {
    this.nomeEntidade = 'vacinação';
    this.pluralEntidade = 'vacinacoes';
    this.artigoEntidade = 'a';
    this.nomeCampoFormIdentificaEntidade = 'codigo';
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
      data_validade: [null, ValidatorsUtil.getValidadorObrigatorioSemEspacos()],
      vl_item: [null, ValidatorsUtil.getValidadorObrigatorioSemEspacos()],
    });
    this.setLookupVacina();
  }

  protected buildFormMestre() {
    this.form = this.formBuilder.group({
      _id: [null],
      codigo: [null, ValidatorsUtil.getValidadorObrigatorioSemEspacos()],
      data_aplicacao: [
        null,
        ValidatorsUtil.getValidadorObrigatorioSemEspacos(),
      ],
      usuario_cliente: [
        null,
        Validators.compose([
          ValidatorsUtil.getValidadorObrigatorioSemEspacos(),
          ValidatorsUtil.getValidatorValorExisteInpuAutoComplete(),
        ]),
      ],
      usuario_aplicador_vacina: [
        null,
        Validators.compose([
          ValidatorsUtil.getValidadorObrigatorioSemEspacos(),
          ValidatorsUtil.getValidatorValorExisteInpuAutoComplete(),
        ]),
      ],
    });
    this.setLookupCliente();
    this.setLookupAplicador();
    this.itens = [];
  }

  private setLookupCliente() {
    this.subscription = this.serviceUsuario
      .getAllConverted<RelacionamentoUsuario>(
        RelacionamentoUsuario.usuarioToRelacionamentoUsuario
      )
      .subscribe({
        next: (lista) => {
          this.clientes = lista;
          this.ordenarLookup(this.clientes);
          this.setChangeClienteParaFiltrarValores();
        },
        error: (e) => {
          this.tratarErroCarregarLookup(e, this.nomeCtrlCliente);
        },
      });
  }

  private setLookupAplicador() {
    this.subscription = this.serviceUsuario
      .getAllByTipoConverted<RelacionamentoUsuario>(
        TipoUsuario.TECNICO_ENFERMAGEM,
        RelacionamentoUsuario.usuarioToRelacionamentoUsuario
      )
      .subscribe({
        next: (lista) => {
          this.aplicadores = lista;
          this.ordenarLookup(this.aplicadores);
          this.setChangeAplicadorParaFiltrarValores();
        },
        error: (e) => {
          this.tratarErroCarregarLookup(e, this.nomeCtrlAplicador);
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

  private setChangeClienteParaFiltrarValores() {
    this.clientesFiltrados = this.getFormControl(
      this.nomeCtrlCliente
    ).valueChanges.pipe(
      startWith(''),
      map((value) =>
        this.filtrarPeloValorAtributo(
          this.clientes,
          value,
          this.nomeCtrlCliente,
          this.nomeAtributoExibirUsuario
        )
      )
    );
  }

  private setChangeAplicadorParaFiltrarValores() {
    this.aplicadoresFiltrados = this.getFormControl(
      this.nomeCtrlAplicador
    ).valueChanges.pipe(
      startWith(''),
      map((value) =>
        this.filtrarPeloValorAtributo(
          this.aplicadores,
          value,
          this.nomeCtrlAplicador,
          this.nomeAtributoExibirUsuario
        )
      )
    );
  }

  protected filtrarCliente(value: any) {
    this.filtrarPeloValorAtributo(
      this.clientes,
      value,
      this.nomeCtrlCliente,
      this.nomeAtributoExibirUsuario
    );
  }

  protected filtrarAplicador(value: any) {
    this.filtrarPeloValorAtributo(
      this.aplicadores,
      value,
      this.nomeCtrlAplicador,
      this.nomeAtributoExibirUsuario
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

  protected getItemDetalheForm(): ItemVacinacao {
    const item: ItemVacinacao = {
      vacina: this.getValorCampoForm('vacina', this.formItem),
      lote: this.getValorCampoForm('lote', this.formItem),
      data_validade: this.getValorCampoForm('data_validade', this.formItem),
      vl_item: this.getValorCampoForm('vl_item', this.formItem),
    };

    return item;
  }

  protected override getRegistroForm(): Vacinacao {
    let vacinacao: Vacinacao = new Vacinacao();
    vacinacao._id = this.getValorCampoForm('_id');
    vacinacao.codigo = this.getValorCampoForm('codigo');
    vacinacao.data_aplicacao = this.getValorCampoForm('data_aplicacao');
    vacinacao.usuario_cliente = this.getValorCampoForm('usuario_cliente');
    vacinacao.usuario_aplicador_vacina = this.getValorCampoForm(
      'usuario_aplicador_vacina'
    );
    vacinacao.vl_total = this.calcularTotal();
    vacinacao.itens_vacinacao = this.itens;

    return vacinacao;
  }

  protected calcularTotal(): number {
    const vlTot = this.itens
      .map((i) => i.vl_item)
      .reduce((acum, v) => acum + v, 0);

    return vlTot;
  }
}

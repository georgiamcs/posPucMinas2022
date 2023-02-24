import { TipoUsuario } from './../../../shared/enums/tipo-usuario.enum';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { map, Observable, startWith } from 'rxjs';
import { GenericCrudComLookupComponent } from 'src/app/components/generic-crud-com-lookup/generic-crud-com-lookup.component';
import { UsuarioService } from 'src/app/services/crud/usuario/usuario.service';
import { VacinaService } from 'src/app/services/crud/vacina/vacina.service';
import { RelacionamentoVacina } from 'src/app/shared/classes/relacionamento-vacina.class';
import { CompraVacina } from 'src/app/shared/models/compra-vacina.model';
import { ItemCompraVacina } from 'src/app/shared/models/item-compra-vacina.model';
import { Vacinacao } from 'src/app/shared/models/vacinacao.model';
import { ValidatorsUtil } from 'src/app/shared/utils/validators-util.util';
import { VacinacaoService } from './../../../services/crud/vacinacao/vacinacao.service';
import { RelacionamentoUsuario } from './../../../shared/classes/relacionamento-usuario.class';
import { ItemVacinacao } from './../../../shared/models/item-vacinacao.model';

@Component({
  selector: 'vacine-crud-vacinacao',
  templateUrl: './crud-vacinacao.component.html',
  styleUrls: ['./crud-vacinacao.component.scss'],
})
export class CrudVacinacaoComponent extends GenericCrudComLookupComponent<Vacinacao> {
  protected readonly nomeCtrlCliente = 'usuario_cliente';
  protected readonly nomeCtrlAplicador = 'usuario_aplicador_vacina';
  protected readonly nomeCtrlVacina = 'vacina';

  protected readonly nomeAtributoExibirUsuario = 'nome';
  protected readonly nomeAtributoExibirVacina = 'nome';

  protected formItem: FormGroup;

  protected clientes: RelacionamentoUsuario[] = [];
  protected clientesFiltrados!: Observable<RelacionamentoUsuario[]>;

  protected aplicadores: RelacionamentoUsuario[] = [];
  protected aplicadoresFiltrados!: Observable<RelacionamentoUsuario[]>;

  protected vacinas: RelacionamentoVacina[] = [];
  protected vacinasFiltradas!: Observable<RelacionamentoVacina[]>;

  protected itens: ItemVacinacao[] = [];

  protected adicionando = false;

  protected defColunasExibidas = [
    'vacina',
    'lote',
    'data_validade',
    'vl_item',
    'acoes',
  ];

  constructor(
    private __router: Router,
    private __deviceService: DeviceDetectorService,
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _dialogoConf: MatDialog,
    private _service: VacinacaoService,
    private serviceVacina: VacinaService,
    private serviceUsuario: UsuarioService
  ) {
    super(
      __router,
      __deviceService,
      _activatedRoute,
      _formBuilder,
      _dialogoConf,
      _service
    );

    this.definirIdentificadoresEntidade();
    this.preencherAtributosGenericosCrud();
  }

  protected override preencherFormComRegistroId(registro: any): void {
    super.preencherFormComRegistroId(registro);
    this.itens = registro.itens_vacinacao;
  }

  private definirIdentificadoresEntidade() {
    this.nomeEntidade = 'vacinação';
    this.pluralEntidade = 'vacinacoes';
    this.artigoEntidade = 'a';
    this.nomeCampoFormIdentificaEntidade = 'codigo';
  }

  protected override buildForm() {
    this.buildFormVacinacao();
    this.buildFormItens();
  }

  private buildFormItens() {
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

  private buildFormVacinacao() {
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
  }

  protected exibirTextoLookup(v: any): string {
    if (v) {
      return v.nome ? v.nome : '';
    } else {
      return '';
    }
  }

  protected getItemCompraForm() {
    const item: ItemVacinacao = {
      vacina: this.getValorCampoForm('vacina', this.formItem),
      lote: this.getValorCampoForm('lote', this.formItem),
      data_validade: this.getValorCampoForm('data_validade', this.formItem),
      vl_item: this.getValorCampoForm('vl_item', this.formItem),
    };

    return item;
  }

  protected override getRegistroForm() {
    let vacinacao: Vacinacao = new Vacinacao();
    vacinacao._id = this.getValorCampoForm('_id');
    vacinacao.codigo = this.getValorCampoForm('codigo');
    vacinacao.data_aplicacao = this.getValorCampoForm('data_aplicacao');
    vacinacao.usuario_cliente = this.getValorCampoForm('cliente');
    vacinacao.usuario_aplicador_vacina = this.getValorCampoForm('aplicador');
    vacinacao.vl_total = this.calcularTotal();
    vacinacao.itens_vacinacao = this.itens;

    return vacinacao;
  }

  protected adicionarItem() {
    const novoItem = this.getItemCompraForm();
    this.itens.push(novoItem);
    this.atualizarListaItens();
    this.limparFormItens();
  }

  protected limparFormItens() {
    this.formItem.reset();
  }

  protected setAdicionando(v: boolean) {
    this.adicionando = v;
  }

  protected fecharAdicionarItem() {
    this.setAdicionando(false);
    this.limparFormItens();
  }

  protected excluirItem(registro: ItemVacinacao) {
    this.itens.splice(this.itens.indexOf(registro), 1);
    this.atualizarListaItens();
  }

  protected calcularTotal(): number {
    const vlTot = this.itens
      .map((i) => i.vl_item)
      .reduce((acum, v) => acum + v, 0);

    return vlTot;
  }

  protected atualizarListaItens() {
    this.itens = [...this.itens];
  }

  protected override limparFormulario(): void {
    super.limparFormulario();
    this.limparFormItens();
    this.itens = [];
  }
}

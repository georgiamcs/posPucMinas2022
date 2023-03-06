import { Vacinacao } from '../../../shared/models/vacinacao.model';
import { VacinacaoService } from '../../../services/crud/vacinacao/vacinacao.service';
import { CompraVacina } from '../../../shared/models/compra-vacina.model';
import { CompraVacinaService } from '../../../services/crud/compra-vacina/compra-vacina.service';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { MediaMatcher } from '@angular/cdk/layout';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { GenericPageFormComponent } from 'src/app/components/generic-page-form/generic-page-form.component';
import { DescarteVacinaService } from 'src/app/services/crud/descarte-vacina/descarte-vacina.service';
import { BaseChartDirective } from 'ng2-charts';
import { DescarteVacina } from 'src/app/shared/models/descarte-vacina.model';
import { ControleAcessoService } from 'src/app/services/authentication/controle-acesso/controle-acesso.service';
import { TemaAcessoUsuario } from 'src/app/shared/classes/acesso.class';

class QtdDosesMes {
  mes: number;
  qtd_doses: number;
}

interface KeyMesValueQtdDose {
  [mes: number]: number;
}

@Component({
  selector: 'vacine-relacao-doses-compradas-aplicadas-descartadas',
  templateUrl: './relacao-doses-compradas-aplicadas-descartadas.component.html',
  styleUrls: ['./relacao-doses-compradas-aplicadas-descartadas.component.scss'],
})
export class RelacaoDosesCompradasAplicadasDescartadasComponent extends GenericPageFormComponent {
  todosDescartes: DescarteVacina[] = [];
  descartesFiltrados: DescarteVacina[] = [];
  dataDescartes: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  todasCompras: CompraVacina[] = [];
  comprasFiltradas: CompraVacina[] = [];
  dataCompras: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  todasVacinacoes: Vacinacao[] = [];
  vacinacoesFiltradas: Vacinacao[];
  dataVacinacoes: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  anosDistintos: number[];

  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;

  constructor(
    protected override changeDetectorRef: ChangeDetectorRef,
    protected override media: MediaMatcher,
    protected override router: Router,
    protected override serviceAcesso: ControleAcessoService,
    protected override formBuilder: FormBuilder,
    private serviceDescarte: DescarteVacinaService,
    private serviceCompra: CompraVacinaService,
    private serviceVacinacao: VacinacaoService
  ) {
    super(changeDetectorRef, media, router, serviceAcesso, formBuilder);
  }

  protected buildForm(): void {
    this.form = this.formBuilder.group({
      ano: [null],
    });
  }

  protected getTemaAcesso(): TemaAcessoUsuario {
    return TemaAcessoUsuario.INDICADORES;
  }

  protected getLineChartData() {
    let lineChartData: ChartConfiguration<'line'>['data'] = {
      labels: [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
      ],
      datasets: [
        {
          data: this.dataDescartes,
          label: 'Qtd. Doses Descartadas',
          fill: false,
          tension: 0.5,
          // backgroundColor: 'rgba(114, 37, 128, 0.8)',
          // borderColor: 'rgba(114, 37, 128, 0.8)',
        },
        {
          data: this.dataCompras,
          label: 'Qtd. Doses Compradas',
          fill: false,
          tension: 0.5,
          // backgroundColor: 'rgba(22, 22, 134, 0.8)',
          // borderColor: 'rgba(22, 22, 134, 0.8)',
        },
        {
          data: this.dataVacinacoes,
          label: 'Qtd. Doses Aplicadas',
          fill: false,
          tension: 0.5,
          // backgroundColor: 'rgba(0, 164, 0, 0.96)',
          // borderColor: 'rgba(0, 164, 0, 0.96)',
        },
      ],
    };

    return lineChartData;
  }

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false,
  };
  public lineChartLegend = true;

  override ngOnInit(): void {
    super.ngOnInit();
    this.carregarTodosDescartes();
  }

  private limparDataSets() {
    this.dataCompras = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.dataDescartes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.dataVacinacoes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  }

  private carregarTodosDescartes() {
    this.subscriptions.push( this.serviceDescarte.getAll().subscribe({
      next: (lista) => {
        this.todosDescartes = lista;
        this.carregarTodasCompras();
      },
      error: (erro) =>
        this.tratarErro(`Erro ao carregar descartes => ${erro.message}`, false),
    }));
  }

  private carregarTodasCompras() {
    this.subscriptions.push(this.serviceCompra.getAll().subscribe({
      next: (lista) => {
        this.todasCompras = lista;
        this.carregarTodasVacinacoes();
      },
      error: (erro) =>
        this.tratarErro(`Erro ao carregar compras => ${erro.message}`, false),
    }));
  }

  private carregarTodasVacinacoes() {
    this.subscriptions.push(this.serviceVacinacao.getAll().subscribe({
      next: (lista) => {
        this.todasVacinacoes = lista;
        this.carregarAnos();
      },
      error: (erro) =>
        this.tratarErro(
          `Erro ao carregar vacinações => ${erro.message}`,
          false
        ),
    }));
  }

  protected carregarAnos() {
    let ano: number;
    let anosDescarte = this.todosDescartes.map((d) => {
      const data = new Date(d.data_descarte + '');
      ano = data.getFullYear();
      return ano;
    });

    let anosCompras = this.todasCompras.map((d) => {
      const data = new Date(d.data_compra + '');
      ano = data.getFullYear();
      return ano;
    });

    let anosVacinacao = this.todasVacinacoes.map((d) => {
      const data = new Date(d.data_aplicacao + '');
      ano = data.getFullYear();
      return ano;
    });

    let setAnosDistintos = new Set(anosDescarte);
    anosCompras.forEach((a) => setAnosDistintos.add(a));
    anosVacinacao.forEach((a) => setAnosDistintos.add(a));

    this.anosDistintos = Array.from(setAnosDistintos).sort((a, b) => b - a);
  }

  protected gerarGrafico() {
    const anoSelecionado = this.getValorCampoForm(this.form, 'ano');

    if (anoSelecionado) {
      this.limparDataSets();
      this.agregarDados(anoSelecionado);
      this.dataDescartes = [...this.dataDescartes];
      this.dataCompras = [...this.dataCompras];
      this.dataVacinacoes = [...this.dataVacinacoes];
      this.chart.update();
    }
  }

  private filtrarDadosAno(array: any[], nomCampoData: string, pAno: number) {
    let ret: any[];
    let dt: Date;
    let ano: number;

    ret = array.filter((e) => {
      dt = new Date(e[nomCampoData] + '');
      ano = dt.getFullYear();
      return ano == pAno;
    });

    return ret;
  }

  private convertToArrayQtdDosesMes(
    array: any[],
    nomCampoData: string,
    nomCampoItens: string,
    nomCampoQtdDoses: string
  ): QtdDosesMes[] {
    let ret: QtdDosesMes[] = [];

    for (let index = 0; index < array.length; index++) {
      const elem = array[index];
      const dt = new Date(elem[nomCampoData] + '');
      const mes = dt.getMonth();
      const qtdTotalDoses = elem[nomCampoItens].reduce(
        (soma: number, i: any) => soma + i[nomCampoQtdDoses],
        0
      );

      let i = new QtdDosesMes();
      i.mes = mes;
      i.qtd_doses = qtdTotalDoses;

      ret.push(i);
    }

    return ret;
  }

  private agregaQtdDosesPorMes(array: QtdDosesMes[]): KeyMesValueQtdDose {
    let ret: KeyMesValueQtdDose;

    ret = array.reduce((agregacao: KeyMesValueQtdDose, item) => {
      if (!agregacao[item.mes]) {
        agregacao[item.mes] = 0;
      }
      agregacao[item.mes] += item.qtd_doses;
      return agregacao;
    }, {});

    return ret;
  }

  protected agregarDados(pAno: number) {
    let descartesAgregQtdDoses: QtdDosesMes[] = [];
    let comprasAgregQtdDoses: QtdDosesMes[] = [];
    let vacinacoesAgregQtdDoses: QtdDosesMes[] = [];

    this.descartesFiltrados = this.filtrarDadosAno(
      this.todosDescartes,
      'data_descarte',
      pAno
    );
    this.comprasFiltradas = this.filtrarDadosAno(
      this.todasCompras,
      'data_compra',
      pAno
    );
    this.vacinacoesFiltradas = this.filtrarDadosAno(
      this.todasVacinacoes,
      'data_aplicacao',
      pAno
    );

    descartesAgregQtdDoses = this.convertToArrayQtdDosesMes(
      this.descartesFiltrados,
      'data_descarte',
      'itens_descarte',
      'qtd_doses_descarte'
    );
    const descartesAgregMes = this.agregaQtdDosesPorMes(descartesAgregQtdDoses);
    Object.entries(descartesAgregMes).forEach(([mes, qtd]) => {
      this.dataDescartes[+mes] = qtd;
    });

    comprasAgregQtdDoses = this.convertToArrayQtdDosesMes(
      this.comprasFiltradas,
      'data_compra',
      'itens_compra',
      'qtd_doses'
    );
    const comprasAgregMes = this.agregaQtdDosesPorMes(comprasAgregQtdDoses);
    Object.entries(comprasAgregMes).forEach(([mes, qtd]) => {
      this.dataCompras[+mes] = qtd;
    });

    vacinacoesAgregQtdDoses = this.convertToArrayQtdDosesMes(
      this.vacinacoesFiltradas,
      'data_aplicacao',
      'itens_vacinacao',
      'qtd_doses'
    );
    const vacinacoesAgregMes = this.agregaQtdDosesPorMes(
      vacinacoesAgregQtdDoses
    );
    Object.entries(vacinacoesAgregMes).forEach(([mes, qtd]) => {
      this.dataVacinacoes[+mes] = qtd;
    });
  }
}

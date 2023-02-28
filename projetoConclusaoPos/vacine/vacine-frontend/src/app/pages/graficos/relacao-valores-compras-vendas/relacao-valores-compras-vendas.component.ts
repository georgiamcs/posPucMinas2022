import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { GenericPageFormComponent } from 'src/app/components/generic-page-form/generic-page-form.component';
import { CompraVacinaService } from 'src/app/services/crud/compra-vacina/compra-vacina.service';
import { VacinacaoService } from 'src/app/services/crud/vacinacao/vacinacao.service';
import { CompraVacina } from 'src/app/shared/models/compra-vacina.model';
import { Vacinacao } from 'src/app/shared/models/vacinacao.model';

class ValorMes {
  mes: number;
  valor: number;
}

interface KeyMesValue {
  [mes: number]: number;
}

@Component({
  selector: 'vacine-relacao-valores-compras-vendas',
  templateUrl: './relacao-valores-compras-vendas.component.html',
  styleUrls: ['./relacao-valores-compras-vendas.component.scss'],
})
export class RelacaoValoresComprasVendasComponent extends GenericPageFormComponent {
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
    protected override formBuilder: FormBuilder,
    private serviceCompra: CompraVacinaService,
    private serviceVacinacao: VacinacaoService
  ) {
    super(changeDetectorRef, media, router, formBuilder);
  }

  protected buildForm(): void {
    this.form = this.formBuilder.group({
      ano: [null],
    });
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
          data: this.dataCompras,
          label: 'Compras (R$)',
          fill: false,
          tension: 0.5,
          // backgroundColor: 'rgba(22, 22, 134, 0.8)',
          // borderColor: 'rgba(22, 22, 134, 0.8)',
        },
        {
          data: this.dataVacinacoes,
          label: 'Vendas (R$)',
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
    this.carregarTodasCompras();
  }

  private limparDataSets() {
    this.dataCompras = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.dataVacinacoes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  }

  private carregarTodasCompras() {
    this.subscription = this.serviceCompra.getAll().subscribe({
      next: (lista) => {
        this.todasCompras = lista;
        this.carregarTodasVacinacoes();
      },
      error: (erro) =>
        this.tratarErro(`Erro ao carregar compras => ${erro.message}`, false),
    });
  }

  private carregarTodasVacinacoes() {
    this.subscription = this.serviceVacinacao.getAll().subscribe({
      next: (lista) => {
        this.todasVacinacoes = lista;
        this.carregarAnos();
      },
      error: (erro) =>
        this.tratarErro(
          `Erro ao carregar vacinações => ${erro.message}`,
          false
        ),
    });
  }

  protected carregarAnos() {
    let ano: number;

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

    let setAnosDistintos = new Set(anosCompras);
    anosVacinacao.forEach((a) => setAnosDistintos.add(a));

    this.anosDistintos = Array.from(setAnosDistintos).sort((a, b) => b - a);
  }

  protected gerarGrafico() {
    const anoSelecionado = this.getValorCampoForm(this.form, 'ano');

    if (anoSelecionado) {
      this.limparDataSets();
      this.agregarDados(anoSelecionado);
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

  private convertToArrayValorMes(
    array: any[],
    nomCampoData: string,
    nomCampoValor: string
  ): ValorMes[] {
    let ret: ValorMes[] = [];

    for (let index = 0; index < array.length; index++) {
      const elem = array[index];
      const dt = new Date(elem[nomCampoData] + '');
      const mes = dt.getMonth();
      const vl = elem[nomCampoValor];

      let i = new ValorMes();
      i.mes = mes;
      i.valor = vl;

      ret.push(i);
    }

    return ret;
  }

  private agregaValoresPorMes(array: ValorMes[]): KeyMesValue {
    let ret: KeyMesValue;

    ret = array.reduce((agregacao: KeyMesValue, item) => {
      if (!agregacao[item.mes]) {
        agregacao[item.mes] = 0;
      }
      agregacao[item.mes] += item.valor;
      return agregacao;
    }, {});

    return ret;
  }

  protected agregarDados(pAno: number) {
    let comprasAgregQtdDoses: ValorMes[] = [];
    let vacinacoesAgregQtdDoses: ValorMes[] = [];

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

    comprasAgregQtdDoses = this.convertToArrayValorMes(
      this.comprasFiltradas,
      'data_compra',
      'vl_total_compra'
    );
    const comprasAgregMes = this.agregaValoresPorMes(comprasAgregQtdDoses);
    Object.entries(comprasAgregMes).forEach(([mes, qtd]) => {
      this.dataCompras[+mes] = qtd;
    });

    vacinacoesAgregQtdDoses = this.convertToArrayValorMes(
      this.vacinacoesFiltradas,
      'data_aplicacao',
      'vl_total'
    );
    const vacinacoesAgregMes = this.agregaValoresPorMes(
      vacinacoesAgregQtdDoses
    );
    Object.entries(vacinacoesAgregMes).forEach(([mes, qtd]) => {
      this.dataVacinacoes[+mes] = qtd;
    });
  }
}

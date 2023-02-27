import { MediaMatcher } from '@angular/cdk/layout';
import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { GenericPageFormComponent } from 'src/app/components/generic-page-form/generic-page-form.component';
import { getDescMotivoDescarteVacina } from 'src/app/shared/enums/motivo-descarte-vacina.enum';
import { ValidatorsUtil } from 'src/app/shared/utils/validators-util.util';
import { DescarteVacinaService } from './../../../services/crud/descarte-vacina/descarte-vacina.service';
import { DescarteVacina } from './../../../shared/models/descarte-vacina.model';

class AgregaDescarteItens {
  ano: number;
  mes: number;
  motivo: string;
  qtd_doses_descarte: number;
}

class AgregaQtdDescartePorMotivo {
  [motivo: string]: number;
}

interface AgregacaoPorMotivo {
  [motivo: string]: number;
}

@Component({
  selector: 'vacine-distribuicao-motivos-descarte-vacina',
  templateUrl: './distribuicao-motivos-descarte-vacina.component.html',
  styleUrls: ['./distribuicao-motivos-descarte-vacina.component.scss'],
})
export class DistribuicaoMotivosDescarteVacinaComponent
  extends GenericPageFormComponent
  implements OnInit, OnDestroy
{
  todosRegistros: DescarteVacina[];
  registrosFiltrados: DescarteVacina[];

  dsDescarteSomaQtd: AgregaDescarteItens[];
  anosDistintos: Set<number>;
  listaMotivos: string[];
  listaQtdDoses: number[];
  pieChartDatasets: any[];
  pieChartLabels: string[];

  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;

  constructor(
    protected override changeDetectorRef: ChangeDetectorRef,
    protected override media: MediaMatcher,
    protected override router: Router,
    protected override formBuilder: FormBuilder,
    private service: DescarteVacinaService
  ) {
    super(changeDetectorRef, media, router, formBuilder);
  }

  protected buildForm(): void {
    this.form = this.formBuilder.group({
      ano: [null, ValidatorsUtil.getValidadorObrigatorioSemEspacos()],
    });
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.carregarTodosRegistros();
  }

  private carregarTodosRegistros() {
    this.subscription = this.service.getAll().subscribe({
      next: (lista) => {
        this.todosRegistros = lista;
        this.carregarAnos();
        this.agregarDados();
      },
      error: (erro) =>
        this.tratarErro(`Erro ao carregar dados => ${erro.message}`, false),
    });
  }

  protected carregarAnos() {
    let ano: number;
    let anosDescarte = this.todosRegistros.map((d) => {
      const data = new Date(d.data_descarte + '');
      ano = data.getFullYear();
      return ano;
    });

    this.anosDistintos = new Set(anosDescarte);
  }

  protected gerarGrafico(ano: number) {
    this.agregarDados(ano);
    this.chart.update();
  }

  protected agregarDados(pAno?: number) {
    let ano: number;
    let mes: number;
    let qtdDosesDescarte: number;
    let dadoAgregadoItens: AgregaDescarteItens[] = [];

    if (pAno) {
      this.registrosFiltrados = this.todosRegistros.filter((r) => {
        const data = new Date(r.data_descarte + '');
        ano = data.getFullYear();
        return ano == pAno;
      });
    } else {
      this.registrosFiltrados = [...this.todosRegistros];
    }

    for (let index = 0; index < this.registrosFiltrados.length; index++) {
      const r = this.registrosFiltrados[index];
      const data = new Date(r.data_descarte + '');

      ano = data.getFullYear();
      mes = data.getMonth();
      qtdDosesDescarte = r.itens_descarte.reduce(
        (soma, i) => soma + i.qtd_doses_descarte,
        0
      );

      const i = new AgregaDescarteItens();
      i.ano = ano;
      i.mes = mes;
      i.motivo = r.motivo_descarte;
      i.qtd_doses_descarte = qtdDosesDescarte;

      dadoAgregadoItens.push(i);
    }

    const agregacaoPorMotivo = dadoAgregadoItens.reduce(
      (agregacao: AgregacaoPorMotivo, item) => {
        if (!agregacao[item.motivo]) {
          agregacao[item.motivo] = 0;
        }
        agregacao[item.motivo] += item.qtd_doses_descarte;
        return agregacao;
      },
      {}
    );

    const agregacaoPorMotivoArray = Object.entries(agregacaoPorMotivo).map(
      ([motivo, qtd]) => ({
        motivo,
        qtd_doses_descarte: qtd,
      })
    );

    this.listaMotivos = agregacaoPorMotivoArray.map((i) => i.motivo);
    this.listaQtdDoses = agregacaoPorMotivoArray.map(
      (i) => i.qtd_doses_descarte
    );

    this.pieChartDatasets = [{ data: this.listaQtdDoses }];
    this.pieChartLabels = this.listaMotivos.map((i) =>
      getDescMotivoDescarteVacina(i)
    );
  }

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };

  public pieChartLegend = true;
  public pieChartPlugins = [];
}

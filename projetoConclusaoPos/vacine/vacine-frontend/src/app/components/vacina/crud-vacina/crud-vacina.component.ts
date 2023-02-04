//TODO: Validar campos obrigatorios
//TODO: Verificar porque nao esta funcionando qnd nao marca idade recomendada
//TODO: Verificar porque nao esta funcionando qnd marca idade anos
//TODO: Desabilitar tipo e idade recomendada se nao tem idade recomendada
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { VacinaService } from './../../../services/vacina/vacina.service';
import { DialogoConfirmacaoComponent } from './../../lib/dialogo-confirmacao/dialogo-confirmacao.component';

import { Vacina } from '../../../shared/models/vacina.model';
import {
  definirModoFormulario,
  definirLabelBotaoAcaoModoFormulario,
  definirLabelBotaoFecharModoFormulario,
  ModoFormulario,
} from 'src/app/shared/enums/modo-formulario-enum';

@Component({
  selector: 'app-crud-vacina',
  templateUrl: './crud-vacina.component.html',
  styleUrls: ['./crud-vacina.component.scss'],
})
export class CrudVacinaComponent implements OnInit {
  form: FormGroup;
  modoFormulario: ModoFormulario = ModoFormulario.INCLUSAO;
  lbBotaoSalvar: string | null;
  lbBotaoFechar: string | null;

  idVacina: string | null;

  private ROTULO_BOTAO_ACEITAR = 'Sim';
  private ROTULO_BOTAO_REJEITAR = 'Não';

  constructor(
    private vacinaService: VacinaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    public dialogoConf: MatDialog
  ) {
    this.idVacina = this.activatedRoute.snapshot.paramMap.get('id');
    this.modoFormulario = definirModoFormulario(this.idVacina, this.router.url);
    this.lbBotaoSalvar = definirLabelBotaoAcaoModoFormulario(
      this.modoFormulario
    );
    this.lbBotaoFechar = definirLabelBotaoFecharModoFormulario(
      this.modoFormulario
    );
  }

  private preencherFormulario(vacina: Vacina): void {
    this.form.patchValue(vacina);
    this.verificarIdadeRecomendada();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      _id: [null],
      tx_nome: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(/(.|\s)*\S(.|\s)*/),
        ]),
      ],
      tx_protecao_contra: [null, [Validators.required]],
      tx_composicao: [null, [Validators.required]],
      in_idade_recomendada: [true, [Validators.required]],
      tp_idade_recomendada: [null],
      nr_idade_recomendada: [null],
    });
  }

  private carregarDadosId() {
    if (this.modoFormulario != ModoFormulario.INCLUSAO) {
      if (this.idVacina) {
        this.vacinaService
          .procurarPorId(this.idVacina)
          .subscribe((vacinaBusca) => this.preencherFormulario(vacinaBusca));
      }
    }
  }

  ngOnInit(): void {
    this.buildForm();
    this.carregarDadosId();
    this.somenteLeitura() ? this.form.disable() : this.form.enable();
    this.verificarIdadeRecomendada();
  }

  private incluirVacina() {
    this.vacinaService
      .incluir(this.form.value)
      .subscribe(() => this.carregarVacinas());
  }

  private alterarVacina() {
    this.vacinaService
      .alterar(this.form.value)
      .subscribe(() => this.carregarVacinas());
  }

  private excluirVacina(idVacina: string) {
    this.vacinaService.excluir(idVacina).subscribe(() => {
      this.carregarVacinas();
    });
  }

  private somenteLeitura(): boolean {
    return (
      this.modoFormulario == ModoFormulario.CONSULTA ||
      this.modoFormulario == ModoFormulario.EXCLUSAO
    );
  }

  public temBotaoAcao(): boolean {
    return this.modoFormulario != ModoFormulario.CONSULTA;
  }

  private atualizarValidadores(formControl: AbstractControl, validators: ValidatorFn | ValidatorFn[] | null): void {
    formControl?.setValidators(validators);
    formControl?.updateValueAndValidity();

  }

  public verificarIdadeRecomendada() {
    const temIdadeRecomendada = this.form.get('in_idade_recomendada')?.value;
    const controlTpIdade = this.form.get('tp_idade_recomendada');
    const controlNrIdade = this.form.get('nr_idade_recomendada');

    if (!temIdadeRecomendada || temIdadeRecomendada == undefined) {
      controlTpIdade?.setValue(!temIdadeRecomendada ? null : false);
      controlNrIdade?.setValue(null);
      this.atualizarValidadores(controlTpIdade!, null);
      this.atualizarValidadores(controlNrIdade!, null);
      controlTpIdade?.setValidators(null);
      controlNrIdade?.setValidators(null);
    } else {
      controlTpIdade?.setValidators([Validators.required]);
      controlNrIdade?.setValidators([Validators.required]);
    }

    console.log('this.form em verificarIdadeRecomendada', this.form);
  }

  private carregarVacinas() {
    this.router.navigate(['/listar-vacina']);
  }

  private confirmarExclusaoVacina(vacina: Vacina) {
    const modalRef = this.dialogoConf.open(DialogoConfirmacaoComponent, {
      data: {
        tituloModal: 'Exclusão de Vacina',
        pergunta: `Confirma a exclusão da vacina "'${vacina.tx_nome}'"?`,
        rotuloAceitar: this.ROTULO_BOTAO_ACEITAR,
        rotuloRejeitar: this.ROTULO_BOTAO_REJEITAR,
      },
    });

    modalRef.afterClosed().subscribe((result) => {
      if (result == this.ROTULO_BOTAO_ACEITAR && vacina._id) {
        this.excluirVacina(vacina._id);
      }
    });
  }

  public salvar() {
    if (this.form.valid || this.modoFormulario == ModoFormulario.EXCLUSAO) {
      switch (this.modoFormulario) {
        case ModoFormulario.INCLUSAO:
          this.incluirVacina();
          break;
        case ModoFormulario.ALTERACAO:
          this.alterarVacina();
          break;
        case ModoFormulario.EXCLUSAO:
          this.confirmarExclusaoVacina(this.form.value);
          break;
        default:
          throw new Error('Modo do formulário não definido');
      }
    } else {
      console.log('this.form)', this.form);
      alert('Formulário com preenchimento inválido.');
    }
  }

  public fechar() {
    this.router.navigate(['/listar-vacina']);
  }
}

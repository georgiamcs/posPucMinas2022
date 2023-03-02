import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcessoProibidoComponent } from './pages/acess/acesso-proibido/acesso-proibido.component';
import { ErroComponent } from './pages/content/erro/erro.component';
import { CrudCompraVacinaComponent } from './pages/forms/crud-compra-vacina/crud-compra-vacina.component';
import { CrudVacinacaoComponent } from './pages/forms/crud-vacinacao/crud-vacinacao.component';
import { TrocarSenhaComponent } from './pages/forms/trocar-senha/trocar-senha.component';
import { DistribuicaoMotivosDescarteVacinaComponent } from './pages/graficos/distribuicao-motivos-descarte-vacina/distribuicao-motivos-descarte-vacina.component';
import { RelacaoValoresComprasVendasComponent } from './pages/graficos/relacao-valores-compras-vendas/relacao-valores-compras-vendas.component';
import { ListarComprasVacinaComponent } from './pages/lists/listar-compras-vacinas/listar-compras-vacinas.component';
import { ListarControleEstoqueVacinaComponent } from './pages/lists/listar-controle-estoque-vacina/listar-controle-estoque-vacina.component';
import { ListarVacinacoesComponent } from './pages/lists/listar-vacinacoes/listar-vacinacoes.component';

import { AuthenticatedGuard } from './guards/authenticated.guard';
import { LoginComponent } from './pages/acess/login/login.component';
import { LogoutComponent } from './pages/acess/logout/logout.component';
import { HomeComponent } from './pages/content/home/home.component';
import { CrudDescarteVacinaComponent } from './pages/forms/crud-descarte-vacina/crud-descarte-vacina.component';
import { CrudFornecedorComponent } from './pages/forms/crud-fornecedor/crud-fornecedor.component';
import { CrudUsuarioComponent } from './pages/forms/crud-usuario/crud-usuario.component';
import { CrudVacinaComponent } from './pages/forms/crud-vacina/crud-vacina.component';
import { RelacaoDosesCompradasAplicadasDescartadasComponent } from './pages/graficos/relacao-doses-compradas-aplicadas-descartadas/relacao-doses-compradas-aplicadas-descartadas.component';
import { ListarDescarteVacinasComponent } from './pages/lists/listar-descartes-vacinas/listar-descartes-vacinas.component';
import { ListarFornecedoresComponent } from './pages/lists/listar-fornecedores/listar-fornecedores.component';
import { ListarUsuariosComponent } from './pages/lists/listar-usuarios/listar-usuarios.component';
import { ListarVacinasComponent } from './pages/lists/listar-vacinas/listar-vacinas.component';
import {
  TemaAcessoUsuario,
  TipoAcessoUsuario
} from './shared/classes/acesso.class';
import { TipoRota } from './shared/enums/tipo-rota.enum';

const routes: Routes = [
  //HOME
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  // ACESSO
  { path: 'login', component: LoginComponent },
  { path: 'erroLogin', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'trocar_minha_senha/:id', component: TrocarSenhaComponent },
  { path: 'trocarsenha/:id', component: TrocarSenhaComponent },
  {
    path: 'registrar',
    component: CrudUsuarioComponent,
  },
  { path: 'erro', component: ErroComponent },
  { path: 'acesso-proibido', component: AcessoProibidoComponent },
  // VACINAS
  {
    path: 'vacinas',
    component: ListarVacinasComponent,
    canActivate: [AuthenticatedGuard],
    data: {
      tema: TemaAcessoUsuario.VACINA,
      tipoAcesso: [
        TipoAcessoUsuario.VISUALIZAR_TODOS,
        TipoAcessoUsuario.SELECIONAR,
      ],
    },
  },
  {
    path: 'vacina',
    component: CrudVacinaComponent,
    canActivate: [AuthenticatedGuard],
    data: {
      tema: TemaAcessoUsuario.VACINA,
      tipoAcesso: [TipoAcessoUsuario.INCLUIR],
    },
  },
  {
    path: 'vacina/:id',
    component: CrudVacinaComponent,
    canActivate: [AuthenticatedGuard],
    data: {
      tema: TemaAcessoUsuario.VACINA,
      tipoAcesso: [
        TipoAcessoUsuario.VISUALIZAR_TODOS,
        TipoAcessoUsuario.SELECIONAR,
      ],
    },
  },
  {
    path: `vacina/${TipoRota.ALTERACAO}/:id`,
    component: CrudVacinaComponent,
    canActivate: [AuthenticatedGuard],
    data: {
      tema: TemaAcessoUsuario.VACINA,
      tipoAcesso: [TipoAcessoUsuario.ALTERAR],
    },
  },
  {
    path: `vacina/${TipoRota.EXCLUSAO}/:id`,
    component: CrudVacinaComponent,
    canActivate: [AuthenticatedGuard],
    data: {
      tema: TemaAcessoUsuario.VACINA,
      tipoAcesso: [TipoAcessoUsuario.EXCLUIR],
    },
  },

  // CONTROLE DE ESTOQUE DE VACINA
  {
    path: `controle-estoque-vacina/:idVacina`,
    component: ListarControleEstoqueVacinaComponent,
    canActivate: [AuthenticatedGuard],
    data: {
      tema: TemaAcessoUsuario.VACINA,
      tipoAcesso: [
        TipoAcessoUsuario.VISUALIZAR_TODOS,
        TipoAcessoUsuario.SELECIONAR,
      ],
    },
  },

  // VACINACAO
  {
    path: 'vacinacoes',
    component: ListarVacinacoesComponent,
    canActivate: [AuthenticatedGuard],
    data: {
      tema: TemaAcessoUsuario.VACINACAO,
      tipoAcesso:
        [TipoAcessoUsuario.VISUALIZAR_TODOS],
    },
  },
  {
    path: 'vacinacao',
    component: CrudVacinacaoComponent,
    canActivate: [AuthenticatedGuard],
    data: {
      tema: TemaAcessoUsuario.VACINACAO,
      tipoAcesso: [TipoAcessoUsuario.INCLUIR],
    },
  },
  {
    path: 'vacinacao/:id',
    component: CrudVacinacaoComponent,
    canActivate: [AuthenticatedGuard],
    data: {
      tema: TemaAcessoUsuario.VACINACAO,
      tipoAcesso: [
        TipoAcessoUsuario.VISUALIZAR_TODOS
      ],
    },
  },
  {
    path: `vacinacao/${TipoRota.ALTERACAO}/:id`,
    component: CrudVacinacaoComponent,
    canActivate: [AuthenticatedGuard],
    data: {
      tema: TemaAcessoUsuario.VACINACAO,
      tipoAcesso: [TipoAcessoUsuario.ALTERAR],
    },
  },
  {
    path: `vacinacao/${TipoRota.EXCLUSAO}/:id`,
    component: CrudVacinacaoComponent,
    canActivate: [AuthenticatedGuard],
    data: {
      tema: TemaAcessoUsuario.VACINACAO,
      tipoAcesso: [TipoAcessoUsuario.EXCLUIR],
    },
  },

  // FORNECEDORES
  {
    path: 'fornecedores',
    component: ListarFornecedoresComponent,
    canActivate: [AuthenticatedGuard],
    data: {
      tema: TemaAcessoUsuario.FORNECEDOR_VACINA,
      tipoAcesso: [
        TipoAcessoUsuario.VISUALIZAR_TODOS,
        TipoAcessoUsuario.SELECIONAR,
      ],
    },
  },

  {
    path: 'fornecedor',
    component: CrudFornecedorComponent,
    canActivate: [AuthenticatedGuard],
    data: {
      tema: TemaAcessoUsuario.FORNECEDOR_VACINA,
      tipoAcesso: [TipoAcessoUsuario.INCLUIR],
    },
  },
  {
    path: 'fornecedor/:id',
    component: CrudFornecedorComponent,
    canActivate: [AuthenticatedGuard],
    data: {
      tema: TemaAcessoUsuario.FORNECEDOR_VACINA,
      tipoAcesso: [
        TipoAcessoUsuario.VISUALIZAR_TODOS,
        TipoAcessoUsuario.SELECIONAR,
      ],
    },
  },
  {
    path: `fornecedor/${TipoRota.ALTERACAO}/:id`,
    component: CrudFornecedorComponent,
    canActivate: [AuthenticatedGuard],
    data: {
      tema: TemaAcessoUsuario.FORNECEDOR_VACINA,
      tipoAcesso: [TipoAcessoUsuario.ALTERAR],
    },
  },
  {
    path: `fornecedor/${TipoRota.EXCLUSAO}/:id`,
    component: CrudFornecedorComponent,
    canActivate: [AuthenticatedGuard],
    data: {
      tema: TemaAcessoUsuario.FORNECEDOR_VACINA,
      tipoAcesso: [TipoAcessoUsuario.EXCLUIR],
    },
  },

  // USUARIOS
  {
    path: 'usuarios',
    component: ListarUsuariosComponent,
    canActivate: [AuthenticatedGuard],
    data: {
      tema: TemaAcessoUsuario.USUARIO,
      tipoAcesso: [
        TipoAcessoUsuario.VISUALIZAR_TODOS,
        TipoAcessoUsuario.SELECIONAR,
      ],
    },
  },
  {
    path: 'usuario',
    component: CrudUsuarioComponent,
    canActivate: [AuthenticatedGuard],
    data: {
      tema: TemaAcessoUsuario.USUARIO,
      tipoAcesso: [TipoAcessoUsuario.INCLUIR],
    },
  },
  {
    path: 'usuario/:id',
    component: CrudUsuarioComponent,
    canActivate: [AuthenticatedGuard],
    data: {
      tema: TemaAcessoUsuario.USUARIO,
      tipoAcesso: [
        TipoAcessoUsuario.VISUALIZAR_TODOS,
        TipoAcessoUsuario.SELECIONAR,
      ],
    },
  },
  {
    path: `usuario/${TipoRota.ALTERACAO}/:id`,
    component: CrudUsuarioComponent,
    canActivate: [AuthenticatedGuard],
    data: {
      tema: TemaAcessoUsuario.USUARIO,
      tipoAcesso: [TipoAcessoUsuario.ALTERAR],
    },
  },
  {
    path: `usuario/${TipoRota.EXCLUSAO}/:id`,
    component: CrudUsuarioComponent,
    canActivate: [AuthenticatedGuard],
    data: {
      tema: TemaAcessoUsuario.USUARIO,
      tipoAcesso: [TipoAcessoUsuario.EXCLUIR],
    },
  },

  // COMPRAS VACINAS
  {
    path: 'compras-vacina',
    component: ListarComprasVacinaComponent,
    canActivate: [AuthenticatedGuard],
    data: {
      tema: TemaAcessoUsuario.COMPRA_VACINA,
      tipoAcesso: [
        TipoAcessoUsuario.VISUALIZAR_TODOS
      ],
    },
  },
  {
    path: 'compra-vacina',
    component: CrudCompraVacinaComponent,
    canActivate: [AuthenticatedGuard],
    data: {
      tema: TemaAcessoUsuario.COMPRA_VACINA,
      tipoAcesso: [TipoAcessoUsuario.INCLUIR],
    },
  },
  {
    path: 'compra-vacina/:id',
    component: CrudCompraVacinaComponent,
    canActivate: [AuthenticatedGuard],
    data: {
      tema: TemaAcessoUsuario.COMPRA_VACINA,
      tipoAcesso: [
        TipoAcessoUsuario.VISUALIZAR_TODOS
      ],
    },
  },
  {
    path: `compra-vacina/${TipoRota.ALTERACAO}/:id`,
    component: CrudCompraVacinaComponent,
    canActivate: [AuthenticatedGuard],
    data: {
      tema: TemaAcessoUsuario.COMPRA_VACINA,
      tipoAcesso: [TipoAcessoUsuario.ALTERAR],
    },
  },
  {
    path: `compra-vacina/${TipoRota.EXCLUSAO}/:id`,
    component: CrudCompraVacinaComponent,
    canActivate: [AuthenticatedGuard],
    data: {
      tema: TemaAcessoUsuario.COMPRA_VACINA,
      tipoAcesso: [TipoAcessoUsuario.EXCLUIR],
    },
  },

  // DESCARTE VACINAS
  {
    path: 'descartes-vacinas',
    component: ListarDescarteVacinasComponent,
    canActivate: [AuthenticatedGuard],
    data: {
      tema: TemaAcessoUsuario.DESCARTE_VACINA,
      tipoAcesso: [
        TipoAcessoUsuario.VISUALIZAR_TODOS
      ],
    },
  },
  {
    path: 'descarte-vacina',
    component: CrudDescarteVacinaComponent,
    canActivate: [AuthenticatedGuard],
    data: {
      tema: TemaAcessoUsuario.DESCARTE_VACINA,
      tipoAcesso: [TipoAcessoUsuario.INCLUIR],
    },
  },
  {
    path: 'descarte-vacina/:id',
    component: CrudDescarteVacinaComponent,
    canActivate: [AuthenticatedGuard],
    data: {
      tema: TemaAcessoUsuario.DESCARTE_VACINA,
      tipoAcesso: [
        TipoAcessoUsuario.VISUALIZAR_TODOS
      ],
    },
  },
  {
    path: `descarte-vacina/${TipoRota.ALTERACAO}/:id`,
    component: CrudDescarteVacinaComponent,
    canActivate: [AuthenticatedGuard],
    data: {
      tema: TemaAcessoUsuario.DESCARTE_VACINA,
      tipoAcesso: [TipoAcessoUsuario.ALTERAR],
    },
  },
  {
    path: `descarte-vacina/${TipoRota.EXCLUSAO}/:id`,
    component: CrudDescarteVacinaComponent,
    canActivate: [AuthenticatedGuard],
    data: {
      tema: TemaAcessoUsuario.DESCARTE_VACINA,
      tipoAcesso: [TipoAcessoUsuario.EXCLUIR],
    },
  },

  //GRAFICOS
  {
    path: `graficos/dist-mot-desc-vacina`,
    component: DistribuicaoMotivosDescarteVacinaComponent,
    canActivate: [AuthenticatedGuard],
    data: {
      tema: TemaAcessoUsuario.INDICADORES,
      tipoAcesso: [TipoAcessoUsuario.VISUALIZAR_TODOS],
    },
  },
  {
    path: `graficos/relac-doses-vacina`,
    component: RelacaoDosesCompradasAplicadasDescartadasComponent,
    canActivate: [AuthenticatedGuard],
    data: {
      tema: TemaAcessoUsuario.INDICADORES,
      tipoAcesso: [TipoAcessoUsuario.VISUALIZAR_TODOS],
    },
  },
  {
    path: `graficos/relac-valores-vacina`,
    component: RelacaoValoresComprasVendasComponent,
    canActivate: [AuthenticatedGuard],
    data: {
      tema: TemaAcessoUsuario.INDICADORES,
      tipoAcesso: [TipoAcessoUsuario.VISUALIZAR_TODOS],
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

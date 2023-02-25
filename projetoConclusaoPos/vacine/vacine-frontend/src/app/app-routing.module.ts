import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErroComponent } from './pages/content/erro/erro.component';
import { CrudCompraVacinaComponent } from './pages/forms/crud-compra-vacina/crud-compra-vacina.component';
import { CrudVacinacaoComponent } from './pages/forms/crud-vacinacao/crud-vacinacao.component';
import { TrocarSenhaComponent } from './pages/forms/trocar-senha/trocar-senha.component';
import { ListarComprasVacinaComponent } from './pages/lists/listar-compras-vacinas/listar-compras-vacinas.component';
import { ListarControleEstoqueVacinaComponent } from './pages/lists/listar-controle-estoque-vacina/listar-controle-estoque-vacina.component';
import { ListarVacinacoesComponent } from './pages/lists/listar-vacinacoes/listar-vacinacoes.component';
import { Tema } from './shared/enums/tema.enum';

import { AuthenticatedGuard } from './guards/authenticated.guard';
import { LoginComponent } from './pages/acess/login/login.component';
import { LogoutComponent } from './pages/acess/logout/logout.component';
import { HomeComponent } from './pages/content/home/home.component';
import { CrudDescarteVacinaComponent } from './pages/forms/crud-descarte-vacina/crud-descarte-vacina.component';
import { CrudFornecedorComponent } from './pages/forms/crud-fornecedor/crud-fornecedor.component';
import { CrudUsuarioComponent } from './pages/forms/crud-usuario/crud-usuario.component';
import { CrudVacinaComponent } from './pages/forms/crud-vacina/crud-vacina.component';
import { ListarDescarteVacinasComponent } from './pages/lists/listar-descartes-vacinas/listar-descartes-vacinas.component';
import { ListarFornecedoresComponent } from './pages/lists/listar-fornecedores/listar-fornecedores.component';
import { ListarUsuariosComponent } from './pages/lists/listar-usuarios/listar-usuarios.component';
import { ListarVacinasComponent } from './pages/lists/listar-vacinas/listar-vacinas.component';
import { Acesso } from './shared/classes/acesso.class';
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

  // VACINAS
  {
    path: 'vacinas',
    component: ListarVacinasComponent,
    canActivate: [AuthenticatedGuard],
    data: { perfis: Acesso.getListaPerfilPorTema(Tema.VACINA) },
  },
  {
    path: 'vacina',
    component: CrudVacinaComponent,
    canActivate: [AuthenticatedGuard],
    data: { perfis: Acesso.getListaPerfilPorTema(Tema.VACINA) },
  },
  {
    path: 'vacina/:id',
    component: CrudVacinaComponent,
    canActivate: [AuthenticatedGuard],
    data: { perfis: Acesso.getListaPerfilPorTema(Tema.VACINA) },
  },
  {
    path: `vacina/${TipoRota.ALTERACAO}/:id`,
    component: CrudVacinaComponent,
    canActivate: [AuthenticatedGuard],
    data: { perfis: Acesso.getListaPerfilPorTema(Tema.VACINA) },
  },
  {
    path: `vacina/${TipoRota.EXCLUSAO}/:id`,
    component: CrudVacinaComponent,
    canActivate: [AuthenticatedGuard],
    data: { perfis: Acesso.getListaPerfilPorTema(Tema.VACINA) },
  },

  // CONTROLE DE ESTOQUE DE VACINA
  {
    path: `controle-estoque-vacina/:idVacina`,
    component: ListarControleEstoqueVacinaComponent,
    canActivate: [AuthenticatedGuard],
    data: { perfis: Acesso.getListaPerfilPorTema(Tema.VACINA) },
  },

  // VACINACAO
  {
    path: 'vacinacoes',
    component: ListarVacinacoesComponent,
    canActivate: [AuthenticatedGuard],
    data: { perfis: Acesso.getListaPerfilPorTema(Tema.VACINACAO) },
  },
  {
    path: 'vacinacao',
    component: CrudVacinacaoComponent,
    canActivate: [AuthenticatedGuard],
    data: { perfis: Acesso.getListaPerfilPorTema(Tema.VACINACAO) },
  },
  {
    path: 'vacinacao/:id',
    component: CrudVacinacaoComponent,
    canActivate: [AuthenticatedGuard],
    data: { perfis: Acesso.getListaPerfilPorTema(Tema.VACINACAO) },
  },
  {
    path: `vacinacao/${TipoRota.ALTERACAO}/:id`,
    component: CrudVacinacaoComponent,
    canActivate: [AuthenticatedGuard],
    data: { perfis: Acesso.getListaPerfilPorTema(Tema.VACINACAO) },
  },
  {
    path: `vacinacao/${TipoRota.EXCLUSAO}/:id`,
    component: CrudVacinacaoComponent,
    canActivate: [AuthenticatedGuard],
    data: { perfis: Acesso.getListaPerfilPorTema(Tema.VACINACAO) },
  },

  // FORNECEDORES
  {
    path: 'fornecedores',
    component: ListarFornecedoresComponent,
    canActivate: [AuthenticatedGuard],
    data: { perfis: Acesso.getListaPerfilPorTema(Tema.FORNECEDOR) },
  },

  {
    path: 'fornecedor',
    component: CrudFornecedorComponent,
    canActivate: [AuthenticatedGuard],
    data: { perfis: Acesso.getListaPerfilPorTema(Tema.FORNECEDOR) },
  },
  {
    path: 'fornecedor/:id',
    component: CrudFornecedorComponent,
    canActivate: [AuthenticatedGuard],
    data: { perfis: Acesso.getListaPerfilPorTema(Tema.FORNECEDOR) },
  },
  {
    path: `fornecedor/${TipoRota.ALTERACAO}/:id`,
    component: CrudFornecedorComponent,
    canActivate: [AuthenticatedGuard],
    data: { perfis: Acesso.getListaPerfilPorTema(Tema.FORNECEDOR) },
  },
  {
    path: `fornecedor/${TipoRota.EXCLUSAO}/:id`,
    component: CrudFornecedorComponent,
    canActivate: [AuthenticatedGuard],
    data: { perfis: Acesso.getListaPerfilPorTema(Tema.FORNECEDOR) },
  },

  // USUARIOS
  {
    path: 'usuarios',
    component: ListarUsuariosComponent,
    canActivate: [AuthenticatedGuard],
    data: { perfis: Acesso.getListaPerfilPorTema(Tema.USUARIO) },
  },
  {
    path: 'usuario',
    component: CrudUsuarioComponent,
    canActivate: [AuthenticatedGuard],
    data: { perfis: Acesso.getListaPerfilPorTema(Tema.USUARIO) },
  },
  {
    path: 'usuario/:id',
    component: CrudUsuarioComponent,
    canActivate: [AuthenticatedGuard],
    data: { perfis: Acesso.getListaPerfilPorTema(Tema.USUARIO) },
  },
  {
    path: `usuario/${TipoRota.ALTERACAO}/:id`,
    component: CrudUsuarioComponent,
    canActivate: [AuthenticatedGuard],
    data: { perfis: Acesso.getListaPerfilPorTema(Tema.USUARIO) },
  },
  {
    path: `usuario/${TipoRota.EXCLUSAO}/:id`,
    component: CrudUsuarioComponent,
    canActivate: [AuthenticatedGuard],
    data: { perfis: Acesso.getListaPerfilPorTema(Tema.USUARIO) },
  },

  // COMPRAS VACINAS
  {
    path: 'compras-vacina',
    component: ListarComprasVacinaComponent,
    canActivate: [AuthenticatedGuard],
    data: { perfis: Acesso.getListaPerfilPorTema(Tema.COMPRA_VACINA) },
  },
  {
    path: 'compra-vacina',
    component: CrudCompraVacinaComponent,
    canActivate: [AuthenticatedGuard],
    data: { perfis: Acesso.getListaPerfilPorTema(Tema.COMPRA_VACINA) },
  },
  {
    path: 'compra-vacina/:id',
    component: CrudCompraVacinaComponent,
    canActivate: [AuthenticatedGuard],
    data: { perfis: Acesso.getListaPerfilPorTema(Tema.COMPRA_VACINA) },
  },
  {
    path: `compra-vacina/${TipoRota.ALTERACAO}/:id`,
    component: CrudCompraVacinaComponent,
    canActivate: [AuthenticatedGuard],
    data: { perfis: Acesso.getListaPerfilPorTema(Tema.COMPRA_VACINA) },
  },
  {
    path: `compra-vacina/${TipoRota.EXCLUSAO}/:id`,
    component: CrudCompraVacinaComponent,
    canActivate: [AuthenticatedGuard],
    data: { perfis: Acesso.getListaPerfilPorTema(Tema.COMPRA_VACINA) },
  },

  // DESCARTE VACINAS
  {
    path: 'descartes-vacinas',
    component: ListarDescarteVacinasComponent,
    canActivate: [AuthenticatedGuard],
    data: { perfis: Acesso.getListaPerfilPorTema(Tema.VACINA) },
  },
  {
    path: 'descarte-vacina',
    component: CrudDescarteVacinaComponent,
    canActivate: [AuthenticatedGuard],
    data: { perfis: Acesso.getListaPerfilPorTema(Tema.VACINA) },
  },
  {
    path: 'descarte-vacina/:id',
    component: CrudDescarteVacinaComponent,
    canActivate: [AuthenticatedGuard],
    data: { perfis: Acesso.getListaPerfilPorTema(Tema.VACINA) },
  },
  {
    path: `descarte-vacina/${TipoRota.ALTERACAO}/:id`,
    component: CrudDescarteVacinaComponent,
    canActivate: [AuthenticatedGuard],
    data: { perfis: Acesso.getListaPerfilPorTema(Tema.VACINA) },
  },
  {
    path: `descarte-vacina/${TipoRota.EXCLUSAO}/:id`,
    component: CrudDescarteVacinaComponent,
    canActivate: [AuthenticatedGuard],
    data: { perfis: Acesso.getListaPerfilPorTema(Tema.VACINA) },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

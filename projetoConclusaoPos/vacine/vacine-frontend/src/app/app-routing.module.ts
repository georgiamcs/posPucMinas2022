import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudCompraVacinaComponent } from './pages/forms/crud-compra-vacina/crud-compra-vacina.component';
import { ListarComprasVacinaComponent } from './pages/lists/listar-compras-vacina/listar-compras-vacina.component';
import { TrocarSenhaComponent } from './pages/forms/trocar-senha/trocar-senha.component';
import { ErroComponent } from './pages/content/erro/erro.component';
import { Tema } from './shared/enums/tema.enum';

import { AuthenticatedGuard } from './guards/authenticated.guard';
import { LoginComponent } from './pages/acess/login/login.component';
import { LogoutComponent } from './pages/acess/logout/logout.component';
import { CrudFornecedorComponent } from './pages/forms/crud-fornecedor/crud-fornecedor.component';
import { ListarFornecedoresComponent } from './pages/lists/listar-fornecedores/listar-fornecedores.component';
import { CrudUsuarioComponent } from './pages/forms/crud-usuario/crud-usuario.component';
import { ListarUsuariosComponent } from './pages/lists/listar-usuarios/listar-usuarios.component';
import { CrudVacinaComponent } from './pages/forms/crud-vacina/crud-vacina.component';
import { ListarVacinasComponent } from './pages/lists/listar-vacinas/listar-vacinas.component';
import { HomeComponent } from './pages/content/home/home.component';
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

  // COMPRAS
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
    data: { perfis: Acesso.getListaPerfilPorTema(Tema.USUARIO) },
  },
  {
    path: `compra-vacina/${TipoRota.ALTERACAO}/:id`,
    component: CrudCompraVacinaComponent,
    canActivate: [AuthenticatedGuard],
    data: { perfis: Acesso.getListaPerfilPorTema(Tema.USUARIO) },
  },
  {
    path: `compra-vacina/${TipoRota.EXCLUSAO}/:id`,
    component: CrudCompraVacinaComponent,
    canActivate: [AuthenticatedGuard],
    data: { perfis: Acesso.getListaPerfilPorTema(Tema.USUARIO) },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

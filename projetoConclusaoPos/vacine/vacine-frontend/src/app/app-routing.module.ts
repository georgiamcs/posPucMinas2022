import { CrudCompraComponent } from './pages/entidades/compra/crud-compra/crud-compra.component';
import { TrocarSenhaComponent } from './pages/entidades/usuario/trocar-senha/trocar-senha.component';
import { ErroComponent } from './pages/erro/erro.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tema } from './shared/enums/tema.enum';

import { LoginComponent } from './pages/acesso/login/login.component';
import { LogoutComponent } from './pages/acesso/logout/logout.component';
import { CrudFornecedorComponent } from './pages/entidades/fornecedor/crud-fornecedor/crud-fornecedor.component';
import { ListarFornecedoresComponent } from './pages/entidades/fornecedor/listar-fornecedores/listar-fornecedores.component';
import { CrudUsuarioComponent } from './pages/entidades/usuario/crud-usuario/crud-usuario.component';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { HomeComponent } from './pages/home/home.component';
import { Acesso } from './shared/classes/acesso.class';
import { TipoRota } from './shared/enums/tipo-rota.enum';
import { ListarUsuariosComponent } from './pages/entidades/usuario/listar-usuarios/listar-usuarios.component';
import { CrudVacinaComponent } from './pages/entidades/vacina/crud-vacina/crud-vacina.component';
import { ListarVacinasComponent } from './pages/entidades/vacina/listar-vacinas/listar-vacinas.component';

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
    component: CrudCompraComponent,
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

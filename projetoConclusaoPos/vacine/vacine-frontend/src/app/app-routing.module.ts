import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tema } from './shared/enums/tema.enum';

import { LoginComponent } from './components/acesso/login/login.component';
import { LogoutComponent } from './components/acesso/logout/logout.component';
import { CrudFornecedorComponent } from './components/fornecedor/crud-fornecedor/crud-fornecedor.component';
import { ListarFornecedoresComponent } from './components/fornecedor/listar-fornecedores/listar-fornecedores.component';
import { CrudUsuarioComponent } from './components/usuario/crud-usuario/crud-usuario.component';
import { ListarUsuariosComponent } from './components/usuario/listar-usuarios/listar-usuarios.component';
import { CrudVacinaComponent } from './components/vacina/crud-vacina/crud-vacina.component';
import { ListarVacinasComponent } from './components/vacina/listar-vacinas/listar-vacinas.component';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { HomeComponent } from './pages/home/home.component';
import { getListaPerfilPorTema } from './shared/enums/tipo-perfil.enum';
import { TipoRota } from './shared/enums/tipo-rota.enum';

const routes: Routes = [
  //HOME
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  // ACESSO
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  {
    path: 'registrar',
    component: CrudUsuarioComponent,
  },

  // VACINAS
  {
    path: 'vacinas',
    component: ListarVacinasComponent,
    canActivate: [AuthenticatedGuard],
    data: { perfis: getListaPerfilPorTema(Tema.VACINA) },
  },
  {
    path: 'vacina',
    component: CrudVacinaComponent,
    canActivate: [AuthenticatedGuard],
    data: { perfis: getListaPerfilPorTema(Tema.VACINA) },
  },
  {
    path: 'vacina/:id',
    component: CrudVacinaComponent,
    canActivate: [AuthenticatedGuard],
    data: { perfis: getListaPerfilPorTema(Tema.VACINA) },
  },
  {
    path: `vacina/${TipoRota.ALTERACAO}/:id`,
    component: CrudVacinaComponent,
    canActivate: [AuthenticatedGuard],
    data: { perfis: getListaPerfilPorTema(Tema.VACINA) },
  },
  {
    path: `vacina/${TipoRota.EXCLUSAO}/:id`,
    component: CrudVacinaComponent,
    canActivate: [AuthenticatedGuard],
    data: { perfis: getListaPerfilPorTema(Tema.VACINA) },
  },

  // FORNECEDORES
  {
    path: 'fornecedores',
    component: ListarFornecedoresComponent,
    canActivate: [AuthenticatedGuard],
    data: { perfis: getListaPerfilPorTema(Tema.FORNECEDOR) },
  },
  {
    path: 'fornecedor',
    component: CrudFornecedorComponent,
    canActivate: [AuthenticatedGuard],
    data: { perfis: getListaPerfilPorTema(Tema.FORNECEDOR) },
  },
  {
    path: 'fornecedor/:id',
    component: CrudFornecedorComponent,
    canActivate: [AuthenticatedGuard],
    data: { perfis: getListaPerfilPorTema(Tema.FORNECEDOR) },
  },
  {
    path: `fornecedor/${TipoRota.ALTERACAO}/:id`,
    component: CrudFornecedorComponent,
    canActivate: [AuthenticatedGuard],
    data: { perfis: getListaPerfilPorTema(Tema.FORNECEDOR) },
  },
  {
    path: `fornecedor/${TipoRota.EXCLUSAO}/:id`,
    component: CrudFornecedorComponent,
    canActivate: [AuthenticatedGuard],
    data: { perfis: getListaPerfilPorTema(Tema.FORNECEDOR) },
  },

  // USUARIOS
  {
    path: 'usuarios',
    component: ListarUsuariosComponent,
    canActivate: [AuthenticatedGuard],
    data: { perfis: getListaPerfilPorTema(Tema.USUARIO) },
  },
  {
    path: 'usuario',
    component: CrudUsuarioComponent,
    canActivate: [AuthenticatedGuard],
    data: { perfis: getListaPerfilPorTema(Tema.USUARIO) },
  },
  {
    path: 'usuario/:id',
    component: CrudUsuarioComponent,
    canActivate: [AuthenticatedGuard],
    data: { perfis: getListaPerfilPorTema(Tema.USUARIO) },
  },
  {
    path: `usuario/${TipoRota.ALTERACAO}/:id`,
    component: CrudUsuarioComponent,
    canActivate: [AuthenticatedGuard],
    data: { perfis: getListaPerfilPorTema(Tema.USUARIO) },
  },
  {
    path: `usuario/${TipoRota.EXCLUSAO}/:id`,
    component: CrudUsuarioComponent,
    canActivate: [AuthenticatedGuard],
    data: { perfis: getListaPerfilPorTema(Tema.USUARIO) },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

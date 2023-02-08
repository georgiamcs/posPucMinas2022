import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListarVacinasComponent } from './components/vacina/listar-vacinas/listar-vacinas.component';
import { ListarFornecedoresComponent } from './components/fornecedor/listar-fornecedores/listar-fornecedores.component';
import { CrudVacinaComponent } from './components/vacina/crud-vacina/crud-vacina.component';
import { TipoRota } from './shared/enums/tipo-rota.enum';
import { CrudFornecedorComponent } from './components/fornecedor/crud-fornecedor/crud-fornecedor.component';

const routes: Routes = [
  { path: '', redirectTo: 'listar-vacinas', pathMatch: 'full' },
  { path: 'crud-vacina', component: CrudVacinaComponent },
  { path: 'crud-vacina/:id', component: CrudVacinaComponent },
  {
    path: `crud-vacina/${TipoRota.ALTERACAO}/:id`,
    component: CrudVacinaComponent,
  },
  {
    path: `crud-vacina/${TipoRota.EXCLUSAO}/:id`,
    component: CrudVacinaComponent,
  },
  { path: 'crud-fornecedor', component: CrudFornecedorComponent },
  { path: 'crud-fornecedor/:id', component: CrudFornecedorComponent },
  {
    path: `crud-fornecedor/${TipoRota.ALTERACAO}/:id`,
    component: CrudFornecedorComponent,
  },
  {
    path: `crud-fornecedor/${TipoRota.EXCLUSAO}/:id`,
    component: CrudFornecedorComponent,
  },
  { path: 'listar-vacinas', component: ListarVacinasComponent },
  { path: 'listar-fornecedores', component: ListarFornecedoresComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

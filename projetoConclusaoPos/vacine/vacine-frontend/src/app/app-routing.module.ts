import { ListarVacinasComponent } from './components/vacina/listar-vacinas/listar-vacinas.component';
import { CrudVacinaComponent } from './components/vacina/crud-vacina/crud-vacina.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TipoRota } from './shared/enums/tipo-rota.enum';

const routes: Routes = [
  { path: '', redirectTo: 'listar-vacina', pathMatch: 'full' },
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
  { path: 'listar-vacina', component: ListarVacinasComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

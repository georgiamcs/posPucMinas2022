import { ListarVacinasComponent } from './components/listar-vacinas/listar-vacinas.component';
import { CrudVacinaComponent } from './components/vacina/crud-vacina/crud-vacina.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'listar-vacina', pathMatch:'full'},
  { path: 'crud-vacina', component: CrudVacinaComponent },
  { path: 'listar-vacina', component: ListarVacinasComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

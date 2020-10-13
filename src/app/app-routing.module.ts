import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DespesasComponent } from './despesas/despesas.component';
import { SenadoresComponent } from './senadores/senadores.component';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

const routes: Routes = [
  {
    path: 'senadores',
    component: SenadoresComponent,
  },
  {
    path: 'senadores/:id',
    component: DespesasComponent,
  },
];

registerLocaleData(localePt);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

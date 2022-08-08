import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InicioComponent } from './inicio/inicio.component';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CasaComponent } from './casa/casa.component';
import { IlegalidadComponent } from './ilegalidad/ilegalidad.component';
import { JugadorComponent } from './jugador/jugador.component';
import { EventoComponent } from './evento/evento.component';

const routes: Routes = [
  { path: "inicio", component: InicioComponent},
  { path: "favoritos", component: FavoritosComponent },
  { path: "perfil", component: PerfilComponent},
  { path: "casa", component: CasaComponent },
  { path: "ilegalidad", component: IlegalidadComponent},
  { path: "jugador", component: JugadorComponent},
  { path: "evento", component: EventoComponent},
  { path: "**", redirectTo: "inicio" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

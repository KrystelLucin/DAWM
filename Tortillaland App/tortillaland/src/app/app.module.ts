import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import { BarraInferiorComponent } from './barra-inferior/barra-inferior.component';
import { InicioComponent } from './inicio/inicio.component';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CasaComponent } from './casa/casa.component';
import { IlegalidadComponent } from './ilegalidad/ilegalidad.component';
import { InfoT1Component } from './info-t1/info-t1.component';
import { JugadorComponent } from './jugador/jugador.component';
import { EventoComponent } from './evento/evento.component';


@NgModule({
  declarations: [
    AppComponent,
    BarraInferiorComponent,
    InicioComponent,
    FavoritosComponent,
    PerfilComponent,
    InfoT1Component,
    EventoComponent,
    CasaComponent,
    IlegalidadComponent,
    JugadorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatDatepickerModule,
    MatCardModule,
    MatTabsModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

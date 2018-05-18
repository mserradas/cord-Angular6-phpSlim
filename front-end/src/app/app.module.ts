import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { VendedorComponent } from './components/vendedor/vendedor.component';
import { VendedorDetalleComponent } from './components/vendedor-detalle/vendedor-detalle.component';

// Services
import { VendedorService } from './services/vendedor.service';
// Router
import { routing, appRoutingProviders } from './app.routing';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    VendedorComponent,
    VendedorDetalleComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    NgbModule.forRoot(),
    ToastrModule.forRoot(),
    BrowserAnimationsModule

  ],
  providers: [
    VendedorService,
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

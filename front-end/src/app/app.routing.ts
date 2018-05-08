import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { AppComponent } from './app.component';
import { VendedorComponent } from './components/vendedor/vendedor.component';
import { VendedorDetalleComponent } from './components/vendedor-detalle/vendedor-detalle.component';
import { HomeComponent } from './components/home/home.component';

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'vendedor', component: VendedorComponent},
    {path: 'vendedor-detalle/:id', component: VendedorDetalleComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

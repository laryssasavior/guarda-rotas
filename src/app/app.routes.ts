import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SecretariaComponent } from './secretaria/secretaria.component';
import { AuthGuard } from './autenticacao/auth.guard';

export const routes: Routes = [

  // Rota inicial
  {path: '', component: HomeComponent}, 
  {path: 'login', component: LoginComponent},
  {path: "home", component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'secretaria', component: SecretariaComponent, canActivate: [AuthGuard]},

  // Rota raiz
  { path: "", redirectTo: "/home",
        pathMatch: "full",
      },

    
];

    

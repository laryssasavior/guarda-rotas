// Importa o decorator Injectable para tornar esta classe um serviço injetável no Angular
import { Injectable } from "@angular/core";
// Importa as interfaces e classes necessárias para criar guardas de rota no Angular
import {
  ActivatedRouteSnapshot, // Representa a rota que está sendo acessada atualmente
  CanActivate, // Interface para implementar uma lógica que decide se uma rota pode ser ativada
  Router, // Permite navegar programaticamente entre as rotas
  RouterStateSnapshot, // Representa o estado completo do roteador no momento da ativação
  UrlTree, // Representa uma estrutura de URL que pode ser retornada caso o acesso à rota seja negado
} from "@angular/router";
// Importa Observable do RxJS, necessário para observáveis na interface `CanActivate`
import { Observable } from "rxjs";
// Importa o serviço de sessão, usado para verificar se o usuário está logado
import { SessaoService } from "./sessao.service";

// Define que esta classe é um serviço e estará disponível no nível raiz da aplicação
@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  // O construtor inicializa o serviço de sessão e o roteador
  constructor(
    private sessionService: SessaoService, // Serviço responsável por gerenciar a sessão do usuário
    private router: Router // Roteador para redirecionar o usuário, caso necessário
  ) {}

  // Método obrigatório da interface `CanActivate`, responsável por decidir se uma rota pode ser acessada
  canActivate(
    route: ActivatedRouteSnapshot, // Representa a rota que o usuário está tentando acessar
    state: RouterStateSnapshot // Representa o estado atual do roteador
  ):
    
    | Observable <boolean | UrlTree> // Pode retornar um Observable com um booleano ou uma UrlTree
    | Promise <boolean | UrlTree> // Ou pode retornar uma Promise com um booleano ou uma UrlTree
    | boolean // Ou diretamente um booleano
    | UrlTree { // Ou uma UrlTree para redirecionar

    // Verifica se o usuário está logado usando o serviço SessaoService
    if (this.sessionService.estaLogado()) {
      // Se o usuário está logado, permite o acesso à rota
      return true;
    }

    // Se o usuário não está logado, redireciona-o para a página de login
    return this.router.parseUrl("/login");
  }
}

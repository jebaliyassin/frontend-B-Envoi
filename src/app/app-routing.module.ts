import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { AddArticleComponent } from './article/add-article/add-article.component';
import { AddClientComponent } from './client/add-client/add-client.component';
import { ListClientComponent } from './client/list-client/list-client.component';
import { ListArticleComponent } from './article/list-article/list-article.component';
import { ListChauffeurComponent } from './chauffeur/list-chauffeur/list-chauffeur.component';
import { AddChauffeurComponent } from './chauffeur/add-chauffeur/add-chauffeur.component';
import { ListCategorieComponent } from './categorie/list-categorie/list-categorie.component';
import { AddCategorieComponent } from './categorie/add-categorie/add-categorie.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { AccueilComponent } from './accueil/accueil.component';
import { Accueil1Component } from './accueil1/accueil1.component';
import { Accueil2Component } from './accueil2/accueil2.component';
import{AddDirectionComponent} from './direction/add-direction/add-direction.component';
import {ListDirectionComponent} from './direction/list-direction/list-direction.component';
import{AddDestinationComponent} from './destination/add-destination/add-destination.component';
import {ListDestinationComponent} from './destination/list-destination/list-destination.component';
import{AddLtarifComponent} from './tarif/add-ltarif/add-ltarif.component';
import{ListTarifComponent}from './tarif/list-tarif/list-tarif.component';
import{AddTarifComponent}from './tarif/add-tarif/add-tarif.component';
import {AddTypecourrierComponent} from './typecourrier/add-typecourrier/add-typecourrier.component';
import {ListTypecourrierComponent} from './typecourrier/list-typecourrier/list-typecourrier.component';
import {AddAgenceComponent}from './agence/add-agence/add-agence.component';
import{ListAgenceComponent}from './agence/list-agence/list-agence.component';
import{AddAgentComponent}from './agent/add-agent/add-agent.component';
import{ListAgentComponent} from './agent/list-agent/list-agent.component';
import{ListGradeComponent} from './grade/list-grade/list-grade.component';
import {AddGradeComponent} from './grade/add-grade/add-grade.component';
import{AddLdepotComponent}from './depot/add-ldepot/add-ldepot.component';
import{ListDepotComponent}from './depot/list-depot/list-depot.component';
import{AddDepotComponent}from './depot/add-depot/add-depot.component';

const appRoutes : Routes = [
  { path: '', component: MenuComponent , children : [
  { path: 'categories', component:ListCategorieComponent },
  { path: 'categorie', component:AddCategorieComponent },
  { path: 'articles', component: ListArticleComponent },
  { path: 'article', component: AddArticleComponent },
  { path: 'clients', component:ListClientComponent },
  { path: 'client', component:AddClientComponent },
  { path: 'chauffeurs', component: ListChauffeurComponent },
  { path: 'chauffeur', component: AddChauffeurComponent },
  { path: 'accueil', component:AccueilComponent },
  { path: 'accueil1', component:Accueil1Component },
  { path: 'directions', component:ListDirectionComponent },
  { path: 'direction', component:AddDirectionComponent },
  { path: 'destinations', component:ListDestinationComponent },
  { path: 'destination', component:AddDestinationComponent },
  { path: 'tarifs', component:ListTarifComponent },
  { path: 'tarif', component:AddTarifComponent },
  { path: 'ltarif', component:AddLtarifComponent },
  { path: 'destinations', component:ListDestinationComponent },
  { path: 'destination', component:AddDestinationComponent },
  { path: 'typecourriers', component:ListTypecourrierComponent },
  { path: 'typecourrier', component:AddTypecourrierComponent },
  { path: 'agences', component:ListAgenceComponent },
  { path: 'agence', component:AddAgenceComponent },
  { path: 'agents', component:ListAgentComponent },
  { path: 'agent', component:AddAgentComponent },
  { path: 'grades', component:ListGradeComponent },
  { path: 'grade', component:AddGradeComponent },
  { path: 'depots', component:ListDepotComponent },
  { path: 'depot', component:AddDepotComponent },
  { path: 'ldepot', component:AddLdepotComponent },
  
  ]},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent}
  
  ];
  @NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
  })
export class AppRoutingModule { }

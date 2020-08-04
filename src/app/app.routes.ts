import {Routes} from "@angular/router";

import {Dashboard1Component} from "./views/dashboards/dashboard1.component";
import {Dashboard2Component} from "./views/dashboards/dashboard2.component";
import {Dashboard3Component} from "./views/dashboards/dashboard3.component";
import {Dashboard4Component} from "./views/dashboards/dashboard4.component";
import {Dashboard41Component} from "./views/dashboards/dashboard41.component";
import {Dashboard5Component} from "./views/dashboards/dashboard5.component";

import {StarterViewComponent} from "./views/appviews/starterview.component";

import {BlankLayoutComponent} from "./components/common/layouts/blankLayout.component";
import {BasicLayoutComponent} from "./components/common/layouts/basicLayout.component";
import { LoginComponent } from "./views/appviews/login/login.component";
import { SignUpComponent } from "./views/appviews/sign-up/sign-up.component";
import { ProfileComponent } from "./views/appviews/profile/profile.component";
import { AddRecordComponent } from "./views/appviews/records/addrecord.component";
import { ListComponent } from "./views/appviews/records/list.component";
import { RecordsComponent } from "./views/appviews/admin/records.component";
import { ChampionsComponent } from "./views/appviews/admin/champions.component";
import { CanActivateViaAuthGuard } from "./guards/auth-guard-service";
import { UsersComponent } from "./views/appviews/admin/users.component";
import { NewsComponent } from "./views/appviews/admin/news.component";
import { RoleGuardService } from "./guards/role-guard-service";
import { ChampionComponent } from "./views/appviews/records/champion.component";

export const ROUTES:Routes = [
  // Main redirect
  {path: '', redirectTo: 'home', pathMatch: 'full'},

  {
    path: '', component: BasicLayoutComponent, canActivate: [CanActivateViaAuthGuard],
    children: [
      {path: 'home', component: StarterViewComponent}
    ]
  },
  {
    path: '', component: BasicLayoutComponent,
    children: [
      { path: 'profile', component: ProfileComponent, canActivate: [CanActivateViaAuthGuard] }
    ]
  },
  {
    path: '', component: BlankLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
    ]
  },
  {
    path: '', component: BlankLayoutComponent,
    children: [
      { path: 'sign-up', component: SignUpComponent },
    ]
  },
  {
    path: 'records', component: BasicLayoutComponent, canActivate: [CanActivateViaAuthGuard],
    children: [
      { path: 'add', component: AddRecordComponent },
      { path: 'list', component: ListComponent },
      { path: 'champion', component: ChampionComponent },
    ]
  },
  {
    path: 'administration', component: BasicLayoutComponent,
    children: [
      { path: 'records', component: RecordsComponent, pathMatch: 'full', data: { expectedPrivilege: '2' }, canActivate: [RoleGuardService] },
      { path: 'champions', component: ChampionsComponent, pathMatch: 'full', data: { expectedPrivilege: '3' }, canActivate: [RoleGuardService] },
      { path: 'users', component: UsersComponent, pathMatch: 'full', data: { expectedPrivilege: '3' }, canActivate: [RoleGuardService] },
      { path: 'news', component: NewsComponent, pathMatch: 'full', data: { expectedPrivilege: '4' }, canActivate: [RoleGuardService] },
    ]
  },

  //Handle all other routes
  { path: '**', redirectTo: 'home'}
];

import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";

import {StarterViewComponent} from "./starterview.component";

import {PeityModule } from '../../components/charts/peity';
import {SparklineModule } from '../../components/charts/sparkline';
import { LoginComponent } from "./login/login.component";
import { FormsModule } from "@angular/forms";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { JwtModule } from "../../jwt/jwt.module";
import { ProfileComponent } from "./profile/profile.component";
import { AddRecordComponent } from "./records/addrecord.component";
import { ListComponent } from "./records/list.component";
import { IboxtoolsModule } from "../../components/common/iboxtools/iboxtools.module";
import { RecordsComponent } from "./admin/records.component";
import { ChampionsComponent } from "./admin/champions.component";
import { UsersComponent } from "./admin/users.component";
import { NewsComponent } from "./admin/news.component";
import { BsDropdownModule, PaginationModule } from 'ngx-bootstrap';
//import { DemoMaterialModule } from "../../material/material-module";

@NgModule({
  declarations: [
    StarterViewComponent,
    LoginComponent,
    SignUpComponent,
    ProfileComponent,
    AddRecordComponent,
    ListComponent,
    RecordsComponent,
    ChampionsComponent,
    UsersComponent,
    NewsComponent
  ],
  imports: [
    JwtModule,
    BrowserModule,
    RouterModule,
    PeityModule,
    SparklineModule,
    FormsModule,
    IboxtoolsModule,
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot()

    //DemoMaterialModule,

  ],
  exports: [
    StarterViewComponent,
    LoginComponent,
    SignUpComponent,
    ProfileComponent,
    AddRecordComponent,
    ListComponent,
    RecordsComponent,
    ChampionsComponent,
    UsersComponent,
    NewsComponent




  ],
})

export class AppviewsModule {
}

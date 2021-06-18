import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import {RouterModule} from "@angular/router";
import {LocationStrategy, HashLocationStrategy, DatePipe} from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import {ROUTES} from "./app.routes";
import { AppComponent } from './app.component';
import 'hammerjs';
// App views

import {AppviewsModule} from "./views/appviews/appviews.module";

// App modules/components
import {LayoutsModule} from "./components/common/layouts/layouts.module";
import { AuthenticationService } from './services/auth.service';
import { AppService } from './services/app.service';
import { UserService } from './services/user.service';
import { JwtModule } from './jwt/jwt.module';
import { RecordService } from './services/record.service';
import { ChampionService } from './services/champion.service';
import { RolesService } from './services/roles.service';
import { NotificationService } from './services/notification.service';
import { DataService } from './services/data.service';
import { CanActivateViaAuthGuard } from './guards/auth-guard-service';
import { JwtService } from './jwt/jwt.service';
import { RoleGuardService } from './guards/role-guard-service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    LayoutsModule,
    AppviewsModule,
    JwtModule,
    RouterModule.forRoot(ROUTES),

  ],
  providers: [AuthenticationService, AppService, UserService, RecordService, ChampionService, RolesService, NotificationService, DataService, CanActivateViaAuthGuard, RoleGuardService, DatePipe, { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }

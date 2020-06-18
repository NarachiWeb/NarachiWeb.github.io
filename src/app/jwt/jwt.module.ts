import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XHRBackend, RequestOptions } from '@angular/http';
import { JwtService } from './jwt.service';
import { httpServiceFactory } from './jwt.factory';
import { AuthenticationService } from './../services/auth.service';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
    ],
    declarations: [
    ],
    providers: [{ provide: JwtService, useFactory: httpServiceFactory, deps: [XHRBackend, RequestOptions, AuthenticationService] }
    ]
})
export class JwtModule { }

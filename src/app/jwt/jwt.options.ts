import { BaseRequestOptions } from '@angular/http';
export class JwtRequestOptions extends BaseRequestOptions {
    public token: string;
    constructor(customOptions?: any) {
        super();
        let user = JSON.parse(localStorage.getItem('currentUser'));
        this.token = user && user.token;
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Authorization', 'Bearer ' + this.token);
        if (customOptions && customOptions.params)
            this.params = customOptions.params;
    }
}

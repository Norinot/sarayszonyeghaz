import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    private httpClient = inject(HttpClient)

    constructor() {}

    login(data: { username: string; password: string }) {
        return this.httpClient.post('http://localhost:8085/login', data)
    }
    checkToken() {
        return this.httpClient.get('http://localhost:8085/checkToken', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
    }
}

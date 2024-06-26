import { Injectable } from '@angular/core'
import { environment } from '../../../environments/environment'

@Injectable({
    providedIn: 'root',
})
export class SettingsService {
    isLoggedin: boolean = false

    constructor() {}

    getUnused(): boolean {
        return environment.show_unused
    }

    isLoggedIn(): boolean {
        return localStorage.getItem('token') != null
    }
}

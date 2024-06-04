import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { CheckboxModule } from 'primeng/checkbox'
import { LoginService } from '../../services/login.service'

@Component({
    selector: 'app-admin-page',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        ButtonModule,
        InputTextModule,
        CheckboxModule,
    ],
    templateUrl: './admin-page.component.html',
    styleUrl: './admin-page.component.scss',
})
export class AdminPageComponent {
    loginForm: FormGroup
    private loginService = inject(LoginService)

    constructor(private fb: FormBuilder) {
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            rememberMe: [false],
        })
    }

    login() {
        console.log('Bejelentkezve: ', this.loginForm.value)

        this.loginService.login(this.loginForm.value).subscribe({
            next: (response: any) => {
                localStorage.setItem('token', response.token)
            },
            error: () => {
                console.log('Failed to log in')
            },
        })
    }
}

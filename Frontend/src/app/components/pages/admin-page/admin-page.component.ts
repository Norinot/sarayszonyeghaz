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
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'

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
    private router = inject(Router)
    private toaster = inject(ToastrService)

    constructor(private fb: FormBuilder) {
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            rememberMe: [false],
        })
    }

    login() {
        this.loginService.login(this.loginForm.value).subscribe({
            next: (response: any) => {
                this.loginService.setToken(response.token)
                localStorage.setItem('token', response.token)
                localStorage.setItem('expire', response.expire)
                this.toaster.success('Sikeres bejelentkezeés')
                this.router.navigate(['/'])
            },
            error: () => {
                this.toaster.error('Hiba történt a bejelentkezés során')
            },
        })
    }
}

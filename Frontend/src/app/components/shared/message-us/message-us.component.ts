import { Component, OnInit, inject } from '@angular/core'
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { IMessage } from './message.interface'
import { MessageUsHttpService } from '../../services/map/messageUs-http-service.service'
import { ToastrService } from 'ngx-toastr'

@Component({
    selector: 'app-message-us',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        InputTextModule,
        InputTextareaModule,
    ],
    templateUrl: './message-us.component.html',
    styleUrl: './message-us.component.scss',
    providers: [MessageUsHttpService],
})
export class MessageUsComponent implements OnInit {
    messageGroup: FormGroup = new FormGroup({})
    private fb: FormBuilder = inject(FormBuilder)
    private messageService = inject(MessageUsHttpService)
    private toastr = inject(ToastrService)

    ngOnInit() {
        this.messageGroup = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.email],
            phone: ['', Validators.pattern('[- +()0-9]{10,12}')],
            message: ['', Validators.required],
            terms: [false, Validators.requiredTrue],
        })
    }

    onSubmit() {
        const message: IMessage = {
            FirstName: this.messageGroup.value.firstName,
            LastName: this.messageGroup.value.lastName,
            Email: this.messageGroup.value.email,
            Message: this.messageGroup.value.message,
        }

        this.messageService.sendMessage(message).subscribe({
            complete: () => {
                this.toastr.success('Üzenet elküldve!')
                this.messageGroup.reset()
            },
            error: (error) => {
                this.messageGroup.reset()
                this.toastr.error('Probléma történt az üzenet küldése során')
            },
        })
    }
}

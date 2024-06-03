import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { IMessage } from './message.interface';
import { MessageUsHttpService } from '../../services/map/messageUs-http-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-message-us',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ButtonModule, InputTextModule, InputTextareaModule],
  templateUrl: './message-us.component.html',
  styleUrl: './message-us.component.scss',
  providers: [MessageUsHttpService]
})
export class MessageUsComponent implements OnInit {

  messageGroup: FormGroup = new FormGroup({});
  private fb: FormBuilder = inject(FormBuilder);
  private messageService = inject(MessageUsHttpService);
  private toastr = inject(ToastrService);

  ngOnInit() {
    this.messageGroup = this.fb.group({
      firstName: '',
      lastName: '',
      email: '',
      message: ''
    });
  }

  onSubmit() {
    const message: IMessage = {
      FirstName: this.messageGroup.value.firstName,
      LastName: this.messageGroup.value.lastName,
      Email: this.messageGroup.value.email,
      Message: this.messageGroup.value.message
    };

    this.messageService.sendMessage(message).subscribe(
      {
        complete: () => {
          this.toastr.success('Message sent successfully');
          this.messageGroup.reset();
        },
        error: (error) => {
          this.messageGroup.reset();
          this.toastr.error('An error occurred while sending the message', error);
        }
      }
    );
  }
}

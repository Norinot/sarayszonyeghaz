import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { IMessage } from './message.interface';
import { MessageUsHttpServiceService } from '../../services/map/messageUs-http-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-message-us',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, InputTextModule, ButtonModule, InputTextareaModule, HttpClientModule],
  templateUrl: './message-us.component.html',
  styleUrl: './message-us.component.scss',
  providers: [MessageUsHttpServiceService]
})
export class MessageUsComponent implements OnInit {

  messageGroup: FormGroup;

  constructor(private fb: FormBuilder, private messageService: MessageUsHttpServiceService, private toastr: ToastrService) {
    this.messageGroup = this.fb.group({
      firstName: '',
      lastName: '',
      email: '',
      message: ''
    });
  }

  ngOnInit() { }

  onSubmit() {
    const message: IMessage = {
      FirstName: this.messageGroup.value.firstName,
      LastName: this.messageGroup.value.lastName,
      Email: this.messageGroup.value.email,
      Message: this.messageGroup.value.message
    };

    this.messageService.sendMessage(message).subscribe(
      (response) => {
        this.messageGroup.reset();
      },
      (error) => {
        this.messageGroup.reset();
        this.toastr.error(error.error);
      }
    );

  }
}

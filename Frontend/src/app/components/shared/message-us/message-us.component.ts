import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

interface Message {
  FirstName: string;
  LastName: string;
  Email: string;
  Message: string;
}

@Component({
  selector: 'app-message-us',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, InputTextModule, ButtonModule, InputTextareaModule, HttpClientModule],
  templateUrl: './message-us.component.html',
  styleUrl: './message-us.component.scss'
})
export class MessageUsComponent implements OnInit {

  messageGroup: FormGroup;

  constructor(private fb: FormBuilder,private http: HttpClient) {
    this.messageGroup = this.fb.group({
      firstName: '',
      lastName: '',
      email: '',
      message: ''
    });
  }

  ngOnInit() {}

  onSubmit() {
    const message: Message = {
      FirstName: this.messageGroup.value.firstName,
      LastName: this.messageGroup.value.lastName,
      Email: this.messageGroup.value.email,
      Message: this.messageGroup.value.message
    };

    this.http.post('http://sarayszonyeg.hu:8080/message-us', message).subscribe(
      (response) => {
        this.messageGroup.reset();
      },
      (error) => {
        this.messageGroup.reset();
        console.log(error);
      }
    );

  }
}

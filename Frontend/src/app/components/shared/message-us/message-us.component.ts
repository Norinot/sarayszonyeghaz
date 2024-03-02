import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-message-us',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, InputTextModule, ButtonModule, InputTextareaModule],
  templateUrl: './message-us.component.html',
  styleUrl: './message-us.component.scss'
})
export class MessageUsComponent implements OnInit {

  messageGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.messageGroup = this.fb.group({
      firstName: '',
      lastName: '',
      email: '',
      message: ''
    });
  }

  ngOnInit() {}

  onSubmit() {
    console.log(this.messageGroup.value);
    //Sending an email is not possible without a servrSide endpoint to handle the request. So for now its just logging.
  }
}

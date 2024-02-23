import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-core-search',
  standalone: true,
  imports: [InputTextModule, FormsModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './core-search.component.html',
  styleUrl: './core-search.component.scss'
})
export class CoreSearchComponent {
  value: string | undefined;
}

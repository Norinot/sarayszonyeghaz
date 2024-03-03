import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {

  constructor() { }


  getUnused(): boolean {
    return environment.show_unused;
  }
}

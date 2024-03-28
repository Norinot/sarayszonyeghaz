import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMessage } from '../../shared/message-us/message.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageUsHttpServiceService {

  constructor(private http: HttpClient) { }

  sendMessage(message: IMessage) : Observable<Object> {
    return this.http.post('http://sarayszonyeg.hu:8080/message-us', message)
  }
}

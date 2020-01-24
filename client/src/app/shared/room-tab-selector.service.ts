import {Observable, Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {ClientService} from './client.service';

@Injectable({providedIn: 'root'})
export class RoomTabSelectorService {

  constructor(private clientService: ClientService) {}
  private subject = new Subject<any>();

  getObservable(): Observable<any> {
    return this.subject.asObservable();
  }

  public onNewRoomEntered() {
    this.subject.next(this.clientService.getEnteredChatrooms().length - 1);
  }
}

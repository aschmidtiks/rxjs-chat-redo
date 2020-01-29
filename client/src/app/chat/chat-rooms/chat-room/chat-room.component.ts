import {Component, OnDestroy, OnInit} from '@angular/core';
import {ClientService} from '../../../shared/client.service';
import {fromEvent, ReplaySubject, Subject, Subscription} from 'rxjs';
import {MessageModel} from '../../../shared/message.model';
import {filter, finalize, take, takeUntil} from 'rxjs/operators';
import {componentDestroyed} from '@w11k/ngx-componentdestroyed';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit, OnDestroy {

  private messageSubscription: Subscription;
  // private messageSubscription = new Subject<MessageModel>();

  constructor(private clientService: ClientService) {
  }

  onMessageReceived(entry) {
    console.log('onmessagereceived');
    this.updateChatHistory(entry);
  }

  updateChatHistory(entry) {
    // console.log(this.clientService.getChatHistory());
    // console.log(entry.user);
    // console.log('entry: ' + entry.message + 'entry2: ' + entry.chat + ' length?: ' + this.clientService.getChatHistory().length);
    // this.clientService.getChatHistory().concat(entry);
    this.clientService.getChatHistory().push(entry);
  }

  ngOnInit() {
    console.log('ngoninit');
    // this.messageSubscription = this.clientService
    this.messageSubscription = this.clientService
      .onMessageReceived()
      .pipe(
        // filter(message => true),
      )
      .subscribe((message: MessageModel) => {
        console.log('subscribe');
        this.onMessageReceived(message);
      });
  }

  ngOnDestroy() {
    console.log('destroy');
    this.messageSubscription.unsubscribe();
  }


}

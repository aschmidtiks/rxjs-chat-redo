import {Component, OnDestroy, OnInit} from '@angular/core';
import {ClientService} from '../../../shared/client.service';
import {Subscription} from 'rxjs';
import {MessageModel} from '../../../shared/message.model';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit, OnDestroy {

  private messageSubscription: Subscription;

  constructor(private clientService: ClientService) {
  }

  onMessageReceived(entry) {
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
    this.messageSubscription = this.clientService
      .registerHandler()
      .subscribe((message: MessageModel) => {
        this.onMessageReceived(message);
      });
  }

  ngOnDestroy() {
    this.messageSubscription.unsubscribe();
  }


}

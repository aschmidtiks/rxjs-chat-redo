import {Component, OnDestroy, OnInit} from '@angular/core';
import {ClientService} from '../../../shared/client.service';
import {Subscription} from 'rxjs';
import {MessageModel} from '../../../shared/message.model';

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
    this.clientService.getChatHistory().push(entry);
  }

  ngOnInit() {
    this.messageSubscription = this.clientService
      .onMessageReceived()
      .subscribe((message: MessageModel) => {
        console.log(message);
        this.onMessageReceived(message);
      });
  }

  ngOnDestroy() {
    this.messageSubscription.unsubscribe();
  }
}

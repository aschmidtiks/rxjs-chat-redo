import {Component, OnInit} from '@angular/core';
import {ClientService} from '../../../../shared/client.service';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.css']
})
export class ChatInputComponent implements OnInit {

  constructor(private clientService: ClientService) {
  }

  ngOnInit() {
  }

  sendMessage(message) {
    this.clientService.message(this.clientService.getCurrentChatroom(), message, (err, cb) => {
    });
  }
}

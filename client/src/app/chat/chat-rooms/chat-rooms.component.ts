import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../client.service';

@Component({
  selector: 'app-chat-rooms',
  templateUrl: './chat-rooms.component.html',
  styleUrls: ['./chat-rooms.component.css']
})
export class ChatRoomsComponent implements OnInit {

  constructor(private clientService: ClientService) { }

  ngOnInit() {
  }

}

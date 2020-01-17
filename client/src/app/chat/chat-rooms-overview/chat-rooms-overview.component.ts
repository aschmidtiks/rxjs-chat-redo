import {Component, OnInit} from '@angular/core';
import {ClientService} from '../../client.service';

@Component({
  selector: 'app-chat-rooms-overview',
  templateUrl: './chat-rooms-overview.component.html',
  styleUrls: ['./chat-rooms-overview.component.css']
})
export class ChatRoomsOverviewComponent implements OnInit {

  private availableRooms;

  constructor(private clientService: ClientService) {
  }

  getAvailableRooms() {
    return this.availableRooms;
  }

  joinRoom(roomName) {
    this.clientService.join(roomName, () => {
      this.clientService.setEnteredChatrooms(roomName);
      console.log(this.clientService.getEnteredChatrooms());
    });
  }

  ngOnInit() {
    this.clientService.getChatrooms((err, availableRooms) => {
      this.availableRooms = availableRooms;
    });
  }
}

import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ClientService} from '../../shared/client.service';
import {RoomTabSelectorService} from '../../shared/room-tab-selector.service';

@Component({
  selector: 'app-chat-rooms-overview',
  templateUrl: './chat-rooms-overview.component.html',
  styleUrls: ['./chat-rooms-overview.component.css']
})
export class ChatRoomsOverviewComponent implements OnInit {

  private availableRooms;

  constructor(private clientService: ClientService,
              private roomTabSelectorService: RoomTabSelectorService) {
  }

  getAvailableRooms() {
    return this.availableRooms;
  }

  joinRoom(roomName) {
    this.clientService.join(roomName, (err, chatHistory) => {
      if (err) {
        console.error(err);
      } else {
        this.clientService.setEnteredChatrooms(roomName);
        this.clientService.setCurrentChatroom(roomName);
        this.clientService.setChatHistory(chatHistory);
        this.roomTabSelectorService.onNewRoomEntered();
      }
    });
  }

  ngOnInit() {
    this.clientService.getChatrooms((_, availableRooms) => {
      this.availableRooms = availableRooms;
    });
  }
}

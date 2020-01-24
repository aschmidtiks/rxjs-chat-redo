import {Component, OnInit} from '@angular/core';
import {ClientService} from '../../shared/client.service';
import {MatTabChangeEvent} from '@angular/material/tabs';
import {Subscription} from 'rxjs';
import {RoomTabSelectorService} from '../../shared/room-tab-selector.service';

@Component({
  selector: 'app-chat-rooms',
  templateUrl: './chat-rooms.component.html',
  styleUrls: ['./chat-rooms.component.css']
})
export class ChatRoomsComponent implements OnInit {

  private onFirstRoomEnteredSubscription: Subscription;
  private selected: any;

  private didChangeManually = false;

  constructor(private clientService: ClientService,
              private roomTabSelectorService: RoomTabSelectorService) {
  }

  tabChanged(tabchangedEvent: MatTabChangeEvent) {
    if (this.didChangeManually) {
      this.clientService.changeRoom(tabchangedEvent.tab.textLabel, (err, chatHistory) => { // todo sorgt für doppelte ausgabe bei tabChange
        if (err) {
          console.error(err);
        } else {
          // this.selected = tabchangedEvent.index;
          this.clientService.setCurrentChatroom(tabchangedEvent.tab.textLabel);
          this.clientService.setChatHistory(chatHistory);
        }
      });
      this.didChangeManually = false;
    }
  }

  ngOnInit() {
    this.onFirstRoomEnteredSubscription = this.roomTabSelectorService
      .getObservable()
      .subscribe(index => {
        this.selected = index;
      });
  }

}

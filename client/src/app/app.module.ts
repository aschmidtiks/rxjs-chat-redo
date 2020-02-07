import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import {ClientService} from './shared/client.service';
import { ChatRoomsComponent } from './chat/chat-rooms/chat-rooms.component';
import { ChatRoomComponent } from './chat/chat-rooms/chat-room/chat-room.component';
import { ChatRoomsOverviewComponent } from './chat/chat-rooms-overview/chat-rooms-overview.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import { ChatInputComponent } from './chat/chat-rooms/chat-room/chat-input/chat-input.component';
import {RoomTabSelectorService} from './shared/room-tab-selector.service';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    ChatRoomsComponent,
    ChatRoomComponent,
    ChatRoomsOverviewComponent,
    ChatInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatGridListModule,
    MatTabsModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [ClientService, RoomTabSelectorService],
  bootstrap: [AppComponent]
})
export class AppModule { }

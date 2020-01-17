import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import {ClientService} from './client.service';
import { ChatRoomsComponent } from './chat/chat-rooms/chat-rooms.component';
import { ChatRoomComponent } from './chat/chat-rooms/chat-room/chat-room.component';
import { ChatRoomsOverviewComponent } from './chat/chat-rooms-overview/chat-rooms-overview.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    ChatRoomsComponent,
    ChatRoomComponent,
    ChatRoomsOverviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatGridListModule,
    MatTabsModule,
    BrowserAnimationsModule
  ],
  providers: [ClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }

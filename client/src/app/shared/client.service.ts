import * as io from 'socket.io-client';
import {Injectable, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {MessageModel} from './message.model';
import {ChatRoomComponent} from '../chat/chat-rooms/chat-room/chat-room.component';

@Injectable({providedIn: 'root'})
export class ClientService {
  private url = 'http://localhost:3000';
  private socket;

  private enteredChatroom = [];
  private currentChatroom;
  private chatHistory: MessageModel[] = [];

  iRegister = 0;
  newMessage: MessageModel;
  constructor() {
    this.socket = io.connect(this.url);
  }

  // todo wird mehrfach beim empfangen von nachrichten aufgerufen, Debuggen:
  // todo socket.on wird nur bei Join aufgerufen aber der rest trotzdem wenn nur ne message gesendet wird
  public registerHandler = () => {
    return new Observable(observer => {
      this.socket.on('message', (message) => {
        this.newMessage = message;
        console.log(message)
        console.log('REGISTER: ' + (this.iRegister++));
        observer.next(message);
      });
    });
  }

  public onError() {
    return new Observable(observer => {
      this.socket.on('error', (err) => {
        console.log('received socket error:');
        console.log(err);
      });
    });
  }

  public changeRoom(chatroomName, cb) {
    this.socket.emit('changeRoom', chatroomName, cb);
  }

  // checks if user is already in database
  public register(name, cb) {
    this.socket.emit('register', name, cb);
  }

  public join(chatroomName, cb) {
    this.socket.emit('join', chatroomName, cb);
  }

  public leave(chatroomName, cb) {
    this.socket.emit('leave', chatroomName, cb);
  }

  public message(chatroomName, msg, cb) {
    this.socket.emit('message', {chatroomName, message: msg}, cb);
  }

  public getChatrooms(cb) {
    this.socket.emit('chatrooms', null, cb);
  }

  public getAvailableUsers(cb) {
    this.socket.emit('availableUsers', null, cb);
  }

  public setEnteredChatrooms(roomName) {
    this.enteredChatroom.push(roomName);
  }

  public getEnteredChatrooms() {
    return this.enteredChatroom;
  }

  public getEnteredChatroomByIndex(desiredIndex) {
    return this.enteredChatroom[desiredIndex];
  }

  public setCurrentChatroom(roomName) {
    this.currentChatroom = roomName;
  }

  public getCurrentChatroom() {
    return this.currentChatroom;
  }

  public setChatHistory(history) {
    this.chatHistory = history;
  }

  public getChatHistory() {
    return this.chatHistory;
  }
}


import * as io from 'socket.io-client';
import {Injectable, ViewChild} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {MessageModel} from './message.model';
import {ChatRoomComponent} from '../chat/chat-rooms/chat-room/chat-room.component';
import {take} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ClientService {
  private url = 'http://localhost:3000';
  private socket;

  private enteredChatroom = [];
  private currentChatroom;
  private chatHistory: MessageModel[] = [];

  mainObservable = new Observable( observer => {
    let iRegister = 0;
    this.socket.on('message', (message) => {
      console.log('onMessageReceived: ' + (iRegister++));
      observer.next(message);
    });
  });

  newObservable = new Observable();

  constructor() {
    this.socket = io.connect(this.url);
  }

  public onMessageReceived = () => {
    return this.mainObservable;
  }

  public cleanUpObservable() {
    this.mainObservable = new Observable();
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

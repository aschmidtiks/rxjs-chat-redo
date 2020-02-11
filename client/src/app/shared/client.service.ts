import * as io from 'socket.io-client';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {MessageModel} from './message.model';

@Injectable({providedIn: 'root'})
export class ClientService {
  private url = 'http://localhost:3000';
  private socket;

  private enteredChatroom = [];
  private currentChatroom;
  private chatHistory: MessageModel[] = [];

  mainObservable = new Observable(observer => {
    // let iRegister = 0;
    // todo return roomName and check for current room first
    // todo check why observer are not getting deleted
    this.socket.on('message', (message) => {
      // console.log(iRegister++);
      if (!observer.closed) {
        observer.next(message);
      }
    });
  });

  constructor() {
    this.socket = io.connect(this.url);
  }

  public onMessageReceived = () => {
    return this.mainObservable;
  }

  // public cleanUpObservable() {
  //   // this.mainObservable = new Observable();
  // }

  public changeRoom(roomName, cb) {
    this.socket.emit('changeRoom', roomName, cb);
  }

  // checks if user is already in database
  public register(name, cb) {
    this.socket.emit('register', name, cb);
  }

  public join(roomName, cb) {
    this.socket.emit('join', roomName, cb);
  }

  public leave(roomName, cb) {
    this.socket.emit('leave', roomName, cb);
  }

  public message(roomName, msg, cb) {
    this.socket.emit('message', {roomName, message: msg}, cb);
  }

  public getChatrooms(cb) {
    // this.socket.emit('chatrooms', null, cb);
    this.socket.emit('getChatrooms', cb);
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

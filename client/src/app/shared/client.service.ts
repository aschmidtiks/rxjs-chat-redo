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

  mainObservable = new Observable( observer => {
    let iRegister = 0;
    this.socket.on('message', (message) => {
      console.log('onMessageReceived: ' + (iRegister++));
      observer.next(message);
    });
  });

  constructor() {
    this.socket = io.connect(this.url);
  }

  public onMessageReceived = () => {
    return this.mainObservable;
  }

  public cleanUpObservable() {
    this.mainObservable = new Observable();
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
    // this.socket.emit('message', {chatroomName, message: msg}, cb);
    this.socket.emit('message', {chatroomName, message: msg}, cb);
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

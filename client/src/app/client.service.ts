import * as io from 'socket.io-client';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class ClientService {
  private url = 'http://localhost:3000';
  private socket;

  private enteredChatroom = [];

  constructor() {
    this.socket = io.connect(this.url);
  }

  // message received
  public registerHandler(onMessageReceived) {
    this.socket.on('message', onMessageReceived);
  }

  // hört nichtmehr auf 'message'
  public unregisterHandler() {
    this.socket.off('message');
  }

  //  this.socket.on('error', function (err) {
  //   console.log('received socket error:');
  //   console.log(err);
  // });

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

  public setEnteredChatrooms(room) {
    this.enteredChatroom.push(room);
  }

  public getEnteredChatrooms() {
    return this.enteredChatroom;
  }
}


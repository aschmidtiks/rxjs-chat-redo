import * as io from 'socket.io-client';
import {Injectable} from '@angular/core';

// @Injectable({providedIn: 'root'})
export class ClientService {
  private url = 'http://localhost:3000';
  private socket;

  constructor() {
   this.socket = io.connect(this.url);
  }

  public registerHandler(onMessageReceived) {
    this.socket.on('message', onMessageReceived);
  }

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
    this.socket.emit('message', { chatroomName, message: msg }, cb);
  }

  public getChatrooms(cb) {
    this.socket.emit('chatrooms', null, cb);
  }

  public getAvailableUsers(cb) {
    this.socket.emit('availableUsers', null, cb);
  }
  //
  // return {
  //   register,
  //   join,
  //   leave,
  //   message,
  //   getChatrooms,
  //   getAvailableUsers,
  //   registerHandler,
  //   unregisterHandler
  // }
}


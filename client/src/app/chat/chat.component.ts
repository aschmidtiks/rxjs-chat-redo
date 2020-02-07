import {Component, OnInit} from '@angular/core';
import {ClientService} from '../shared/client.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private clientService: ClientService) {
  }

  private userName: string;

  ngOnInit() {
    // this.clientService.register('Rick', (err, user) => {
    //   if (err) {
    //     console.error(err);
    //   } else {
    //     // console.log('user ' + user.name + ' is a valid user');
    //   }
    // });
  }

  public getUserName() {
    return this.userName;
  }

  // todo res ausgabe kann weg
  public setUserNameAndEnterChat(value: string) {
    if (value != null && value !== 'user') {
      this.userName = value;
      this.clientService.register(this.userName, (err, res) => {
        if (err) {
          console.error(err);
        } else if (res) {
          console.log(res);
        }
      });
    } else {
      console.error('username must not be empty or called \"user\"');
    }
  }
}

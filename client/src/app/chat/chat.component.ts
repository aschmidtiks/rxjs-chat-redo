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

  ngOnInit() {
    this.clientService.register('Rick', (err, user) => {
      if (err) {
        console.error(err);
      } else {
        // console.log('user ' + user.name + ' is a valid user');
      }
    });
  }

}

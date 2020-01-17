import {Component} from '@angular/core';
import {ClientService} from './client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rxjs-chat';

  constructor(private clientService: ClientService) {
  }
}

import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from './services/configuration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'moviest';

  constructor(private _configurationService: ConfigurationService){}

  ngOnInit(){
    this._configurationService.getConfiguration();
  }
}

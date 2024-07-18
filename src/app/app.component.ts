import { Component, OnInit } from '@angular/core';
import { MetaService } from './meta.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Main Page';
  constructor(private metaService: MetaService) { }
// comment
  ngOnInit(): void {
    this.metaService.updateMetaTags({
      title: 'Sample',
      description: 'Learn more about our application and team.',
      image: 'https://img.jlmconsulting.services/fit-in/200x160/sls_1721270833526meta_offerring4.png',
      url: 'https://dev.bidsnbuys.com'
    });
  }
}
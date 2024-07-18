import { Component, OnInit } from '@angular/core';
import { MetaService } from './meta.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Your Application Title';
  constructor(private metaService: MetaService) { }
// comment
  ngOnInit(): void {
    this.metaService.updateMetaTags({
      title: 'About Us - My Application',
      description: 'Learn more about our application and team.',
      image: 'https://img.jlmconsulting.services/fit-in/256x155/sls_1720675394886Image_1.png',
      url: 'https://dev.bidsnbuys.com'
    });
  }
}
import { Component, OnInit } from '@angular/core';
import { MetaService } from './meta.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private metaService: MetaService) { }

  ngOnInit(): void {
    this.metaService.updateMetaTags({
      title: 'About Us - My Application',
      description: 'Learn more about our application and team.',
      image: 'https://example.com/about-image.jpg',
      url: 'https://example.com/about'
    });
  }
}
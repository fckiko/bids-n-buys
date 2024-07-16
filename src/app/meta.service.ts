import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class MetaService {

  constructor(private meta: Meta, private title: Title) { }

  updateMetaTags(config: { title?: string, description?: string, image?: string, url?: string }) {
    if (config.title) {
      this.title.setTitle(config.title);
      this.meta.updateTag({ name: 'og:title', content: config.title });
      this.meta.updateTag({ name: 'twitter:title', content: config.title });
    }

    if (config.description) {
      this.meta.updateTag({ name: 'description', content: config.description });
      this.meta.updateTag({ name: 'og:description', content: config.description });
      this.meta.updateTag({ name: 'twitter:description', content: config.description });
    }

    if (config.image) {
      this.meta.updateTag({ name: 'og:image', content: config.image });
      this.meta.updateTag({ name: 'twitter:image', content: config.image });
    }

    if (config.url) {
      this.meta.updateTag({ name: 'og:url', content: config.url });
      this.meta.updateTag({ name: 'twitter:url', content: config.url });
    }
  }
}

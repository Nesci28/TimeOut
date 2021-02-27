import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ElectronService } from 'ngx-electron';
import { IImageApi } from '../../../interfaces/images.interface';

import {
  IQuoteApi,
  IQuoteContentQuote,
} from '../../../interfaces/quotes.interface';
import { BaseComponent } from '../shared/base/base.component';
import { OverlayService } from './overlay.service';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
})
export class OverlayComponent extends BaseComponent implements OnInit {
  quote!: IQuoteContentQuote | void;
  image!: IImageApi | void;

  constructor(
    private overlayService: OverlayService,
    router: Router,
    electronService: ElectronService
  ) {
    super(router, electronService);
  }

  quoteCategories: string[] = [
    'inspire',
    'management',
    'sports',
    'life',
    'funny',
    'love',
    'art',
    'students',
  ];

  async ngOnInit(): Promise<void> {
    console.log('i am hgere :>> ');
    const showQuoteStr = localStorage.getItem('quotes');
    if (showQuoteStr) {
      const showQuote = JSON.parse(showQuoteStr);
      console.log('showQuote :>> ', showQuote);
      if (showQuote) {
        this.quote = await this.getQuote();
      }
    }

    const showImageStr = localStorage.getItem('image');
    if (showImageStr) {
      const showImage = JSON.parse(showImageStr);
      console.log('showImage :>> ', showImage);
      if (showImage) {
        this.image = await this.getImage();
      }
    }
  }

  skip(): void {
    this.renderer.send('closeOverlays');
  }

  postpone(minute: number): void {
    this.renderer.send('postponeOverlays', { minute });
  }

  private async getImage(): Promise<void | IImageApi> {
    const result = await this.overlayService.getImage().toPromise();
    if (result.urls) {
      return result;
    }

    return;
  }

  private async getQuote(): Promise<IQuoteContentQuote | void> {
    const category = this.getCategory();
    const result = await this.overlayService.getQuotes(category).toPromise();
    if (result.contents) {
      return result.contents.quotes[0];
    }

    return;
  }

  private getCategory(): string {
    const categories = this.quoteCategories.reduce(
      (accu: string[], curr: string) => {
        const categoryStr = localStorage.getItem(curr);
        if (categoryStr) {
          const category = JSON.parse(categoryStr);
          if (category) {
            return [...accu, curr];
          }
        }

        return accu;
      },
      []
    );

    return categories[Math.floor(Math.random() * categories.length)];
  }
}

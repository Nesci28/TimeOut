import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ElectronService } from 'ngx-electron';

import { IImageApi } from '../../../interfaces/images.interface';
import { IQuoteContentQuote } from '../../../interfaces/quotes.interface';
import { BaseComponent } from '../shared/base/base.component';
import { OverlayService } from './overlay.service';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
})
export class OverlayComponent extends BaseComponent implements OnInit {
  quote!: IQuoteContentQuote;
  image!: IImageApi;

  timer!: number;
  currentTimer!: number;
  progress = 0;

  constructor(
    private overlayService: OverlayService,
    private route: ActivatedRoute,
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
    const { ms } = this.route.snapshot.queryParams;
    this.timer = ms;
    this.currentTimer = ms;

    const showQuoteStr = localStorage.getItem('quotes');
    if (showQuoteStr) {
      const showQuote = JSON.parse(showQuoteStr);
      if (showQuote) {
        this.quote = await this.getQuote();
      }
    }

    const showImageStr = localStorage.getItem('image');
    if (showImageStr) {
      const showImage = JSON.parse(showImageStr);
      if (showImage) {
        this.image = await this.getImage();
      }
    }

    setInterval(() => {
      this.currentTimer -= 1000;
      this.progress = 100 - (this.currentTimer * 100 / this.timer);

      if (this.currentTimer === 0) {
        this.close();
      }
    }, 1000);
  }

  close(): void {
    this.renderer.send('closeOverlays');
  }

  postpone(minute: number): void {
    this.renderer.send('postponeOverlays', { minute });
  }

  private async getImage(): Promise<IImageApi> {
    const result = await this.overlayService.getImage().toPromise();
    
    return result;
  }

  private async getQuote(): Promise<IQuoteContentQuote> {
    const category = this.getCategory();
    const result = await this.overlayService.getQuotes(category).toPromise();

    return result.contents.quotes[0];
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

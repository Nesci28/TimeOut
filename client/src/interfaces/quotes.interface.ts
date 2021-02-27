export interface IQuoteContentQuote {
  quote: string;
  author: string;
  category: string;
}

interface IQuoteContent {
  quotes: IQuoteContentQuote[];
}

export interface IQuoteApi {
  contents: IQuoteContent;
}

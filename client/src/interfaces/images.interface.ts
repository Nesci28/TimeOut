interface IImageApiUrl {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
}

interface IImageApiUser {
  name: string;
}

export interface IImageApi {
  urls: IImageApiUrl;
  user: IImageApiUser;
}

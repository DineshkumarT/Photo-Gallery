export interface Photo {
  farm: number;
  id: string;
  isfamily: number;
  isfriend: number;
  ispublic: number;
  owner: string;
  ownername: string;
  secret: string;
  server: string;
  title: string;
}

export interface Photos {
  page: number;
  pages: number;
  perpage: number;
  photo: Photo[];
}

export interface FavouritePhotos {
  [key: string]: Photo;
}

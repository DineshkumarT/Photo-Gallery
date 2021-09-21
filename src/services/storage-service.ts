import type { FavouritePhotos, Photo } from "../types/common";

export class StorageService {
  static createFavouritePhotos = () => {
    localStorage.setItem("favouritePhotos", "");
  };

  static getFavouritePhotos = () => {
    let favouritePhotos: FavouritePhotos;
    const stringifiedFavourites = localStorage.getItem("favouritePhotos");
    if (!stringifiedFavourites) {
      return {};
    }
    try {
      favouritePhotos = JSON.parse(stringifiedFavourites);
    } catch {
      favouritePhotos = {};
    }
    return favouritePhotos;
  };

  static setFavouritePhotos = (data: FavouritePhotos) => {
    try {
      const favourites = JSON.stringify(data);
      localStorage.setItem("favouritePhotos", favourites);
    } catch (e) {
      console.error("Error occured", e);
    }
  };

  static addPhotoToFavourites = (photo: Photo) => {
    const favourites = StorageService.getFavouritePhotos();
    favourites[photo.id] = photo;
    StorageService.setFavouritePhotos(favourites);
  };

  static removePhotoFromFavourites = (photo: Photo) => {
    const favourites = StorageService.getFavouritePhotos();
    const { [photo.id]: _removed, ...remainingPhotos } = favourites;
    if (_removed) {
      StorageService.setFavouritePhotos(remainingPhotos);
    }
  };
}

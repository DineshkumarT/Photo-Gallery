import { useEffect, useState } from "react";
import { StorageService } from "../services";
import type { FavouritePhotos } from "../types/common";

const useFavouritePhotos = () => {
  const [favouritePhotos, setFavouritePhotos] = useState<FavouritePhotos>({});
  useEffect(() => {
    let favourites = StorageService.getFavouritePhotos();
    if (favourites === null) {
      StorageService.createFavouritePhotos();
    } else {
      setFavouritePhotos(favourites);
    }
  }, []);

  return favouritePhotos;
};

export default useFavouritePhotos;

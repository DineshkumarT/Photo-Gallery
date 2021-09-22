import React, { useEffect, useState } from "react";
import { Button, PhotoDetails } from "..";
import { HeartImage } from "../../Images";
import { StorageService } from "../../services";
import { PhotoTileProps } from "./PhotoTileProps";

import "./styles.scss";

const PhotoTile: React.FC<PhotoTileProps> = ({ photo, favourite = false }) => {
  const [isFavourite, setIsFavourite] = useState(favourite);

  useEffect(() => {
    setIsFavourite(favourite);
  }, [favourite]);

  const handleFavourites = (value: boolean) => {
    if (value) {
      StorageService.addPhotoToFavourites(photo);
      setIsFavourite(true);
    } else {
      StorageService.removePhotoFromFavourites(photo);
      setIsFavourite(false);
    }
  };

  const getPhotoUrl = () => {
    return `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
  };

  return (
    <div className="photoContainer">
      <div className="photo">
        <img src={getPhotoUrl()} alt={""} />
      </div>
      {isFavourite && (
        <div className="favouritesIcon">
          <HeartImage />
        </div>
      )}
      <div className="details">
        <PhotoDetails title={photo.title} name={photo.ownername} />
      </div>
      <div className="favouritesButton">
        <Button
          name={!isFavourite ? "Favourites" : "Remove Favourites"}
          onClickHandler={() => handleFavourites(!isFavourite)}
        />
      </div>
    </div>
  );
};

export default React.memo(PhotoTile);

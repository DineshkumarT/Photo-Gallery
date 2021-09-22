import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Loader, PhotoTile } from "../../components";
import useFavouritePhotos from "../../hooks/useFavouritePhotos";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { PhotoService } from "../../services";
import type { Photo, Photos } from "../../types/common";
import type { PageRef } from "./PhotoGallery.types";
import "./styles.scss";

const PhotoGallery: React.FC<{}> = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isPending, setIsPending] = useState(false);
  const pageRef = useRef<Partial<PageRef>>({});
  const galleryRef = useRef<HTMLDivElement>(null);
  const favouritePhotos = useFavouritePhotos();
  const favouritePhotoList = useMemo(
    () => Object.values(favouritePhotos),
    [favouritePhotos]
  );

  const getPhotos = useCallback((pageNumber?: number) => {
    setIsPending(true);
    pageRef.current.isLoading = true;
    PhotoService.getPhotos<Photos>(pageNumber, ["owner_name"]).then(
      (photos) => {
        if (photos) {
          const { page, pages, photo } = photos;
          pageRef.current = { page, pages };
          setPhotos((prev) => [...prev, ...photo]);
        }
        setIsPending(false);
        pageRef.current.isLoading = false;
      }
    );
  }, []);

  useInfiniteScroll(galleryRef, pageRef, getPhotos);

  useEffect(() => {
    getPhotos();
  }, []);

  return (
    <>
      {photos.length > 0 && (
        <div className={"photoGallery"} ref={galleryRef}>
          {favouritePhotoList.map((photo, index) => {
            return <PhotoTile key={index} photo={photo} favourite={true} />;
          })}
          {photos.map((photo, index) => {
            const isFavouritePhoto = favouritePhotos[photo.id] ? true : false;
            return !isFavouritePhoto ? (
              <PhotoTile key={index} photo={photo} favourite={false} />
            ) : null;
          })}
        </div>
      )}
      <div id="loadMoreImages">{isPending && <Loader />}</div>
    </>
  );
};

export default PhotoGallery;

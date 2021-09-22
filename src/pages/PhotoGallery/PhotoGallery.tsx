import { useCallback, useEffect, useRef, useState } from "react";
import { Loader, PhotoTile } from "../../components";
import useFavouritePhotos from "../../hooks/useFavouritePhotos";
import { PhotoService } from "../../services";
import type { Photo, Photos } from "../../types/common";
import { PageRef } from "./PhotoGallery.types";
import "./styles.scss";

const PhotoGallery: React.FC<{}> = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isPending, setIsPending] = useState(false);
  const pageInfoRef = useRef<Partial<PageRef>>({});
  const galleryRef = useRef<HTMLDivElement>(null);
  const favouritePhotos = useFavouritePhotos();

  useEffect(() => {
    const photoArray = Object.values(favouritePhotos);
    setPhotos((previousState) => [...photoArray, ...previousState]);
  }, [favouritePhotos]);

  const getPhotos = useCallback((pageNumber?: number) => {
    setIsPending(true);
    pageInfoRef.current.isLoading = true;
    PhotoService.getPhotos<Photos>(pageNumber, ["owner_name"]).then(
      (photos) => {
        if (photos) {
          const { page, pages, photo } = photos;
          pageInfoRef.current = { page, pages };
          setPhotos((prev) => [...prev, ...photo]);
        }
        setIsPending(false);
        pageInfoRef.current.isLoading = false;
      }
    );
  }, []);

  const handleScrollEvent = useCallback(() => {
    if (galleryRef.current) {
      if (
        window.scrollY + window.innerHeight >
        galleryRef.current.clientHeight * 0.9
      ) {
        const { page, pages, isLoading } = pageInfoRef.current;
        if (!isLoading && page && pages) {
          const nextPage = page + 1;
          if (nextPage <= pages) {
            getPhotos(nextPage);
          }
        }
      }
    }
  }, [galleryRef.current]);

  useEffect(() => {
    getPhotos();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollEvent);

    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  }, []);

  return (
    <>
      {photos.length > 0 && (
        <div className={"photoGallery"} ref={galleryRef}>
          {photos.map((photo, index) => {
            const isFavourite = favouritePhotos[photo.id] ? true : false;
            return (
              <PhotoTile key={index} photo={photo} favourite={isFavourite} />
            );
          })}
        </div>
      )}
      <div id="loadMoreImages">{isPending && <Loader />}</div>
    </>
  );
};

export default PhotoGallery;

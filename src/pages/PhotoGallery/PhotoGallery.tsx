import { useCallback, useEffect, useRef, useState } from "react";
import { Loader, PhotoTile } from "../../components";
import useFavouritePhotos from "../../hooks/useFavouritePhotos";
import { PhotoService } from "../../services";
import type { Photo, Photos } from "../../types/common";
import "./styles.scss";

const PhotoGallery: React.FC<{}> = ({}) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isPending, setIsPending] = useState(false);
  const pageInfo = useRef<Partial<Omit<Photos, "photo">>>({});
  const favouritePhotos = useFavouritePhotos();

  useEffect(() => {
    const photoArray = Object.values(favouritePhotos);
    setPhotos((previousState) => [...photoArray, ...previousState]);
  }, [favouritePhotos]);

  const getPhotos = useCallback((pageNumber?: number) => {
    setIsPending(true);
    PhotoService.getPhotos<Photos>(pageNumber, ["owner_name"]).then(
      (photos) => {
        if (photos) {
          const { page, pages, photo } = photos;
          pageInfo.current = { page, pages };
          setPhotos((prev) => [...prev, ...photo]);
        }
        setIsPending(false);
      }
    );
  }, []);

  useEffect(() => {
    getPhotos();
  }, []);

  useEffect(() => {
    const element = document.querySelector("#loadMoreImages");

    const handleIntersection = (entries: any[]) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          pageInfo.current.page &&
          pageInfo.current.pages
        ) {
          const nextPage = pageInfo.current.page + 1;
          if (nextPage <= pageInfo.current.pages) {
            getPhotos(nextPage);
          }
        }
      });
    };

    let intersectionObserver: IntersectionObserver;
    if (element) {
      intersectionObserver = new IntersectionObserver(handleIntersection);
      intersectionObserver.observe(element);
    }
    return () => {
      if (element && intersectionObserver) {
        intersectionObserver.unobserve(element);
      }
    };
  }, []);

  return (
    <>
      {photos.length > 0 && (
        <div className={"photoGallery"}>
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

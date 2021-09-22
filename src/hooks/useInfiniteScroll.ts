import { useCallback, useEffect } from "react";
import type { PageRef } from "../pages/PhotoGallery/PhotoGallery.types";

const useInfiniteScroll = (
  galleryRef: React.RefObject<HTMLDivElement>,
  pageRef: React.RefObject<Partial<PageRef>>,
  callback: (pageNumber: number) => void
) => {
  const handleScrollEvent = useCallback(() => {
    if (galleryRef.current && pageRef.current) {
      if (
        window.scrollY + window.innerHeight >
        galleryRef.current.clientHeight * 0.8
      ) {
        const { page, pages, isLoading } = pageRef.current;
        if (!isLoading && page && pages) {
          const nextPage = page + 1;
          if (nextPage <= pages) {
            callback(nextPage);
          }
        }
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollEvent);

    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  }, []);
};

export default useInfiniteScroll;

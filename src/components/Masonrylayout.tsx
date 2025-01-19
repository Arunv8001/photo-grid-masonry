import { useEffect, useRef, useState } from "react";
import { PexelsResponse, PhotoCardProps } from "../shared/interfaces/photos";
import PhotoCard from "./PhotoCard";
import fetchPhotos from "../services/PhotosAPI";

const MasonryLayout = () => {
  const [photos, setPhotos] = useState<PhotoCardProps[]>([]);
  const [errorMsg, setErrorMsg] = useState<null | string>(null);
  const [columns, setColumns] = useState<number>(3);
  const [page, setPage] = useState<number>(1);

  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    fetchData(page);
  }, [page]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 600) setColumns(2);
      else if (width < 900) setColumns(3);
      else if (width < 1200) setColumns(4);
      else if (width < 1500) setColumns(5);
      else setColumns(6);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchData = async (page: number) => {
    try {
      const response: PexelsResponse = await fetchPhotos(page);
      setPhotos((prev) => [...prev, ...response.photos]);
      setErrorMsg(null);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMsg(error.message);
      }
    }
  };

  const generateColumns = () => {
    const grid: PhotoCardProps[][] = Array.from({ length: columns }, () => []);
    photos.forEach((photo, index) => {
      grid[index % columns].push(photo);
    });
    return grid;
  };

  const gridColumns = generateColumns();

  // Virtualized scrolling
  const lastPhotoRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setPage((prev) => prev + 1);
      },
      { threshold: 1.0 }
    );

    if (lastPhotoRef.current) observer.current.observe(lastPhotoRef.current);

    return () => observer.current?.disconnect();
  }, [photos]);


  if (errorMsg) {
    return <div>Error: {errorMsg}</div>;
  }

  return (
    <div className="masonry-layout">
      <div className="masonry-grid">
        {gridColumns.map((column, colIndex) => (
          <div key={colIndex} className="masonry-column">
            {column.map((photo, index) => (
              <div
                key={photo.id}
                ref={index === column.length - 1 ? lastPhotoRef : null}
              >
                <PhotoCard photo={photo} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MasonryLayout;

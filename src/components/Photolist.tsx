import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PexelsResponse, PhotoCardProps } from "../shared/interfaces/photos";
import PhotoCard from "./PhotoCard";
import { fetchImages } from "../services/PhotosAPI";

const Photolist = () => {
  const [photos, setPhotos] = useState<PhotoCardProps[]>([]);
  const [errorMsg, setErrorMsg] = useState<null | string>(null);
  const [columns, setColumns] = useState<number>(3);
  const [page, setPage] = useState<number>(1);
  const observer = useRef<IntersectionObserver | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const generateColumns = () => {
    const grid: PhotoCardProps[][] = Array.from({ length: columns }, () => []);
    photos.forEach((photo, index) => {
      grid[index % columns].push(photo);
    });
    return grid;
  };
  const gridColumns = generateColumns();

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

  const fetchData = useCallback(async (page: number) => {
    setLoading(true);
    try {
      const response: PexelsResponse = await fetchImages(searchTerm, page);
      setPhotos((prevPhotos) =>
        page === 1 ? response.photos : [...prevPhotos, ...response.photos]
      );
      setErrorMsg(null);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMsg(error.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(page);
  }, [fetchData, page]);

  const handleSearch = useCallback(() => {
    setPage(1);
    fetchImages(searchTerm, 1);
  }, [searchTerm]);

  const lastPhotoRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading]
  );

  const photoList = useMemo(() => {
    return gridColumns.map((column, colIndex) => (
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
    ));
  }, [gridColumns, lastPhotoRef]);

  if (errorMsg) {
    return <div>Error: {errorMsg}</div>;
  }

  return (
    <div className="masonry-layout">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search images..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="masonry-grid">{photoList}</div>
      {isLoading && page > 1 && <p>Loading more images...</p>}
    </div>
  );
};

export default Photolist;

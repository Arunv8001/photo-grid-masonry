import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PexelsResponse, PhotoCardProps } from "../shared/interfaces/photos";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { fetchImages } from "../services/PhotosAPI";

const Photolist = () => {
  const [photos, setPhotos] = useState<PhotoCardProps[]>([]);
  const [errorMsg, setErrorMsg] = useState<null | string>(null);
  const [columns, setColumns] = useState<number>(3);
  const [page, setPage] = useState<number>(1);
  const observer = useRef<IntersectionObserver | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();

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

  const fetchData = useCallback(
    async (query: string, pageNumber: number) => {
      setLoading(true);
      setErrorMsg(null);
      try {
        const response: PexelsResponse = await fetchImages(query, pageNumber);
        setPhotos((prevPhotos) =>
          page === 1 ? response.photos : [...prevPhotos, ...response.photos]
        );
        setErrorMsg(null);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMsg("'Failed to fetch photos. Please try again later.'");
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    },
    [page]
  );

  useEffect(() => {
    if (page === 1) {
      fetchData(searchTerm, 1);
    }
  }, [fetchData, page]);

  useEffect(() => {
    if (page > 1) {
      fetchData(searchTerm, page);
    }
  }, [page, fetchData]);

  const handleSearch = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      setPhotos([]);
      setPage(1);
      fetchData(searchTerm, page);
    },
    [page, searchTerm]
  );

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

  const handlePhotoClick = useCallback(
    (photoId: number) => {
      navigate(`/photo/${photoId}`, { state: { searchTerm } });
    },
    [navigate, searchTerm]
  );

  const skeletonList = useMemo(() => {
    return Array.from({ length: 20 }).map((_, index) => (
      <div key={index} className="skeleton-item" />
    ));
  }, []);

  const photoList = useMemo(() => {
    return gridColumns.map((column, colIndex) => (
      <div key={colIndex} className="masonry-column">
        {column.map((photo, index) => (
          <div
            key={photo.id + photo.alt + index}
            ref={index === column.length - 1 ? lastPhotoRef : null}
            className="photo-card"
            onClick={() => handlePhotoClick(photo.id)}
          >
            <img
              loading="lazy"
              src={photo.src.large}
              srcSet={`${photo.src.medium} 1x, ${photo.src.large} 2x`}
              alt={photo.alt}
              onLoad={(e) => (e.currentTarget.style.opacity = "1")}
              style={{
                opacity: 0,
                transition: "opacity 0.3s ease-in-out",
              }}
            />
          </div>
        ))}
      </div>
    ));
  }, [gridColumns, handlePhotoClick, lastPhotoRef]);

  if (errorMsg) {
    return <div>Error: {errorMsg}</div>;
  }

  return (
    <div className="masonry-layout">
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
      />
      <div className="masonry-grid">
        {" "}
        {isLoading && page === 1 ? skeletonList : photoList}
      </div>
      {isLoading && page > 1 && <Loading />}
      {!isLoading && photos.length === 0 && <h2> No result Found...</h2>}
    </div>
  );
};

export default Photolist;

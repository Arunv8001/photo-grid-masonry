import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PhotoCardProps } from "../shared/interfaces/photos";
import { fetchPhoto } from "../services/PhotosAPI";

const PhotoDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [photo, setPhoto] = useState<PhotoCardProps | null>(null);

  useEffect(() => {
    const getPhoto = async () => {
      if (id) {
        try {
          const response = await fetchPhoto(Number(id));
          setPhoto(response);
        } catch (error) {
          console.error("Error fetching photo details:", error);
        }
      }
    };
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    getPhoto();
  }, [id]);

  if (!photo) {
    return <p>Loading photo details...</p>;
  }

  return (
    <div className="photo-detail">
      <Link className="back-button" to={"/"}>Back to Gallery</Link>
      <div className="photo-info">
          <h2>"{photo.alt}"</h2>
          <div className="photographer-detail">
          <p>
            <strong>Photographer:</strong> {photo.photographer}
          </p>
          <p>
            <strong>Date Taken:</strong> {new Date().toLocaleDateString()}
          </p>
          </div>
        </div>
      <div className="photo-detail-content">
        <img src={photo.src.large} alt={photo.alt} />
      </div>
    </div>
  );
};

export default PhotoDetail;

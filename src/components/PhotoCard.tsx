import { useNavigate } from "react-router-dom";
import { PhotoCardProps } from "../shared/interfaces/photos";

const PhotoCard = ({ photo }: { photo: PhotoCardProps }) => {
  const navigate = useNavigate();
  return (
    <div className="photo-card">
      <img loading="lazy" src={photo.src.large} alt={photo.alt} onClick={() => navigate(`/photo/${photo.id}`)} />
    </div>
  );
};

export default PhotoCard;

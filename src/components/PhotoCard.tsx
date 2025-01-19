import { PhotoCardProps } from "../shared/interfaces/photos";

const PhotoCard = ({ photo }: { photo: PhotoCardProps }) => {
  return (
    <div className="photo-card">
      <img loading="lazy" src={photo.src.large} alt={photo.alt} />
    </div>
  );
};

export default PhotoCard;

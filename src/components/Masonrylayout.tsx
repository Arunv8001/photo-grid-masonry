import { PexelsPhoto } from "../shared/interfaces/photos";

const MasonryLayout = ({items} : {items: PexelsPhoto[]} ) => {
  return (
    <div className="masonry-layout">
      {items.map((image: PexelsPhoto) => (
        <div
          key={image.id}
          className="masonry-item"
          style={{ height: `${image.height}px` }}
        >
          <img
                src={image.src.tiny}
                alt={`Image ${image.id}`}
                className="w-full object-cover bg-gray-200 min-h-[500px]"
              />
          {image.photographer}{" "}
        </div>
      ))}
    </div>
  );
};

export default MasonryLayout;

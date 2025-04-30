import React, { useState } from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

interface CardProps {
  id: number;
  title: string;
  description: string;
  url: string;
  alt?: string;
  link?: string;
  onFavoriteClick?: (id: number) => void;
}

const CardComponent: React.FC<CardProps> = ({
  id,
  title,
  description,
  url,
  alt,
  link,
  onFavoriteClick,
}) => {
  // Local state to track whether the card is favorited or not
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFavorited(!isFavorited); // Toggle the favorite state
    if (onFavoriteClick) {
      onFavoriteClick(id); // Pass the ID to the parent if needed
    }
  };

  return (
    <Link
      to={link || "#"}
      className="max-w-[260px] bg-white rounded-lg shadow-lg transition-transform transform hover:scale-101 gap-4 block"
    >
      <div className="relative">
        <img
          src={url}
          alt={alt}
          className="w-full hover:border-blue-500 h-[210px] object-fit rounded-t-lg"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-pink-500">{title}</h2>
          
          {/* Smaller, cleaner favorite button */}
          <button
            onClick={handleFavoriteClick}
            className={`p-2 ${isFavorited ? "text-red-500" : "text-gray-500"} bg-transparent rounded-full hover:text-pink-600 transition-all`}
          >
            {/* Heart icon */}
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                  2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
                  C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
                  c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
            </svg>
          </button>
        </div>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </Link>
  );
};

interface StoryProps {
  stories: Array<{
    id: number;
    title: string;
    description: string;
    documentId: string;
    cover_image?: { url: string; alt: string };
  }>;
  onFavoriteClick?: (id: number) => void;
}

const StoryCards: React.FC<StoryProps> = ({ stories, onFavoriteClick }) => {
  return (
    <div className="flex flex-wrap justify-center gap-7 pt-6 pb-6">
      {stories.map((story) => (
        <CardComponent
          key={story.id}
          id={story.id}
          title={story.title}
          description={story.description}
          url={
            story.cover_image?.url ||
            "https://res.cloudinary.com/dsfuhhdez/image/upload/v1745376147/three_little_pigs_4740ba3915.webp"
          }
          alt={story.cover_image?.alt || "Story Image"}
          link={`/story/${story.documentId}`}
          onFavoriteClick={onFavoriteClick}
        />
      ))}
    </div>
  );
};

export default StoryCards;

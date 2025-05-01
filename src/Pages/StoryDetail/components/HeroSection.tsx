import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const StoryViewer = () => {
  const { documentId } = useParams();

  interface Story {
    title: string;
    summary: string;
    audio?: { url: string };
    cover_image?: { url: string };
    content: string;
  }

  const [story, setStory] = useState<Story | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  const apiUrl = `http://62.72.46.248:1337/api/stories/${documentId}?populate=*`;

  useEffect(() => {
    setLoading(true);
    const fetchStory = async () => {
      try {
        const response = await axios.get(apiUrl);
        setStory(response.data.data);
      } catch (err) {
        setError("Failed to load story: " + (err as any).message);
      }
      setLoading(false);
    };

    fetchStory();
  }, [apiUrl]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
    setIsFavorite(favorites.includes(documentId));
  }, [documentId]);

  const toggleFavorite = () => {
    const storedFavorites = localStorage.getItem("favorites");
    let favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

    if (favorites.includes(documentId)) {
      favorites = favorites.filter((id: string) => id !== documentId);
      setIsFavorite(false);
    } else {
      favorites.push(documentId);
      setIsFavorite(true);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  if (error) return <p className="text-red-400 text-center">{error}</p>;
  if (!story) return <p className="text-center text-white">Loading...</p>;

  return (
    <div className="min-h-screen max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 font-serif">
      <div className="w-full px-4">
        <div className="max-w-5xl mx-auto flex flex-col-reverse lg:grid lg:grid-cols-2 gap-8 mt-4 items-center lg:items-start">
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-6">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-pink-500 tracking-tight leading-tight font-poppins">
  🌸 {story.title}
</h2>

  <p className="text-lg sm:text-xl italic font-light ">{story.summary}</p>

  {story.audio?.url && (
    <div className="p-6 mt-6 rounded-2xl border border-pink-300 bg-pink-50 shadow-lg w-full max-w-3xl mx-auto lg:mx-0">
      <p className="text-sm text-pink-600 mb-2 font-semibold flex items-center space-x-2">
        <span>🎧 Listen to the audio</span>
      </p>
      <audio
  controls
  className="w-full rounded-xl bg-gradient-to-r from-pink-300 to-purple-300 text-white shadow-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
>
  <source src={story.audio.url} type="audio/mpeg" />
  Your browser does not support the audio element.
</audio>


      <button
        onClick={toggleFavorite}
        className={`mt-3 w-full px-6 py-3 rounded-md font-semibold text-center transition-colors ${
          isFavorite
            ? "bg-pink-400 text-white hover:bg-pink-500"
            : "bg-white text-pink-600 hover:bg-pink-100 border border-pink-300"
        }`}
      >
        {isFavorite ? "👍 Favorited" : "🤍 Add to Favorites"}
      </button>
    </div>
  )}
</div>

          {/* Image */}
          {story.cover_image?.url && (
            <div className="flex justify-center lg:justify-end">
              <img
                src={story.cover_image.url}
                alt="Story Cover"
                className="w-48 sm:w-60 md:w-72 rounded-lg shadow-lg transform -rotate-12 hover:rotate-0 hover:scale-105 transition duration-300 ease-in-out"
              />
            </div>
          )}
        </div>
      </div>

      <div className="mt-[100px] prose prose-invert prose-p:text-pink-100 prose-img:rounded-lg prose-img:shadow max-w-none">
        <div dangerouslySetInnerHTML={{ __html: story.content }} />
      </div>
    </div>
  );
};

export default StoryViewer;

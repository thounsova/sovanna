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

  if (error) return <p className="text-red-400 text-center">{error}</p>;
  if (!story) return <p className="text-center text-white">Loading...</p>;

  return (
    <div className="  min-h-screen max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 font-serif">
      <div className="grid grid-cols-1 mt-7 lg:grid-cols-2 gap-10 items-start">
        <div>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-3 text-pink-500 tracking-tight">
            🌸 {story.title}
          </h2>
          <p className="text-base sm:text-lg text-pink-400 italic mb-6 font-light">
            {story.summary}
          </p>

          {story.audio?.url && (
            <div className="p-4 mt-4 rounded-xl border border-pink-400 bg-pink-300 shadow-sm w-full max-w-lg">
              <p className="text-sm  mb-2 font-semibold">🎧 Listen to the audio</p>
              <audio
                controls
                className="w-full rounded-md focus:outline-none bg-gray-700 text-white"
              >
                <source src={story.audio?.url} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
        </div>

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

      <div className="mt-[100px] prose prose-invert prose-p:text-pink-100 prose-img:rounded-lg prose-img:shadow max-w-none">
        <div dangerouslySetInnerHTML={{ __html: story.content }} />
      </div>
    </div>
  );
};

export default StoryViewer;

import { useState, useEffect } from "react";
import Hero from "./components/hero";
import Card from "./components/StoryCards";

interface StoryType {
  id: number;

  name: string;
}

interface StoryTypeResponse {
  data: StoryType[];
}

interface AgeRange {
  id: number;
  min_age: number;
  max_age: number;
  label: string;
}

interface AgeRangeResponse {
  data: AgeRange[];
}

export default function Story() {
  const [stories, setStories] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [storyTypes, setStoryTypes] = useState<StoryType[]>([]);
  const [ageRanges, setAgeRanges] = useState<AgeRange[]>([]);
  const [selectedStoryType, setSelectedStoryType] = useState<string>("");
  const [selectedAgeRange, setSelectedAgeRange] = useState<string>("");

  const Base_Url = "http://62.72.46.248:1337";

  // Fetch all story types
  useEffect(() => {
    fetch(`${Base_Url}/api/story-types`)
      .then((res) => res.json())
      .then((data: StoryTypeResponse) => setStoryTypes(data.data))
      .catch((err) => console.error("Story type fetch error:", err));
  }, []);

  // Fetch all age ranges
  useEffect(() => {
    fetch(`${Base_Url}/api/age-ranges`)
      .then((res) => res.json())
      .then((data: AgeRangeResponse) => setAgeRanges(data.data))
      .catch((err) => console.error("Age range fetch error:", err));
  }, []);

  // Fetch filtered stories
  useEffect(() => {
    let url = `${Base_Url}/api/stories?filters[title][$containsi]=${searchQuery}&populate=*`;

    if (selectedStoryType) {
      url += `&filters[story_type][id][$eq]=${selectedStoryType}`;
    }

    if (selectedAgeRange) {
      url += `&filters[age_range][id][$eq]=${selectedAgeRange}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => setStories(data.data))
      .catch((err) => console.error("Story fetch error:", err));
  }, [searchQuery, selectedStoryType, selectedAgeRange]);

  return (
    <main>
      <Hero onSearchQueryChange={setSearchQuery} />
      <div className="w-full flex flex-col-6 sm:flex-row flex-wrap items-center justify-center gap-4 p-6">
  {/* Story Type Dropdown */}
  <select
    value={selectedStoryType}
    onChange={(e) => setSelectedStoryType(e.target.value)}
    className="w-full sm:w-64 bg-pink-100 text-pink-700 rounded-full border border-pink-300 px-6 py-3 shadow-md focus:outline-none focus:ring-2 focus:ring-pink-300 transition duration-200 hover:bg-pink-200"
  >
    <option value="">🌈 Select Story Type</option>
    {storyTypes.map((type) => (
      <option key={type.id} value={type.id.toString()}>
        {type.name || "Unknown Type"}
      </option>
    ))}
  </select>

  {/* Age Range Dropdown */}
  <select
    value={selectedAgeRange}
    onChange={(e) => setSelectedAgeRange(e.target.value)}
    className="w-full sm:w-64 bg-blue-200 text-blue-800 rounded-full border border-blue-300 px-6 py-3 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200 hover:bg-blue-200"
  >
    <option value="">🧒 Select Age Range</option>
    {ageRanges.map((range) => (
      <option key={range.id} value={range.id.toString()}>
        {range.label} years
      </option>
    ))}
  </select>
</div>


      <div className="mt-6">
        {stories.length > 0 ? (
          <Card stories={stories} />
        ) : (
          <p className="text-center text-gray-500">Loading stories...</p>
        )}
      </div>
    </main>
  );
}

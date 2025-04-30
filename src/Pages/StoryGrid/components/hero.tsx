import React, { useState } from "react";

interface HeroProps {
  onSearchQueryChange: (query: string) => void;
}

export default function Hero({ onSearchQueryChange }: HeroProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchButtonClick = () => {
    onSearchQueryChange(searchQuery);
  };

  return (
    <section>
      <div className="p-4">
        <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-6 sm:gap-8 p-6">
          {/* Search Input and Button */}
          <div className="w-full sm:w-[500px] relative flex">
            <input
              type="text"
              placeholder="🔍 Search stories..."
              onChange={handleSearchQueryChange}
              className="w-full bg-pink-100 text-pink-700 rounded-full border-2 border-pink-400 
                     px-5 py-2 shadow-lg font-[Pacifico] text-lg
                     focus:outline-none focus:ring-4  transition-all duration-200 appearance-none"
            />

            <button
              onClick={handleSearchButtonClick}
              className="bg-pink-500 text-white rounded-full ml-2 px-6 py-2 font-semibold shadow-lg transition-all duration-200 hover:bg-pink-600"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

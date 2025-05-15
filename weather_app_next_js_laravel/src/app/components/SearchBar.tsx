import React from 'react';

interface SearchBarProps {
    city: string;
    setCity: (city: string) => void;
    handleSearch: (e: React.FormEvent) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ city, setCity, handleSearch }) => (
    <form onSubmit={handleSearch} className="flex items-center ">
        <input
            type="text"
            placeholder="Search city..."
            // className="input input-bordered w-screen border border-blue-100/30 focus:border focus:border-orange-500 rounded-lg px-4 py-2 max-w-xs lg:max-w-md xl:max-w-3xl  mr-6 "
            className="input input-bordered w-screen border border-blue-100/30 focus:outline-none focus:ring-1 focus:ring-orange-500/40 focus:border-orange-500/40 rounded-lg px-4 py-2 max-w-xs lg:max-w-md xl:max-w-3xl mr-6"

            value={city}
            onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit" className="btn btn-primary hover:bg-blue-600/40 transition-all border border-blue-100/30 rounded-lg px-4 py-2 ">
            GO
        </button>
    </form>
);

export default SearchBar;

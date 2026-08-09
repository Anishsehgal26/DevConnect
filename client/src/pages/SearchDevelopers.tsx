import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

interface Developer {
  id: number;
  name: string;
  bio?: string;
  github?: string;
}

export default function SearchDevelopers() {
  const [query, setQuery] = useState("");
  const [developers, setDevelopers] = useState<Developer[]>([]);

  const handleSearch = async () => {
    try {
      const res = await api.get(`/profile/search?q=${query}`);
      setDevelopers(res.data);
    } catch (error) {
      alert("Search failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          Search Developers
        </h1>

        <div className="flex gap-3 mb-6">
          <input
            className="flex-1 border p-3 rounded"
            placeholder="Search by name or bio"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-6 rounded"
          >
            Search
          </button>
        </div>

        <div className="space-y-4">
          {developers.map((dev) => (
            <Link
              key={dev.id}
              to={`/developer/${dev.id}`}
              className="block border rounded-lg p-4 bg-white hover:shadow"
            >
              <h2 className="text-xl font-semibold">
                {dev.name}
              </h2>

              <p className="text-gray-600 mt-1">
                {dev.bio || "No bio available"}
              </p>

              <p className="text-blue-600 mt-2">
                {dev.github || "GitHub not connected"}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
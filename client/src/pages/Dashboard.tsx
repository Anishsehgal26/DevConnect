import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

interface User {
  id: number;
  name: string;
  email: string;
  bio?: string;
  github?: string;
  linkedin?: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    api
      .get("/profile/me")
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/");
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Developer Dashboard</h1>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>

        {user ? (
          <div className="space-y-4">
            <div>
              <p className="text-gray-500">Name</p>
              <p className="text-xl font-semibold">{user.name}</p>
            </div>

            <div>
              <p className="text-gray-500">Email</p>
              <p className="text-xl">{user.email}</p>
            </div>

            <div>
              <p className="text-gray-500">Bio</p>
              <p>{user.bio || "No bio added yet"}</p>
            </div>

            <div>
              <p className="text-gray-500">GitHub</p>
              <p>{user.github || "Not connected"}</p>
            </div>

            <div>
              <p className="text-gray-500">LinkedIn</p>
              <p>{user.linkedin || "Not added"}</p>
            </div>
          </div>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>
    </div>
  );
}
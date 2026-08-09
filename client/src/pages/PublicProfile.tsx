import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string;
}

interface Developer {
  id: number;
  name: string;
  email: string;
  bio?: string;
  github?: string;
  linkedin?: string;
  projects: Project[];
}

export default function PublicProfile() {
  const { id } = useParams();

  const [developer, setDeveloper] = useState<Developer | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get(`/profile/${id}`);
        setDeveloper(res.data);
      } catch (error) {
        alert("Developer not found");
      }
    };

    fetchProfile();
  }, [id]);

  if (!developer) {
    return <p className="p-8">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-8">
        <h1 className="text-3xl font-bold">
          {developer.name}
        </h1>

        <p className="text-gray-600 mt-2">
          {developer.bio || "No bio available"}
        </p>

        <div className="mt-4 space-y-2">
          <p>
            <b>GitHub:</b> {developer.github || "Not connected"}
          </p>

          <p>
            <b>LinkedIn:</b> {developer.linkedin || "Not added"}
          </p>
        </div>

        <div className="mt-8 border-t pt-6">
          <h2 className="text-2xl font-bold mb-4">
            Projects
          </h2>

          {developer.projects.length === 0 ? (
            <p className="text-gray-500">
              No projects available.
            </p>
          ) : (
            <div className="space-y-4">
              {developer.projects.map((project) => (
                <div
                  key={project.id}
                  className="border rounded-lg p-4 bg-gray-50"
                >
                  <h3 className="text-xl font-semibold">
                    {project.title}
                  </h3>

                  <p className="text-gray-700 mt-2">
                    {project.description}
                  </p>

                  <p className="text-blue-600 mt-2">
                    {project.techStack}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
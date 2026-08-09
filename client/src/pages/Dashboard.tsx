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

interface Project {
    id: number;
    title: string;
    description: string;
    techStack: string;
    githubLink?: string;
    liveLink?: string;
}
interface GithubRepo {
    id: number;
    name: string;
    description: string;
    stars: number;
    forks: number;
    language: string;
    url: string;
}



export default function Dashboard() {
    const navigate = useNavigate();

    const [user, setUser] = useState<User | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [techStack, setTechStack] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editTechStack, setEditTechStack] = useState("");
    const [repos, setRepos] = useState<GithubRepo[]>([]);
    const [isEditingProfile, setIsEditingProfile] = useState(false);

    const [editName, setEditName] = useState("");
    const [editBio, setEditBio] = useState("");
    const [editGithub, setEditGithub] = useState("");
    const [editLinkedin, setEditLinkedin] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/");
            return;
        }

        const fetchData = async () => {
            try {
                const profileRes = await api.get("/profile/me");
                setUser(profileRes.data);
                setEditName(profileRes.data.name || "");
                setEditBio(profileRes.data.bio || "");
                setEditGithub(profileRes.data.github || "");
                setEditLinkedin(profileRes.data.linkedin || "");

                const projectRes = await api.get("/projects");
                setProjects(projectRes.data);

                if (profileRes.data.github) {
                    const username = profileRes.data.github
                        .replace("https://github.com/", "")
                        .replace("github.com/", "")
                        .trim();

                    const githubRes = await api.get(`/github/${username}`);
                    setRepos(githubRes.data);
                }
            } catch (error) {
                localStorage.removeItem("token");
                navigate("/");
            }
        };

        fetchData();
    }, [navigate]);

    const handleAddProject = async () => {
        try {
            const res = await api.post("/projects", {
                title,
                description,
                techStack,
            });

            setProjects([res.data, ...projects]);

            setTitle("");
            setDescription("");
            setTechStack("");
        } catch (error) {
            alert("Failed to add project");
        }
    };

    const handleDeleteProject = async (id: number) => {
        try {
            await api.delete(`/projects/${id}`);

            setProjects(projects.filter((project) => project.id !== id));
        } catch (error) {
            alert("Failed to delete project");
        }
    };

    const startEditing = (project: Project) => {
        setEditingId(project.id);
        setEditTitle(project.title);
        setEditDescription(project.description);
        setEditTechStack(project.techStack);
    };

    const handleUpdateProject = async () => {
        try {
            const res = await api.put(`/projects/${editingId}`, {
                title: editTitle,
                description: editDescription,
                techStack: editTechStack,
            });

            setProjects(
                projects.map((project) =>
                    project.id === editingId ? res.data : project
                )
            );

            setEditingId(null);
        } catch (error) {
            alert("Failed to update project");
        }
    };

    const cancelEditing = () => {
        setEditingId(null);
    };

    const handleUpdateProfile = async () => {
        try {
            const res = await api.put("/profile/me", {
                name: editName,
                bio: editBio,
                github: editGithub,
                linkedin: editLinkedin,
            });

            setUser(res.data);
            setIsEditingProfile(false);

            if (res.data.github) {
                const username = res.data.github
                    .replace("https://github.com/", "")
                    .replace("github.com/", "")
                    .trim();

                const githubRes = await api.get(`/github/${username}`);
                setRepos(githubRes.data);
            }
        } catch (error) {
            alert("Failed to update profile");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Developer Dashboard</h1>

                    <button
                        onClick={() => navigate("/developers")}
                        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                    >
                        Explore Developers
                    </button>

                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Logout
                    </button>
                    

                </div>

                {user ? (
                    <div className="space-y-4">
                        <button
                            onClick={() => setIsEditingProfile(!isEditingProfile)}
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            {isEditingProfile ? "Cancel" : "Edit Profile"}
                        </button>

                        {isEditingProfile ? (
                            <div className="space-y-3">
                                <input
                                    className="w-full border p-2 rounded"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    placeholder="Name"
                                />

                                <textarea
                                    className="w-full border p-2 rounded"
                                    value={editBio}
                                    onChange={(e) => setEditBio(e.target.value)}
                                    placeholder="Bio"
                                />

                                <input
                                    className="w-full border p-2 rounded"
                                    value={editGithub}
                                    onChange={(e) => setEditGithub(e.target.value)}
                                    placeholder="GitHub username or URL"
                                />

                                <input
                                    className="w-full border p-2 rounded"
                                    value={editLinkedin}
                                    onChange={(e) => setEditLinkedin(e.target.value)}
                                    placeholder="LinkedIn URL"
                                />

                                <button
                                    onClick={handleUpdateProfile}
                                    className="bg-green-600 text-white px-4 py-2 rounded"
                                >
                                    Save Profile
                                </button>
                            </div>
                        ) : (
                            <>
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
                            </>
                        )}
                    </div>
                ) : (
                    <p>Loading profile...</p>
                )}

                <div className="mt-8 border-t pt-6">
                    <h2 className="text-2xl font-bold mb-4">Add Project</h2>

                    <input
                        placeholder="Project Title"
                        className="w-full border p-2 rounded mb-3"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <textarea
                        placeholder="Project Description"
                        className="w-full border p-2 rounded mb-3"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <input
                        placeholder="Tech Stack (React, Node, PostgreSQL)"
                        className="w-full border p-2 rounded mb-3"
                        value={techStack}
                        onChange={(e) => setTechStack(e.target.value)}
                    />

                    <button
                        onClick={handleAddProject}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        Add Project
                    </button>
                </div>

                <div className="mt-8 border-t pt-6">
                    <h2 className="text-2xl font-bold mb-4">My Projects</h2>

                    {projects.length === 0 ? (
                        <p className="text-gray-500">No projects added yet.</p>
                    ) : (
                        <div className="space-y-4">
                            {projects.map((project) => (
                                <div
                                    key={project.id}
                                    className="border rounded-lg p-4 bg-gray-50"
                                >
                                    {editingId === project.id ? (
                                        <>
                                            <input
                                                className="w-full border p-2 rounded mb-2"
                                                value={editTitle}
                                                onChange={(e) => setEditTitle(e.target.value)}
                                            />

                                            <textarea
                                                className="w-full border p-2 rounded mb-2"
                                                value={editDescription}
                                                onChange={(e) => setEditDescription(e.target.value)}
                                            />

                                            <input
                                                className="w-full border p-2 rounded mb-3"
                                                value={editTechStack}
                                                onChange={(e) => setEditTechStack(e.target.value)}
                                            />

                                            <div className="flex gap-2">
                                                <button
                                                    onClick={handleUpdateProject}
                                                    className="bg-green-600 text-white px-3 py-1 rounded"
                                                >
                                                    Save
                                                </button>

                                                <button
                                                    onClick={cancelEditing}
                                                    className="bg-gray-500 text-white px-3 py-1 rounded"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <h3 className="text-xl font-semibold">
                                                {project.title}
                                            </h3>

                                            <p className="text-gray-700 mt-2">
                                                {project.description}
                                            </p>

                                            <p className="text-blue-600 mt-2">
                                                {project.techStack}
                                            </p>

                                            <div className="mt-4 flex gap-3">
                                                <button
                                                    onClick={() => startEditing(project)}
                                                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    onClick={() => handleDeleteProject(project.id)}
                                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="mt-8 border-t pt-6">
                        <h2 className="text-2xl font-bold mb-4">My Projects</h2>

                        {/* Projects list */}
                    </div>

                    {/* YAHAN GITHUB SECTION ADD KARNA HAI */}

                    <div className="mt-8 border-t pt-6">
                        <h2 className="text-2xl font-bold mb-4">GitHub Repositories</h2>

                        {repos.length === 0 ? (
                            <p className="text-gray-500">
                                Connect your GitHub account to see repositories.
                            </p>
                        ) : (
                            <div className="space-y-4">
                                {repos.map((repo) => (
                                    <div
                                        key={repo.id}
                                        className="border rounded-lg p-4 bg-gray-50"
                                    >
                                        <a
                                            href={repo.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-xl font-semibold text-blue-600 hover:underline"
                                        >
                                            {repo.name}
                                        </a>

                                        <p className="text-gray-700 mt-2">
                                            {repo.description || "No description"}
                                        </p>

                                        <div className="flex gap-4 mt-3 text-sm text-gray-600">
                                            <span>⭐ {repo.stars}</span>
                                            <span>🍴 {repo.forks}</span>
                                            <span>💻 {repo.language || "N/A"}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
        //    </div >
        //</div >
    );
}
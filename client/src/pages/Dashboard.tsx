import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    FiHome,
    FiFolder,
    FiUsers,
    FiLogOut,
    FiGithub,
    FiLinkedin,
    FiPlus,
} from "react-icons/fi";
import api from "../services/api";
import RepoCarousel from "../components/RepoCarousel";
import SkillChart from "../components/SkillChart";

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
}

export default function Dashboard() {
    const navigate = useNavigate();

    const [user, setUser] = useState<User | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [techStack, setTechStack] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        const fetchData = async () => {
            try {
                const profileRes = await api.get("/profile/me");
                setUser(profileRes.data);

                const projectRes = await api.get("/projects");
                setProjects(projectRes.data);
            } catch {
                localStorage.removeItem("token");
                navigate("/login");
            }
        };

        fetchData();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

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
        } catch {
            alert("Failed to add project");
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <div className="flex">
                <aside className="hidden w-64 border-r border-slate-800 bg-slate-900 lg:flex lg:flex-col">
                    <div className="border-b border-slate-800 p-6">
                        <h1 className="text-2xl font-bold text-blue-400">
                            DevConnect
                        </h1>
                    </div>

                    <nav className="flex-1 space-y-2 p-4">
                        <button className="flex w-full items-center gap-3 rounded-xl bg-blue-600 px-4 py-3 text-white">
                            <FiHome />
                            Dashboard
                        </button>

                        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-300 hover:bg-slate-800">
                            <FiFolder />
                            Projects
                        </button>

                        <button
                            onClick={() => navigate("/developers")}
                            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-300 hover:bg-slate-800"
                        >
                            <FiUsers />
                            Explore Developers
                        </button>
                    </nav>

                    <div className="border-t border-slate-800 p-4">
                        <button
                            onClick={handleLogout}
                            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-400 hover:bg-slate-800"
                        >
                            <FiLogOut />
                            Logout
                        </button>
                    </div>
                </aside>

                <main className="flex-1">
                    <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-xl">
                        <div className="flex items-center justify-between px-6 py-4">
                            <div>
                                <h2 className="text-2xl font-bold">
                                    Welcome back 👋
                                </h2>
                                <p className="text-slate-400">
                                    Manage your developer portfolio
                                </p>
                            </div>

                            <div className="rounded-full bg-blue-600 px-4 py-2 font-semibold">
                                {user?.name?.charAt(0) || "A"}
                            </div>
                        </div>
                    </header>

                    <div className="space-y-8 p-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 to-slate-800 p-8"
                        >
                            <div className="flex flex-col items-start justify-between gap-6 lg:flex-row">
                                <div>
                                    <h1 className="text-4xl font-bold">
                                        {user?.name || "Developer"}
                                    </h1>
                                    <p className="mt-3 max-w-2xl text-slate-300">
                                        {user?.bio ||
                                            "Full Stack Developer building scalable web applications with React, Node.js and PostgreSQL."}
                                    </p>

                                    <div className="mt-6 flex gap-4">
                                        {user?.github && (
                                            <a
                                                href={user.github}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 hover:border-blue-500"
                                            >
                                                <FiGithub />
                                                GitHub
                                            </a>
                                        )}

                                        {user?.linkedin && (
                                            <a
                                                href={user.linkedin}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 hover:border-blue-500"
                                            >
                                                <FiLinkedin />
                                                LinkedIn
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-4 text-center">
                                        <p className="text-3xl font-bold text-blue-400">
                                            {projects.length}
                                        </p>
                                        <p className="text-slate-400">Projects</p>
                                    </div>

                                    <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-4 text-center">
                                        <p className="text-3xl font-bold text-violet-400">
                                            6
                                        </p>
                                        <p className="text-slate-400">Skills</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <section>
                            <h3 className="mb-4 text-2xl font-bold">
                                GitHub Repositories
                            </h3>

                            <RepoCarousel username="octocat" />
                        </section>

                        <section>
                            <SkillChart />
                        </section>

                        <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
                            <div className="mb-6 flex items-center gap-2">
                                <FiPlus className="text-blue-400" />
                                <h3 className="text-2xl font-bold">
                                    Add New Project
                                </h3>
                            </div>

                            <div className="grid gap-4">
                                <input
                                    className="rounded-xl border border-slate-700 bg-slate-950 p-3 text-white outline-none focus:border-blue-500"
                                    placeholder="Project Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />

                                <textarea
                                    className="rounded-xl border border-slate-700 bg-slate-950 p-3 text-white outline-none focus:border-blue-500"
                                    placeholder="Project Description"
                                    rows={4}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />

                                <input
                                    className="rounded-xl border border-slate-700 bg-slate-950 p-3 text-white outline-none focus:border-blue-500"
                                    placeholder="Tech Stack (React, Node.js, PostgreSQL)"
                                    value={techStack}
                                    onChange={(e) => setTechStack(e.target.value)}
                                />

                                <button
                                    onClick={handleAddProject}
                                    className="rounded-xl bg-blue-600 py-3 font-semibold transition hover:bg-blue-700"
                                >
                                    Add Project
                                </button>
                            </div>
                        </section>

                        <section>
                            <div className="mb-6 flex items-center justify-between">
                                <h3 className="text-2xl font-bold">
                                    My Projects
                                </h3>
                                <span className="text-slate-400">
                                    {projects.length} Projects
                                </span>
                            </div>

                            {projects.length === 0 ? (
                                <div className="rounded-3xl border border-slate-800 bg-slate-900 p-12 text-center text-slate-400">
                                    No projects added yet.
                                </div>
                            ) : (
                                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                                    {projects.map((project) => (
                                        <motion.div
                                            key={project.id}
                                            whileHover={{ y: -8 }}
                                            className="rounded-3xl border border-slate-800 bg-slate-900 p-6 transition-all hover:border-blue-500"
                                        >
                                            <h4 className="text-xl font-bold">
                                                {project.title}
                                            </h4>

                                            <p className="mt-3 text-slate-400">
                                                {project.description}
                                            </p>

                                            <div className="mt-4 inline-block rounded-full bg-blue-500/10 px-3 py-1 text-sm text-blue-400">
                                                {project.techStack}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
}
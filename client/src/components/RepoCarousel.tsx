import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { FiGithub, FiStar, FiGitBranch } from "react-icons/fi";

interface Repo {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  html_url: string;
}

export default function RepoCarousel({ username }: { username?: string }) {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [emblaRef] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: true,
  });

  useEffect(() => {
    if (!username) return;

    const fetchRepos = async () => {
      try {
        const cleanUsername = username.replace(
          "https://github.com/",
          ""
        );

        const res = await fetch(
          `https://api.github.com/users/${cleanUsername}/repos?sort=updated&per_page=10`
        );

        const data = await res.json();

        if (Array.isArray(data)) {
          setRepos(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchRepos();
  }, [username]);

  if (!username) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 text-slate-400">
        Add your GitHub username in profile to display repositories.
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {repos.map((repo) => (
            <div
              key={repo.id}
              className="min-w-[320px] flex-[0_0_320px] mr-4"
            >
              <div className="h-full rounded-3xl border border-slate-800 bg-slate-900 p-6 transition-all hover:-translate-y-1 hover:border-blue-500">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white truncate">
                    {repo.name}
                  </h3>
                  <FiGithub className="text-slate-400" />
                </div>

                <p className="mt-3 text-slate-400 line-clamp-3 min-h-[72px]">
                  {repo.description || "No description available."}
                </p>

                <div className="mt-4 flex items-center gap-4 text-sm text-slate-400">
                  <span className="flex items-center gap-1">
                    <FiStar />
                    {repo.stargazers_count}
                  </span>

                  <span className="flex items-center gap-1">
                    <FiGitBranch />
                    {repo.forks_count}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="rounded-full bg-blue-500/10 px-3 py-1 text-sm text-blue-400">
                    {repo.language || "Code"}
                  </span>

                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    View →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
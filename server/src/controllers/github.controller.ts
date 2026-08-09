import { Request, Response } from "express";
import axios from "axios";

export const getGithubRepos = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const username = req.params.username;

    const response = await axios.get(
      `https://api.github.com/users/${username}/repos`,
      {
        params: {
          sort: "updated",
          per_page: 6,
        },
      }
    );

    const repos = response.data.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language,
      url: repo.html_url,
    }));

    res.json(repos);
  } catch (error) {
    res.status(404).json({
      message: "GitHub user not found",
    });
  }
};
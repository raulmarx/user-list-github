const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export async function fetchRepos(username: string, page: number, query: string = "") {
    const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=5&page=${page}`, {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
        },
        next: { revalidate: 60 },
      });
    if (!res.ok) throw new Error("Failed to fetch");
    const repos = await res.json();
    if (!Array.isArray(repos)) return [];
    return query.trim()
      ? repos.filter((repo) => repo.name.toLowerCase().includes(query.toLowerCase()))
      : repos;
  }
  
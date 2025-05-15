"use client";
import { useEffect, useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RepoTable } from "@/components/RepoTable";
import { fetchRepos } from "@/lib/github";
import { GithubRepo } from "@/types/github";

export default function SearchRepos({ initialUsername }: { initialUsername: string }) {
  const [username, setUsername] = useState(initialUsername);
  const [query, setQuery] = useState("");
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const search = async (e?: FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    setError(null);
    if (!username.trim()) {
      setError("Please enter a GitHub username.");
      setLoading(false);
      return;
    }

    try {
      const data = await fetchRepos(username, page, query);
      setRepos(data);
    } catch (err:any) {
      console.error(err);
      setRepos([]);
      setError("An error occurred while fetching repositories. verify the token and try again.");

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    search();
  }, [page]);

  return (
    <form onSubmit={search} className="space-y-4">
      <div className="flex gap-2">
      <Input
        placeholder="GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      
      <Input
        placeholder="Search repositories"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        disabled={!username.trim()}
      />
      <Button type="submit" disabled={!username.trim()}>Search</Button>
      </div>
      {error && <p className="text-center text-red-600">{error}</p>}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <RepoTable
            repos={repos}
            onNext={() => repos.length === 5 && setPage((p) => p + 1)}
            onPrev={() => setPage((p) => Math.max(1, p - 1))}
            disablePrev={page === 1}
            disableNext={repos.length < 5}
        />
      )}
    </form>
  );
}
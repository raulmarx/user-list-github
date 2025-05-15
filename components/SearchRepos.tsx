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

  const search = async (e?: FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    try {
      const data = await fetchRepos(username, page, query);
      setRepos(data);
    } catch (err) {
      console.error(err);
      setRepos([]);
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
        />
        <Button type="submit">Search</Button>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <RepoTable repos={repos} onNext={() => setPage(p => p + 1)} onPrev={() => setPage(p => Math.max(1, p - 1))} />
      )}
    </form>
  );
}
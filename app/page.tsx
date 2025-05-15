import SearchRepos from "@/components/SearchRepos";

export default function Home({ searchParams }: { searchParams: { username?: string } }) {
  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">GitHub Repository Explorer</h1>
      <SearchRepos initialUsername={searchParams.username || "raulmarx"} />
    </main>
  );
}
// app/page.tsx
import SearchRepos from "@/components/SearchRepos";
import { Suspense } from "react";

interface Props {
  searchParams?: { [key: string]: string | undefined };
}

export default async function Home({ searchParams }: Props) {
  const username = searchParams?.username || "raulmarx";

  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">GitHub Repository Explorer</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <SearchRepos initialUsername={username} />
      </Suspense>
    </main>
  );
}

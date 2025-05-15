import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { GithubRepo } from "@/types/github";
import { Button } from "@/components/ui/button";

interface Props {
  repos: GithubRepo[];
  onNext: () => void;
  onPrev: () => void;
}

export function RepoTable({ repos, onNext, onPrev }: Props) {
  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Stars</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {repos.map((repo) => (
            <TableRow key={repo.id}>
              <TableCell>
                <a href={repo.html_url} className="text-blue-600 hover:underline" target="_blank">
                  {repo.name}
                </a>
              </TableCell>
              <TableCell>{repo.description ?? "—"}</TableCell>
              <TableCell>{repo.stargazers_count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev}>Previous</Button>
        <Button variant="outline" onClick={onNext}>Next</Button>
      </div>
    </div>
  );
}
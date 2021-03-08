import useSWR from "swr";
import { User } from "../global";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Users() {
  const { data: users, error } = useSWR<User[]>("/api/users", fetcher);

  if (error) return <div>failed to load</div>;
  if (!users) return <div>loading...</div>;

  return (
    <div>
      {users.map((user) => (
        <div key={user.name}>hello {user.name}!</div>
      ))}
    </div>
  );
}

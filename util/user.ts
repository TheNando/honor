const USER_TYPES = ["email", "name"];

export async function findUser(
  query: Record<string, string>
): Promise<boolean> {
  const keys = Object.keys(query);
  if (!keys.length || keys.some((item) => !USER_TYPES.includes(item))) {
    return false;
  }

  const queryString = new URLSearchParams(query);
  const res = await fetch("/api/users?" + queryString);
  const users = await res.json();

  return users.length > 0;
}

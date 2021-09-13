const USER_TYPES = ["email", "name"];

export async function userExists(
  query: Record<string, string>,
): Promise<boolean> {
  const keys = Object.keys(query);
  if (!keys.length || keys.some((item) => !USER_TYPES.includes(item))) {
    return false;
  }

  const queryString = new URLSearchParams(query);

  const response = await fetch("/api/users/check?" + queryString);

  return response.statusText === "OK";
}

import { User } from "./types";

const BASE = "https://jsonplaceholder.typicode.com/users";

// Handle response
async function handleResp(res: Response) {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API Error: ${res.status} - ${text}`);
  }
  return res.json();
}

// GET all users
export async function fetchUsers(): Promise<User[]> {
  const res = await fetch(BASE);
  return handleResp(res);
}

// GET single user
export async function fetchUser(id: string | number): Promise<User> {
  const res = await fetch(`${BASE}/${id}`);
  return handleResp(res);
}

// CREATE user (fake — JSONPlaceholder returns created object but doesn't save)
export async function createUser(user: User): Promise<User> {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return handleResp(res);
}

// UPDATE user (fake)
export async function updateUser(id: string | number, user: User): Promise<User> {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return handleResp(res);
}

// DELETE user (fake)
export async function deleteUser(id: string | number): Promise<{}> {
  const res = await fetch(`${BASE}/${id}`, {
    method: "DELETE",
  });
  return handleResp(res);
}




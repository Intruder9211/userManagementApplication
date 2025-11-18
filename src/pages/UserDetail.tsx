import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { User } from "../types";
import { fetchUser } from "../api";
import Spinner from "../components/Spinner";

export default function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let mounted = true;

    async function load() {
      try {
        const data = await fetchUser(id!);
        if (mounted) setUser(data);
      } catch (err: any) {
        setError(err.message || "Failed to load user");
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) return <Spinner />;
  if (error) return <div className="error">{error}</div>;
  if (!user) return <div>User not found.</div>;

  return (
    <div>
      <h1>{user.name}</h1>

      <p>
        <strong>Username:</strong> {user.username || "N/A"}
      </p>

      <p>
        <strong>Email:</strong> {user.email}
      </p>

      <p>
        <strong>Phone:</strong> {user.phone || "N/A"}
      </p>

      <p>
        <strong>Website:</strong> {user.website || "N/A"}
      </p>

      <div style={{ marginTop: 20 }}>
        <Link to={`/edit/${user.id}`} className="btn">
          Edit
        </Link>
      </div>
    </div>
  );
}


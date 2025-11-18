import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../types";
import { createUser, fetchUser, updateUser } from "../api";
import Spinner from "../components/Spinner";

/**
 * UserForm: Create + Edit User
 */
export default function UserForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [form, setForm] = useState<User>({
    name: "",
    email: "",
    phone: "",
    website: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load existing user (Edit mode)
  useEffect(() => {
    if (!isEdit) return;

    let mounted = true;

    async function load() {
      try {
        setLoading(true);
        const data = await fetchUser(id!);
        if (!mounted) return;

        setForm({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          website: data.website || "",
        });
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
  }, [id, isEdit]);

  // Handle Create or Update
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);

      if (isEdit) {
        await updateUser(id!, form);
        alert("User updated (simulated).");
      } else {
        await createUser(form);
        alert("User created (simulated).");
      }

      navigate("/");
    } catch (err: any) {
      setError(err.message || "Failed to save user");
    } finally {
      setLoading(false);
    }
  }

  // Input handler
  function change(field: keyof User, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  if (loading) return <Spinner />;

  return (
    <div>
      <h1>{isEdit ? "Edit User" : "Create User"}</h1>
      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit} className="form">
        <label>
          Name
          <input
            value={form.name}
            onChange={(e) => change("name", e.target.value)}
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            value={form.email}
            onChange={(e) => change("email", e.target.value)}
            required
          />
        </label>

        <label>
          Phone
          <input
            value={form.phone}
            onChange={(e) => change("phone", e.target.value)}
          />
        </label>

        <label>
          Website
          <input
            value={form.website || ""}
            onChange={(e) => change("website", e.target.value)}
          />
        </label>

        <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
          <button type="submit" className="btn">
            {isEdit ? "Update" : "Create"}
          </button>

          <button type="button" className="btn" onClick={() => navigate(-1)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}


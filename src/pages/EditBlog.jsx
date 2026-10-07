import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BlogForm from "../components/BlogForm";

const API_URL = "http://localhost:3001/blogs";

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`);

        if (!response.ok) {
          throw new Error("Blog not found.");
        }

        const data = await response.json();

        setBlog(data);
      } catch (err) {
        setError("Unable to load this blog.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const updateBlog = async (updatedData) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...blog,
          ...updatedData
        })
      });

      if (!response.ok) {
        throw new Error("Update failed.");
      }

      navigate(`/blog/${id}`);
    } catch (err) {
      alert("Failed to update blog.");
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading blog...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message large">
        {error}
      </div>
    );
  }

  return (
    <div className="form-page">
      <div className="form-container">
        <h1>Edit Blog</h1>

        <BlogForm
          initialData={blog}
          onSubmit={updateBlog}
          buttonText="Update Blog"
        />
      </div>
    </div>
  );
}

export default EditBlog;
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const API_URL = "http://localhost:3001/blogs";

function ViewBlog() {
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

  const deleteBlog = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        throw new Error("Delete failed.");
      }

      navigate("/");
    } catch (err) {
      alert("Failed to delete blog.");
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
    <div className="view-page">
      <article className="single-blog">

        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="single-blog-image"
          />
        )}

        <div className="single-blog-content">

          <h1>{blog.title}</h1>

          <div className="blog-meta">
            <span>By {blog.author}</span>

            <span>
              {new Date(blog.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="blog-content">
            {blog.content.split("\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {blog.video && (
            <div className="video-container">
              <video controls>
                <source src={blog.video} />
                Your browser does not support video playback.
              </video>
            </div>
          )}

          <div className="single-actions">

            <Link
              to={`/edit/${blog.id}`}
              className="btn btn-warning"
            >
              Edit
            </Link>

            <button
              onClick={deleteBlog}
              className="btn btn-danger"
            >
              Delete
            </button>

            <Link
              to="/"
              className="btn btn-secondary"
            >
              Back
            </Link>

          </div>

        </div>
      </article>
    </div>
  );
}

export default ViewBlog;
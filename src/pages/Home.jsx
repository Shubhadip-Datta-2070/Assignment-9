
import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";

const API_URL = "http://localhost:3001/blogs";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch blogs.");
      }

      const data = await response.json();

      setBlogs(data);
    } catch (err) {
      console.error(err);

      setError(
        "Unable to load blogs. Please check whether JSON Server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const deleteBlog = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Delete failed.");
      }

      setBlogs((currentBlogs) =>
        currentBlogs.filter((blog) => blog.id !== id)
      );
    } catch (err) {
      console.error(err);
      alert("Failed to delete the blog.");
    }
  };

  const filteredBlogs = blogs.filter((blog) => {
    const searchText = search.toLowerCase();

    return (
      blog.title.toLowerCase().includes(searchText) ||
      blog.content.toLowerCase().includes(searchText) ||
      blog.author.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="container">
      <section className="hero">
        <h1>Welcome to BlogSpace</h1>

        <p>
          Create, read, edit and manage your blogs.
        </p>
      </section>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search blogs by title, author or content..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading blogs...</p>
        </div>
      )}

      {error && (
        <div className="error-message large">
          <p>{error}</p>

          <button
            onClick={fetchBlogs}
            className="btn btn-primary retry-btn"
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && blogs.length === 0 && (
        <div className="empty-state">
          <h2>No blogs available</h2>

          <p>
            There are currently no blog posts.
            Create your first blog!
          </p>
        </div>
      )}

      {!loading &&
        !error &&
        blogs.length > 0 &&
        filteredBlogs.length === 0 && (
          <div className="empty-state">
            <h2>No matching blogs</h2>

            <p>
              Try searching for something else.
            </p>
          </div>
        )}

      <div className="blog-grid">
        {filteredBlogs.map((blog) => (
          <BlogCard
            key={blog.id}
            blog={blog}
            onDelete={deleteBlog}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;

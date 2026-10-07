import { useNavigate } from "react-router-dom";
import BlogForm from "../components/BlogForm";

const API_URL = "http://localhost:3001/blogs";

function AddBlog() {
  const navigate = useNavigate();

  const createBlog = async (blogData) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...blogData,
          createdAt: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error("Failed to create blog.");
      }

      navigate("/");
    } catch (error) {
      alert("Failed to create blog. Please try again.");
    }
  };

  return (
    <div className="form-page">
      <div className="form-container">
        <h1>Create New Blog</h1>

        <p className="form-description">
          Share your thoughts with the world.
        </p>

        <BlogForm
          onSubmit={createBlog}
          buttonText="Create Blog"
        />
      </div>
    </div>
  );
}

export default AddBlog;
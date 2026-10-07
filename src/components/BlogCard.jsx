import { Link } from "react-router-dom";

function BlogCard({ blog, onDelete }) {
  const preview =
    blog.content.length > 150
      ? blog.content.substring(0, 150) + "..."
      : blog.content;

  return (
    <article className="blog-card">
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="blog-image"
        />
      )}

      <div className="blog-card-content">
        <h2>{blog.title}</h2>

        <p className="author">
          By {blog.author || "Anonymous"}
        </p>

        <p>{preview}</p>

        <div className="card-actions">
          <Link
            to={`/blog/${blog.id}`}
            className="btn btn-primary"
          >
            View
          </Link>

          <Link
            to={`/edit/${blog.id}`}
            className="btn btn-warning"
          >
            Edit
          </Link>

          <button
            onClick={() => onDelete(blog.id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}

export default BlogCard;
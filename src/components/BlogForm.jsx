import { useState } from "react";

function BlogForm({ initialData, onSubmit, buttonText }) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [author, setAuthor] = useState(initialData?.author || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [image, setImage] = useState(initialData?.image || "");
  const [video, setVideo] = useState(initialData?.video || "");
  const [error, setError] = useState("");

  const wordCount = content.trim()
    ? content.trim().split(/\s+/).length
    : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Please enter a blog title.");
      return;
    }

    if (!content.trim()) {
      setError("Please enter blog content.");
      return;
    }

    if (wordCount > 1000) {
      setError("Blog content cannot exceed 1000 words.");
      return;
    }

    setError("");

    await onSubmit({
      title: title.trim(),
      author: author.trim() || "Anonymous",
      content: content.trim(),
      image: image.trim(),
      video: video.trim()
    });
  };

  return (
    <form className="blog-form" onSubmit={handleSubmit}>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="form-group">
        <label>Blog Title</label>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter blog title"
        />
      </div>

      <div className="form-group">
        <label>Author</label>

        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Enter author name"
        />
      </div>

      <div className="form-group">
        <label>Content</label>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your blog here..."
          rows="12"
        />

        <div
          className={`word-counter ${
            wordCount > 1000 ? "limit-exceeded" : ""
          }`}
        >
          {wordCount} / 1000 words
        </div>
      </div>

      <div className="form-group">
        <label>Image URL</label>

        <input
          type="url"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="form-group">
        <label>Video URL</label>

        <input
          type="url"
          value={video}
          onChange={(e) => setVideo(e.target.value)}
          placeholder="https://example.com/video.mp4"
        />
      </div>

      <button type="submit" className="btn btn-primary submit-btn">
        {buttonText}
      </button>
    </form>
  );
}

export default BlogForm;
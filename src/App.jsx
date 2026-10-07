import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import AddBlog from "./pages/AddBlog";
import EditBlog from "./pages/EditBlog";
import ViewBlog from "./pages/ViewBlog";

import "./App.css";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <main>
        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/add" element={<AddBlog />} />

          <Route
            path="/blog/:id"
            element={<ViewBlog />}
          />

          <Route
            path="/edit/:id"
            element={<EditBlog />}
          />

        </Routes>
      </main>

      <footer>
        <p>© 2026 BlogSpace. Built with React.</p>
      </footer>

    </BrowserRouter>
  );
}

export default App;
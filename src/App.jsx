import "./App.css";

import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Manager from "./components/manager";
import Register from "./components/register";
import Login from "./components/login";

function App() {
  const [user, setUser] = useState(null);

  // On page load (or refresh), check if the user is already logged in
  // by calling the profile endpoint. The cookie is sent automatically.
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/profile", {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
        // If 401, user is not logged in — that's fine, user stays null
      } catch (error) {
        // Network error — user stays null
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} setUser={setUser} />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Manager />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
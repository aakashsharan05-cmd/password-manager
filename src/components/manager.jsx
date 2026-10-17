import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [visiblePasswords, setVisiblePasswords] = useState({});

  const [form, setForm] = useState({
    title: "",
    url: "",
    username: "",
    password: "",
  });

  const [passwordArray, setPasswordArray] = useState([]);

  // =========================
  // GET PASSWORDS
  // =========================
  const getpassword = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/auth/get",
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await res.json();

      console.log("GET response:", data);

      if (!res.ok) {
        throw new Error(data.message);
      }

      setPasswordArray(data.passwords);
    } catch (error) {
      toast.error(error.message);
    }
  };
  // Fetch passwords when Manager loads
  useEffect(() => {
    getpassword();
  }, []);

  // =========================
  // SHOW / HIDE PASSWORD (form input)
  // =========================
  const showPass = () => {
    setShowPassword((prev) => !prev);
  };

  // =========================
  // TOGGLE PASSWORD VISIBILITY (table rows)
  // =========================
  const toggleRowPassword = (id) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // =========================
  // SEARCH FILTER
  // =========================
  const filteredPasswords = passwordArray.filter((item) => {
    const query = search.toLowerCase();

    return (
      item.title.toLowerCase().includes(query) ||
      item.url.toLowerCase().includes(query) ||
      item.username.toLowerCase().includes(query)
    );
  });

  // =========================
  // HANDLE INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // CREATE PASSWORD
  // =========================
  const savePassword = async () => {
    if (
      form.title.trim() === "" ||
      form.url.trim() === "" ||
      form.username.trim() === "" ||
      form.password.trim() === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:5000/api/auth/create",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      await getpassword();

      setForm({
        title: "",
        url: "",
        username: "",
        password: "",
      });

      toast.success("Password Saved!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // =========================
  // LOAD PASSWORD FOR EDIT
  // =========================
  const editPassword = (item) => {
    setEditingId(item._id);

    setForm({
      title: item.title,
      url: item.url,
      username: item.username,
      password: item.password,
    });

    toast.success("Password Loaded For Editing!");
  };

  // =========================
  // UPDATE PASSWORD
  // =========================
  const updatePassword = async () => {
    if (
      form.title.trim() === "" ||
      form.url.trim() === "" ||
      form.username.trim() === "" ||
      form.password.trim() === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    if (!editingId) {
      toast.error("No password selected for editing");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/auth/update/${editingId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      setEditingId(null);

      setForm({
        title: "",
        url: "",
        username: "",
        password: "",
      });

      await getpassword();

      toast.success("Password Updated!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // =========================
  // DELETE PASSWORD
  // =========================
  const deletePassword = async (id) => {
    const confirmDelete = window.confirm(
      "Do you really want to delete this password?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/auth/delete/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      await getpassword();

      toast.success("Password Deleted!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // =========================
  // COPY TEXT
  // =========================
  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);

      toast.success("Copied to clipboard!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } catch (error) {
      toast.error("Failed to copy");
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {/* Background */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div>

      <div className="mycontainer py-8">

        {/* Heading */}
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-500">OP/&gt;</span>
        </h1>

        <p className="text-green-900 text-lg text-center mb-8">
          Your own Password Manager
        </p>

        {/* =========================
            ADD PASSWORD FORM (Card)
        ========================= */}
        <div className="bg-white/80 border border-green-200 rounded-2xl shadow-md p-6 mb-10">

          <h2 className="font-bold text-xl text-gray-800 mb-4">
            {editingId ? "✏️ Edit Password" : "➕ Add New Password"}
          </h2>

          <div className="flex flex-col text-black gap-4">

            {/* Title */}
            <input
              placeholder="Enter Title"
              className="rounded-xl border border-green-500 w-full px-4 py-2.5
                         focus:outline-none focus:ring-2 focus:ring-green-400"
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
            />

            {/* URL */}
            <input
              placeholder="Enter website URL"
              className="rounded-xl border border-green-500 w-full px-4 py-2.5
                         focus:outline-none focus:ring-2 focus:ring-green-400"
              type="text"
              name="url"
              value={form.url}
              onChange={handleChange}
            />

            <div className="flex flex-col sm:flex-row w-full gap-4">

              {/* Username */}
              <input
                placeholder="Enter Username"
                className="rounded-xl border border-green-500 w-full px-4 py-2.5
                           focus:outline-none focus:ring-2 focus:ring-green-400"
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
              />

              {/* Password */}
              <div className="relative w-full">
                <input
                  placeholder="Enter Password"
                  className="rounded-xl border border-green-500 w-full px-4 py-2.5 pr-12
                             focus:outline-none focus:ring-2 focus:ring-green-400"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                />

                <span
                  onClick={showPass}
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-700"
                >
                  {showPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </span>
              </div>
            </div>

            {/* Add / Update Button */}
            <div className="flex items-center gap-4 mt-2">
              <button
                onClick={editingId ? updatePassword : savePassword}
                className="flex justify-center items-center gap-2 bg-green-400 hover:bg-green-300
                           rounded-full px-8 py-2 border border-green-900 font-semibold transition"
              >
                <lord-icon
                  src="https://cdn.lordicon.com/jgnvfzqg.json"
                  trigger="hover"
                  style={{
                    width: "28px",
                    height: "28px",
                  }}
                ></lord-icon>

                {editingId ? "Update Password" : "Add Password"}
              </button>

              {/* Cancel Edit */}
              {editingId && (
                <button
                  onClick={() => {
                    setEditingId(null);
                    setForm({
                      title: "",
                      url: "",
                      username: "",
                      password: "",
                    });
                  }}
                  className="text-red-500 hover:underline font-medium"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </div>
        </div>

        {/* =========================
            SAVED PASSWORDS SECTION
        ========================= */}
        <div className="passwords">

          <h2 className="font-bold text-2xl mb-4">
            Your Passwords
          </h2>

          {/* Search Bar — inside the passwords section */}
          <input
            type="text"
            placeholder="Search by title, website or username..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full mb-6 rounded-xl border border-green-500
               bg-white/70 px-4 py-3
               focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          {passwordArray.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No passwords saved yet.
            </div>
          ) : filteredPasswords.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No passwords match your search.
            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="table-auto w-full rounded-md overflow-hidden">

                {/* Table Header */}
                <thead className="bg-green-500 text-white">
                  <tr>
                    <th className="py-2">Title</th>
                    <th className="py-2">Website</th>
                    <th className="py-2">Username</th>
                    <th className="py-2">Password</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>

                {/* Table Body — uses filteredPasswords */}
                <tbody>
                  {filteredPasswords.map((item) => {
                    return (
                      <tr
                        key={item._id}
                        className="border-b border-green-200"
                      >

                        {/* ================= TITLE ================= */}
                        <td className="py-2 text-center">
                          {item.title}
                        </td>

                        {/* ================= URL ================= */}
                        <td className="py-2 text-center">
                          <div className="flex justify-center items-center gap-2">

                            <a
                              href={
                                item.url.startsWith("http")
                                  ? item.url
                                  : `https://${item.url}`
                              }
                              target="_blank"
                              rel="noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              {item.url}
                            </a>

                            <span
                              onClick={() => copyText(item.url)}
                              className="cursor-pointer"
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                trigger="hover"
                                style={{
                                  width: "22px",
                                  height: "22px",
                                  cursor: "pointer",
                                }}
                              ></lord-icon>
                            </span>

                          </div>
                        </td>

                        {/* ================= USERNAME ================= */}
                        <td className="py-2 text-center">
                          <div className="flex justify-center items-center gap-2">

                            {item.username}

                            <span
                              onClick={() => copyText(item.username)}
                              className="cursor-pointer"
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                trigger="hover"
                                style={{
                                  width: "22px",
                                  height: "22px",
                                  cursor: "pointer",
                                }}
                              ></lord-icon>
                            </span>

                          </div>
                        </td>

                        {/* ================= PASSWORD (with toggle) ================= */}
                        <td className="py-2 text-center">
                          <div className="flex justify-center items-center gap-2">

                            <span className="font-mono">
                              {visiblePasswords[item._id]
                                ? item.password
                                : "••••••••"}
                            </span>

                            <span
                              onClick={() => toggleRowPassword(item._id)}
                              className="cursor-pointer text-gray-600 hover:text-gray-800"
                            >
                              {visiblePasswords[item._id] ? (
                                <FaEyeSlash size={16} />
                              ) : (
                                <FaEye size={16} />
                              )}
                            </span>

                            <span
                              onClick={() => copyText(item.password)}
                              className="cursor-pointer"
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                trigger="hover"
                                style={{
                                  width: "22px",
                                  height: "22px",
                                  cursor: "pointer",
                                }}
                              ></lord-icon>
                            </span>

                          </div>
                        </td>

                        {/* ================= ACTIONS ================= */}
                        <td className="py-2">
                          <div className="flex justify-center gap-3">

                            {/* Edit */}
                            <span
                              onClick={() => editPassword(item)}
                              className="cursor-pointer"
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                trigger="hover"
                                style={{
                                  width: "22px",
                                  height: "22px",
                                  cursor: "pointer",
                                }}
                              ></lord-icon>
                            </span>

                            {/* Delete */}
                            <span
                              onClick={() => deletePassword(item._id)}
                              className="cursor-pointer"
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/skkahier.json"
                                trigger="hover"
                                style={{
                                  width: "22px",
                                  height: "22px",
                                  cursor: "pointer",
                                }}
                              ></lord-icon>
                            </span>

                          </div>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>

              </table>

            </div>
          )}
        </div>

      </div>
    </>
  );
};

export default Manager;
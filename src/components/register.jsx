import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Register = () => {
      const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      form.username.trim() === "" ||
      form.email.trim() === "" ||
      form.password.trim() === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:3000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

   if (res.ok) {
    alert("Registration Successful");
    navigate("/");


        setForm({
          username: "",
          email: "",
          password: "",
        });
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

        <h1 className="text-3xl font-bold text-center mb-2">
          Create Account
        </h1>

        <p className="text-gray-500 text-center mb-8">
          Register to manage your passwords securely.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-green-500 focus:outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-green-500 focus:outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-green-500 focus:outline-none"
          />

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 transition text-white font-semibold py-3 rounded-xl"
          >
            Register
          </button>

        </form>

        <p className="text-center text-gray-500 mt-6">
          Already have an account?{" "}
         <Link
  to="/login"
  className="text-green-600 font-semibold hover:underline"
>
  Login
</Link>
        </p>

      </div>
    </div>
  );
};

export default Register;
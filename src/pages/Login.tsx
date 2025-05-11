import { useState } from "react";

type FormData = {
  name: string;
  email: string;
  password: string;
  phone: string;
};

type Errors = {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
};

const Login = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [isLogin, setIsLogin] = useState(true); // true = login, false = signup
  const [error, setError] = useState<Errors>({});

  const validate = (): Errors => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const newErrors: Errors = {};

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!regex.test(formData.email)) newErrors.email = "Invalid email";

    if (!formData.password.trim())
      newErrors.password = "Password is required";

    if (!isLogin) {
      if (!formData.name.trim()) newErrors.name = "Name is required";
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    }

    return newErrors;
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
    } else {
      setError({});
      if (isLogin) {
        console.log("Logging in with", formData.email, formData.password);
      } else {
        console.log("Signing up with", formData);
      }
      setFormData({ name: "", email: "", password: "", phone: "" });
    }
  };

  return (
    <div className="flex flex-col justify-center text-sm md:text-xl font-thin items-center">
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col shadow-2xl p-4 rounded-2xl w-full md:w-[400px] bg-white"
      >
        <div className="my-4 text-center">
          <h1 className="text-gray-700 font-bold text-lg">
            {isLogin ? "Login" : "Sign Up"} to Basic-Activity-Booking-App
          </h1>
          <p className="text-gray-600 text-sm">MERN Stack Application</p>
        </div>

        {!isLogin && (
          <div className="flex flex-col">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Enter your name"
              className="border-2 border-gray-300 rounded-md p-2 m-2"
            />
            {error.name && <p className="text-red-500">{error.name}</p>}
          </div>
        )}

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="Enter your email"
            className="border-2 border-gray-300 rounded-md p-2 m-2"
          />
          {error.email && <p className="text-red-500">{error.email}</p>}
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            placeholder="Enter your password"
            className="border-2 border-gray-300 rounded-md p-2 m-2"
          />
          {error.password && <p className="text-red-500">{error.password}</p>}
        </div>

        {!isLogin && (
          <div className="flex flex-col">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder="Enter your phone"
              className="border-2 border-gray-300 rounded-md p-2 m-2"
            />
            {error.phone && <p className="text-red-500">{error.phone}</p>}
          </div>
        )}

        <button className="bg-blue-600 px-6 rounded-3xl py-2 my-4 text-white">
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <p
          onClick={() => setIsLogin(!isLogin)}
          className="text-sm text-blue-600 cursor-pointer text-center"
        >
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </p>
      </form>
    </div>
  );
};

export default Login;

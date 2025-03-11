import { useEffect, useState } from "react";
import Link from "next/link";
import { auth, registerUser, loginUser, logoutUser } from "../lib/firebase"; // Import Firebase functions

export default function Home() {
  const [user, setUser] = useState(null); // State to track the authenticated user
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [name, setName] = useState(""); // State for name input (for registration)
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and registration

  // Handle user registration
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser(email, password, name); // Use the registerUser function
      alert("Registration successful!");
    } catch (error) {
      console.error("Error registering:", error.message);
      alert(`Registration failed: ${error.message}`);
    }
  };

  // Handle user login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginUser(email, password); // Use the loginUser function
      alert("Login successful!");
    } catch (error) {
      console.error("Error logging in:", error.message);
      alert(`Login failed: ${error.message}`);
    }
  };

  // Handle user sign-out
  const handleSignOut = async () => {
    try {
      await logoutUser(); // Use the logoutUser function
      alert("Signed out successfully!");
    } catch (error) {
      console.error("Error signing out:", error.message);
      alert(`Sign out failed: ${error.message}`);
    }
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user); // Set the user state if logged in
      } else {
        setUser(null); // Clear the user state if logged out
      }
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome to WishWhiz!</h1>

      {!user ? (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">
            {isLogin ? "Login" : "Register"}
          </h2>
          <form
            onSubmit={isLogin ? handleLogin : handleRegister}
            className="mt-2"
          >
            {!isLogin && (
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded mb-2"
                required
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded mb-2"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded mb-2"
              required
            />
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded"
            >
              {isLogin ? "Login" : "Register"}
            </button>
          </form>
          <p className="mt-2 text-center">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-500 underline"
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </p>
        </div>
      ) : (
        <div className="mt-4">
          <p className="mb-2">Welcome, {user.displayName || user.email}!</p>
          <Link
            href="/dashboard"
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Go to Dashboard
          </Link>
          <button
            onClick={handleSignOut}
            className="ml-2 px-4 py-2 bg-red-500 text-white rounded"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

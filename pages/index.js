import { useEffect, useState } from "react";
import Link from "next/link";
import { auth, registerUser, loginUser, logoutUser } from "../lib/firebase";

export default function Home() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser(email, password, name);
      alert("Registration successful! 🎉");
    } catch (error) {
      console.error("Error registering:", error.message);
      alert(`Registration failed: ${error.message}`);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      alert("Login successful! 🎉");
    } catch (error) {
      console.error("Error logging in:", error.message);
      alert(`Login failed: ${error.message}`);
    }
  };

  const handleSignOut = async () => {
    try {
      await logoutUser();
      alert("Signed out successfully! 👋");
    } catch (error) {
      console.error("Error signing out:", error.message);
      alert(`Sign out failed: ${error.message}`);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-purple-700 mb-4">🎉 Wish-App</h1>
        <p className="text-gray-600 mb-6">
          Never miss a birthday again! Celebrate your loved ones with
          personalized wishes.
        </p>

        {!user ? (
          <div>
            <h2 className="text-2xl font-semibold text-purple-700 mb-4">
              {isLogin ? "Welcome Back!" : "Join Us!"}
            </h2>
            <form
              onSubmit={isLogin ? handleLogin : handleRegister}
              className="space-y-4"
            >
              {!isLogin && (
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              )}
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <button
                type="submit"
                className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition duration-300"
              >
                {isLogin ? "Login" : "Register"}
              </button>
            </form>
            <p className="mt-4 text-gray-600">
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-purple-600 font-semibold hover:underline"
              >
                {isLogin ? "Register" : "Login"}
              </button>
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-xl text-purple-700">
              Welcome,{" "}
              <span className="font-bold">
                {user.displayName || user.email}
              </span>
              !
            </p>
            <Link
              href="/dashboard"
              className="inline-block w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition duration-300 text-center"
            >
              Go to Dashboard
            </Link>
            <button
              onClick={handleSignOut}
              className="w-full bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition duration-300"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

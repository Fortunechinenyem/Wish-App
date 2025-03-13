import { useEffect, useState } from "react";
import Link from "next/link";
import { auth, registerUser, loginUser, logoutUser } from "../lib/firebase";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Footer from "@/app/component/Footer";

export default function Home() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await registerUser(email, password, name);
      toast.success("Registration successful! 🎉");
    } catch (error) {
      console.error("Error registering:", error.message);
      toast.error(`Registration failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await loginUser(email, password);
      toast.success("Login successful! 🎉");
    } catch (error) {
      console.error("Error logging in:", error.message);
      toast.error(`Login failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await logoutUser();
      toast.success("Signed out successfully! 👋");
    } catch (error) {
      console.error("Error signing out:", error.message);
      toast.error(`Sign out failed: ${error.message}`);
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
    <>
      <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center"
        >
          <Image
            src="/logo.png"
            alt="logo"
            className="mx-auto mb-5"
            height={150}
            width={150}
            priority
          />
          <p className="text-gray-600 mb-6">
            Never miss a birthday again! Celebrate your loved ones with
            personalized wishes.
          </p>

          {!user ? (
            <div>
              <h2 className="text-2xl font-semibold text-[#7B1FA2] mb-4">
                {isLogin ? "Welcome Back!" : "Join Us!"}
              </h2>
              <form
                onSubmit={isLogin ? handleLogin : handleRegister}
                className="space-y-4"
              >
                {!isLogin && (
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-3 top-3 text-gray-400 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-purple-600 bg-white px-1"
                    >
                      Your Name
                    </label>
                  </div>
                )}
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="email"
                    className=" left-3 top-3 text-gray-400 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-purple-600 bg-white px-1"
                  >
                    Email
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="password"
                    className=" left-3 top-3 text-gray-400 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-purple-600 bg-white px-1"
                  >
                    Password
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition duration-300 shadow-lg hover:shadow-purple-500/50"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    </div>
                  ) : isLogin ? (
                    "Login"
                  ) : (
                    "Register"
                  )}
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
              <p className="text-xl text-[#7B1FA2]">
                Welcome,{" "}
                <span className="font-bold">
                  {user.displayName || user.email}
                </span>
                !
              </p>
              <Link
                href="/dashboard"
                className="inline-block w-full bg-[#7B1FA2] text-white p-3 rounded-lg hover:bg-green-600 transition duration-300 text-center"
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
        </motion.div>
      </div>
      <Footer />
    </>
  );
}

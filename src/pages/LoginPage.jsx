import React, { useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "../lib/api";
import { useNavigate, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const textArray = [
  "Welcome to Super AI.",
  "I'm your AI assistant.",
  "Let's get started, Login with Google!",
];

const LoginPage = () => {
  const navigate = useNavigate();

  if (localStorage.getItem("user")) {
    return <Navigate to="/dashboard" />;
  }

  const responseGoogle = async (authResult) => {
    try {
      if (authResult.code) {
        const result = await googleAuth(authResult.code);
        const { email, name, image } = result.data.user;
        const token = result.data.token;
        const userData = { email, name, image, token };
        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/get-started");
      }
    } catch (error) {
      console.error("Error while logging in", error);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTextComplete, setIsTextComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < textArray.length - 1) {
      const timer = setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, 2000); // Delay before showing the next text
      return () => clearTimeout(timer);
    } else {
      // Set text completion flag after the last text
      const finalDelay = setTimeout(() => {
        setIsTextComplete(true);
      }, 2000); // Additional delay for the last text
      return () => clearTimeout(finalDelay);
    }
  }, [currentIndex]);

  return (
    <main className="min-h-screen w-full bg-gray-50 relative overflow-hidden flex flex-col items-center justify-center">
      {/* Logo */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="w-28 h-28 rounded-full bg-white flex items-center justify-center shadow-xl"
      >
        <svg viewBox="0 0 100 20" className="w-16 h-16">
          <motion.path
            d="M0,10 C20,20 40,0 60,10 C80,20 100,0 120,10"
            stroke="url(#gradient)"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF6B6B" />
              <stop offset="50%" stopColor="#9B6BFF" />
              <stop offset="100%" stopColor="#4ECDC4" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Animated text */}
      <div className="h-24 mt-10 mb-10 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.h1
            key={currentIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-light absolute text-center"
            style={{
              lineHeight: "1.2",
              background: "linear-gradient(90deg, #B85B8F 0%, #9B6BFF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {textArray[currentIndex]}
          </motion.h1>
        </AnimatePresence>
      </div>

      {/* Google Login Button */}
      {isTextComplete && (
        <motion.button
          onClick={() => googleLogin()}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="px-6 py-3 bg-black text-white font-medium rounded-lg shadow-lg transition"
        >
          Login with Google
        </motion.button>
      )}

      {/* Animated wave */}
      <motion.div
        className="absolute bottom-0 w-full h-64"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <svg className="w-full h-full" viewBox="0 0 1200 200" preserveAspectRatio="none">
          <motion.path
            d="M0,100 C300,150 450,50 600,100 C750,150 900,50 1200,100 L1200,200 L0,200 Z"
            fill="url(#wave-gradient)"
            initial={{ d: "M0,100 C300,150 450,50 600,100 C750,150 900,50 1200,100 L1200,200 L0,200 Z" }}
            animate={{
              d: [
                "M0,100 C300,150 450,50 600,100 C750,150 900,50 1200,100 L1200,200 L0,200 Z",
                "M0,100 C300,50 450,150 600,100 C750,50 900,150 1200,100 L1200,200 L0,200 Z",
                "M0,100 C300,150 450,50 600,100 C750,150 900,50 1200,100 L1200,200 L0,200 Z",
              ],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(184, 91, 143, 0.2)" />
              <stop offset="50%" stopColor="rgba(155, 107, 255, 0.2)" />
              <stop offset="100%" stopColor="rgba(184, 91, 143, 0.2)" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </main>
  );
};

export default LoginPage;
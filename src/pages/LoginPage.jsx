import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "../lib/api";
import { useNavigate, Navigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  if (localStorage.getItem("user")) {
    return <Navigate to="/" />;
  }

  const responseGoogle = async (authResult) => {
    try {
      if (authResult.code) {
        const result = await googleAuth(authResult.code);
        const { email, name, image } = result.data.user;
        const token = result.data.token;
        const userData = { email, name, image, token };
        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/");
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Welcome to DuckDB Analytics
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Log in with your Google account to access the analytics dashboard.
        </p>
        <button
          onClick={googleLogin}
          className="bg-gray-900 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          <span className="font-semibold text-lg">Login with Google</span>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
import React from "react";
import { useNavigate } from "react-router-dom";

const GettingStarted = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Optimize Location",
      description:
        "This means that people are going to be able to find you easily and find the information they need quickly.",
      number: 1,
    },
    {
      title: "Connect Sources",
      description:
        "The more platforms you have synced, the better. The average is about 2 platforms for businesses in your category.",
      number: 2,
    },
    {
      title: "Publish Data",
      description:
        "Against competitors in your industry, you're tracking in the 87th percentile. Let's aim even higher.",
      number: 3,
    },
  ];

  return (
    <main
      className="min-h-screen bg-white flex flex-col items-center justify-center px-6 my-20"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Header Section */}
      <header className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Great, we have your recommendations!
        </h1>
        <p className="text-lg text-gray-600">
          Here's what we're going to do:
        </p>
      </header>

      {/* Cards Section */}
      <div className="w-full max-w-5xl bg-gray-50 p-8 rounded-3xl shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Card Number */}
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold text-lg mb-4">
                {card.number}
              </div>

              {/* Card Content */}
              <h2 className="text-xl font-medium text-gray-800 mb-2">
                {card.title}
              </h2>
              <p className="text-gray-600">{card.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Button Section */}
      <div className="mt-10">
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-black text-white px-6 py-3 rounded-full text-lg font-medium shadow-md transition-colors duration-300"
        >
          Go to Dashboard
        </button>
      </div>
    </main>
  );
};

export default GettingStarted;
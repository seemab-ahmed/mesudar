import React, { useState, useEffect } from "react";

const PASSWORD = "dev123"; // Replace with your desired password

const PasswordGate = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");

//   useEffect(() => {
//     const isAuthed = localStorage.getItem("authenticated");
//     if (isAuthed === "true") {
//       setIsAuthenticated(true);
//     }
//   }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === PASSWORD) {
    //   localStorage.setItem("authenticated", "true");
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-bold mb-4">Enter Password</h2>
          <input
            type="password"
            placeholder="Password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }

  return children;
};

export default PasswordGate;

import React, { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import CodeReviewer from "./components/CodeReviewer"; 

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isRegistering, setIsRegistering] = useState(false);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  // If no token, show Login or Register
  if (!token) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        {isRegistering ? (
          <div className="w-full max-w-md">
            <Register onToggle={() => setIsRegistering(false)} />
            <p className="text-center text-gray-400 mt-4">
              Already have an account?{" "}
              <button 
                onClick={() => setIsRegistering(false)} 
                className="text-blue-500 hover:underline"
              >
                Login here
              </button>
            </p>
          </div>
        ) : (
          <div className="w-full max-w-md">
            <Login onLogin={(newToken) => setToken(newToken)} />
            <p className="text-center text-gray-400 mt-4">
              Don't have an account?{" "}
              <button 
                onClick={() => setIsRegistering(true)} 
                className="text-blue-500 hover:underline"
              >
                Sign up here
              </button>
            </p>
          </div>
        )}
      </div>
    );
  }

  // If token exists, show the main Audit dashboard
  return <CodeReviewer token={token} onLogout={handleLogout} />;
}

export default App;
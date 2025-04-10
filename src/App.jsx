import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { auth } from "./firebase"; // Firebase auth
import { onAuthStateChanged } from "firebase/auth"; // Firebase listener
import Login from "./Login";
import DocumentManagement from "./components/Documentmanagement";
import Register from "./Register";
import Home from "./Home";

export default function App() {
  const [user, setUser] = useState(null);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (loggedInUser) => {
      setUser(loggedInUser);
    });
    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<DocumentManagement user={user} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

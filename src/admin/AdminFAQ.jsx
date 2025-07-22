// src/components/admin/AdminFAQ.jsx
import React, { useState } from "react";
import axios from "axios";
// import DashboardLayout from "./Utils/DashboardLayout"; // if you're using a layout with sidebar
import "./faq.css";

const AdminFAQ = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setAnswer("");

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL || "http://localhost:5000"}/api/ask-ai`,
        { question },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setAnswer(data.answer);
    } catch (err) {
      setAnswer("Failed to get an answer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // <DashboardLayout>
      <div className="faq-container">
        <h2 className="faq-heading">🤖 Ask AI - FAQ Helper</h2>
        <form onSubmit={handleAsk} className="faq-form">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question about the platform..."
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Thinking..." : "Ask AI"}
          </button>
        </form>

        {answer && (
          <div className="faq-answer">
            <h4>Answer:</h4>
            <p>{answer}</p>
          </div>
        )}
      </div>
    // </DashboardLayout>
  );
};

export default AdminFAQ;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../../main";
import DashboardLayout from "../Utils/DashboardLayout"; // ✅ Make sure this path is correct
import "./adminQuizResults.css";

const AdminQuizResults = () => {
  const { lectureId } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const { data } = await axios.get(
          `${server}/api/admin/quiz-results/${lectureId}`,
          {
            headers: { token: localStorage.getItem("token") },
          }
        );
        setResults(data.results || []);
      } catch (err) {
        console.error("❌ Error fetching quiz results", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [lectureId]);

  return (
    <DashboardLayout>
      <div className="admin-quiz-results">
        <h2>📊 Quiz Results</h2>
        {loading ? (
          <p className="loading">Loading results...</p>
        ) : results.length > 0 ? (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>👤 Name</th>
                  <th>📧 Email</th>
                  <th>📈 Score</th>
                  <th>✅ Status</th>
                </tr>
              </thead>
              <tbody>
                {results.map((res, i) => (
                  <tr key={i}>
                    <td>{res.name}</td>
                    <td>{res.email}</td>
                    <td>{res.score}</td>
                    <td className={res.passed ? "pass" : "fail"}>
                      {res.passed ? "Passed ✅" : "Failed ❌"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="no-results">No quiz attempts yet.</p>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AdminQuizResults;

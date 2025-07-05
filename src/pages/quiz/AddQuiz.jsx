import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { server } from "../../main";

const AddQuiz = () => {
  const { id } = useParams(); // lectureId
  const [quiz, setQuiz] = useState([{ question: "", options: ["", "", "", ""], correctAnswer: 0 }]);
  const [existingQuiz, setExistingQuiz] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null); // For update

  useEffect(() => {
    fetchExistingQuiz();
  }, []);

  const fetchExistingQuiz = async () => {
    try {
      const { data } = await axios.get(`${server}/api/quiz/${id}`, {
        headers: { token: localStorage.getItem("token") },
      });
      setExistingQuiz(data.quiz || []);
    } catch (err) {
      toast.error("Failed to load quiz");
    }
  };

  const handleQuizChange = (field, value, i, j = null) => {
    const updated = [...quiz];
    if (field === "question") updated[i].question = value;
    else if (field === "correctAnswer") updated[i].correctAnswer = Number(value);
    else if (j !== null) updated[i].options[j] = value;
    setQuiz(updated);
  };

const submitQuiz = async () => {
  const isValid = quiz.some((q) =>
    q.question.trim() &&
    q.options.every(opt => opt.trim()) &&
    new Set(q.options.map(opt => opt.trim())).size === q.options.length // unique check
  );

  if (!isValid) return toast.error("Each question must have non-empty & unique options.");

  try {
    await axios.post(`${server}/api/quiz/create/${id}`, { quiz }, {
      headers: { token: localStorage.getItem("token") },
    });
    toast.success("Quiz saved");
    setQuiz([{ question: "", options: ["", "", "", ""], correctAnswer: 0 }]);
    fetchExistingQuiz();
  } catch (err) {
    toast.error("Save failed");
  }
};


  const deleteSingleQuiz = async (index) => {
  const confirm = window.confirm("Are you sure you want to delete this question?");
  if (!confirm) return;

  const updated = [...existingQuiz];
  updated.splice(index, 1);
  try {
    await axios.put(`${server}/api/quiz/update/${id}`, { quiz: updated }, {
      headers: { token: localStorage.getItem("token") },
    });
    toast.success("Deleted");
    fetchExistingQuiz();
  } catch {
    toast.error("Delete failed");
  }
};


  const updateSingleQuiz = async (index) => {
    const updated = [...existingQuiz];
    const q = updated[index];
    if (!q.question.trim() || q.options.some(opt => !opt.trim())) {
      return toast.error("Invalid question.");
    }
    try {
      await axios.put(`${server}/api/quiz/update/${id}`, { quiz: updated }, {
        headers: { token: localStorage.getItem("token") },
      });
      toast.success("Updated");
      setEditingIndex(null);
      fetchExistingQuiz();
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <div>
      <h2>Add Quiz</h2>
      {quiz.map((q, i) => (
        <div key={i}>
          <input value={q.question} onChange={(e) => handleQuizChange("question", e.target.value, i)} placeholder="Question" />
          {q.options.map((opt, j) => (
            <input key={j} value={opt} onChange={(e) => handleQuizChange("option", e.target.value, i, j)} placeholder={`Option ${j+1}`} />
          ))}
          <select value={q.correctAnswer} onChange={(e) => handleQuizChange("correctAnswer", e.target.value, i)}>
            {[0, 1, 2, 3].map(opt => <option key={opt} value={opt}>Correct Option: {opt + 1}</option>)}
          </select>
        </div>
      ))}
      <button onClick={() => setQuiz([...quiz, { question: "", options: ["", "", "", ""], correctAnswer: 0 }])}>+ Add</button>
      <button onClick={submitQuiz}>Save Quiz</button>

      <h3 style={{ marginTop: "30px" }}>Existing Quiz</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {existingQuiz.map((q, index) => (
          <div key={index} style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "10px", minWidth: "300px" }}>
            {editingIndex === index ? (
              <>
                <input value={q.question} onChange={(e) => {
                  const copy = [...existingQuiz];
                  copy[index].question = e.target.value;
                  setExistingQuiz(copy);
                }} />
                {q.options.map((opt, j) => (
                  <input key={j} value={opt} onChange={(e) => {
                    const copy = [...existingQuiz];
                    copy[index].options[j] = e.target.value;
                    setExistingQuiz(copy);
                  }} />
                ))}
                <select value={q.correctAnswer} onChange={(e) => {
                  const copy = [...existingQuiz];
                  copy[index].correctAnswer = Number(e.target.value);
                  setExistingQuiz(copy);
                }}>
                  {[0, 1, 2, 3].map(opt => <option key={opt} value={opt}>Correct Option: {opt + 1}</option>)}
                </select>
                <button onClick={() => updateSingleQuiz(index)}>Save</button>
              </>
            ) : (
              <>
                <strong>{q.question}</strong>
                <ul style={{ paddingLeft: "20px" }}>
                  {q.options.map((opt, j) => (
                    <li key={j} style={{ color: j === q.correctAnswer ? "green" : "black" }}>{opt}</li>
                  ))}
                </ul>
              </>
            )}
            <div style={{ marginTop: "10px" }}>
              <button onClick={() => setEditingIndex(index)}>✏️ Edit</button>
              <button onClick={() => deleteSingleQuiz(index)} style={{ marginLeft: "10px", color: "red" }}>🗑️ Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddQuiz;

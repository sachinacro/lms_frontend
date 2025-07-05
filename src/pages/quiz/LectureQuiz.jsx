// src/pages/lectureQuiz/LectureQuiz.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { server } from "../../main";
import toast from "react-hot-toast";
import Loading from "../../components/loading/Loading";

const LectureQuiz = () => {
  const { id } = useParams(); // lecture ID
  const [quiz, setQuiz] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const { data } = await axios.get(`${server}/api/quiz/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        setQuiz(data.quiz || []);
        setAnswers(new Array(data.quiz.length).fill("")); // initial empty answers
        setLoading(false);
      } catch (err) {
        toast.error("Failed to load quiz.");
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

 const handleAnswerChange = (i, optionIndex) => {
    const updatedAnswers = [...answers];
    updatedAnswers[i] = optionIndex; // ✅ ab number jayega
    setAnswers(updatedAnswers);
    };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (submitLoading) return;
  setSubmitLoading(true);

  try {
    const { data } = await axios.post(
      `${server}/api/quiz/submit/${id}`,
      { answers },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    toast.success(data.message);
    navigate(-1);
  } catch (error) {
    toast.error(error.response?.data?.message || "Quiz submission failed");
  } finally {
    setSubmitLoading(false);
  }
};


  return loading ? (
    <Loading />
  ) : (
    <div className="quiz-container">
      <h2>Lecture Quiz</h2>
      {quiz.map((q, i) => (
        <div key={i} className="quiz-question">
          <h4>
            {i + 1}. {q.question}
          </h4>
          {q.options.map((option, j) => (
            <label key={j}>
                <input
                type="radio"
                name={`q${i}`}
                value={j}
                checked={answers[i] === j}
                onChange={() => handleAnswerChange(i, j)}
                />
                {option}
            </label>
            ))}

        </div>
      ))}
      <button
  className="common-btn"
  onClick={handleSubmit}
  disabled={submitLoading} // ✅ Prevent double click
>
  Submit Quiz
</button>

    </div>
  );
};

export default LectureQuiz;

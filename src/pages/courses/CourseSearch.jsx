import React, { useState, useEffect } from "react";
import "./CourseSearch.css";

const CourseSearch = ({ courses, onSearch }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (query.trim()) {
      const matched = courses
        .filter((course) =>
          course.title.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 5);
      setSuggestions(matched);
    } else {
      setSuggestions([]);
    }
  }, [query, courses]);

  const handleSelectSuggestion = (title) => {
    setQuery(title);
    setShowSuggestions(false);
    onSearch(title); // Filter courses immediately
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
    setShowSuggestions(false);
  };

  return (
    <form onSubmit={handleSubmit} className="search-container">
      <input
        type="text"
        placeholder="🔍 Search courses..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowSuggestions(true);
        }}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
        className="search-input"
      />

      {showSuggestions && query.trim() && (
        <ul className="suggestion-list">
          {suggestions.length > 0 ? (
            suggestions.map((course) => (
              <li
                key={course._id}
                className="suggestion-item"
                onClick={() => handleSelectSuggestion(course.title)}
              >
                {course.title}
              </li>
            ))
          ) : (
            <li className="no-suggestion">No match found</li>
          )}
        </ul>
      )}
    </form>
  );
};

export default CourseSearch;

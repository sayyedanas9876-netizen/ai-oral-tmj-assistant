import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Assessment() {
  const navigate = useNavigate();

  const [jawPain, setJawPain] = useState("");
  const [clicking, setClicking] = useState("");
  const [difficultyOpening, setDifficultyOpening] = useState("");
  const [duration, setDuration] = useState("");

  const handleAnalyze = () => {
    // Check whether all questions are answered
    if (
      !jawPain ||
      !clicking ||
      !difficultyOpening ||
      !duration
    ) {
      alert("Please answer all questions before continuing.");
      return;
    }

    // Send answers to Results page
    navigate("/results", {
      state: {
        jawPain,
        clicking,
        difficultyOpening,
        duration,
      },
    });
  };

  return (
    <div className="assessment">

      {/* Page Heading */}
      <h1>TMJ Symptom Assessment</h1>

      <p className="assessment-subtitle">
        Answer a few simple questions about your jaw-related
        symptoms.
      </p>


      {/* Question 1 */}
      <div className="question-card">

        <h3>
          1. Do you experience jaw pain?
        </h3>

        <button
          className={`option ${jawPain === "Yes" ? "selected" : ""}`}
          onClick={() => setJawPain("Yes")}
        >
          Yes
        </button>

        <button
          className={`option ${jawPain === "No" ? "selected" : ""}`}
          onClick={() => setJawPain("No")}
        >
          No
        </button>

        {jawPain && (
          <p>
            Selected: <strong>{jawPain}</strong>
          </p>
        )}

      </div>


      {/* Question 2 */}
      <div className="question-card">

        <h3>
          2. Do you hear clicking or popping from your jaw?
        </h3>

        <button
          className={`option ${clicking === "Yes" ? "selected" : ""}`}
          onClick={() => setClicking("Yes")}
        >
          Yes
        </button>

        <button
          className={`option ${clicking === "No" ? "selected" : ""}`}
          onClick={() => setClicking("No")}
        >
          No
        </button>

        {clicking && (
          <p>
            Selected: <strong>{clicking}</strong>
          </p>
        )}

      </div>


      {/* Question 3 */}
      <div className="question-card">

        <h3>
          3. Do you have difficulty opening your mouth?
        </h3>

        <button
          className={`option ${
            difficultyOpening === "Yes" ? "selected" : ""
          }`}
          onClick={() => setDifficultyOpening("Yes")}
        >
          Yes
        </button>

        <button
          className={`option ${
            difficultyOpening === "No" ? "selected" : ""
          }`}
          onClick={() => setDifficultyOpening("No")}
        >
          No
        </button>

        {difficultyOpening && (
          <p>
            Selected:{" "}
            <strong>{difficultyOpening}</strong>
          </p>
        )}

      </div>


      {/* Question 4 */}
      <div className="question-card">

        <h3>
          4. How long have you experienced these symptoms?
        </h3>

        <button
          className={`option ${
            duration === "Less than a week" ? "selected" : ""
          }`}
          onClick={() =>
            setDuration("Less than a week")
          }
        >
          Less than a week
        </button>

        <button
          className={`option ${
            duration === "1–4 weeks" ? "selected" : ""
          }`}
          onClick={() =>
            setDuration("1–4 weeks")
          }
        >
          1–4 weeks
        </button>

        <button
          className={`option ${
            duration === "More than a month" ? "selected" : ""
          }`}
          onClick={() =>
            setDuration("More than a month")
          }
        >
          More than a month
        </button>

        {duration && (
          <p>
            Selected: <strong>{duration}</strong>
          </p>
        )}

      </div>


      {/* Analyze Button */}
      <button
        className="analyze-btn"
        onClick={handleAnalyze}
      >
        Analyze My Symptoms
      </button>


      {/* Disclaimer */}
      <div className="question-card">

        <h3>⚠️ Important</h3>

        <p>
          This assessment provides educational information
          only. It does not diagnose any medical condition.
        </p>

        <p>
          If you have severe or rapidly worsening symptoms,
          seek appropriate professional medical care.
        </p>

      </div>

    </div>
  );
}

export default Assessment;
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Assessment() {
  const navigate = useNavigate();

  const [problem, setProblem] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(false);

  const problems = [
    "Tooth Pain",
    "Tooth Sensitivity",
    "Tooth Decay / Cavity Concern",
    "Gum Problem",
    "Mouth Ulcer",
    "Bad Breath",
    "Jaw / TMJ",
    "Mouth / Face Swelling",
    "Dry Mouth",
    "Tongue Concern",
    "Broken / Chipped Tooth",
    "Other Oral Concern",
  ];

  const durations = [
    "Less than a week",
    "1–4 weeks",
    "More than a month",
    "Not sure",
  ];

  async function handleSubmit() {
    if (!problem) {
      alert("Please select your main concern.");
      return;
    }

    if (!symptoms.trim()) {
      alert("Please describe your symptoms.");
      return;
    }

    if (!duration) {
      alert("Please select how long you have had the problem.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/assessment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            problem,
            symptoms,
            duration,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Backend request failed");
      }

      const result = await response.json();

      navigate("/results", {
        state: {
          problem,
          symptoms,
          duration,
          backendResponse: result,
        },
      });
    } catch (error) {
      console.error(error);

      alert(
        "AI response nahi mil raha. Please make sure backend is running."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "75vh",
        padding: "50px 20px",
        background: "#f4f9fc",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "auto",
        }}
      >
        {/* Header */}

        <div
          style={{
            textAlign: "center",
            marginBottom: "35px",
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "8px 15px",
              background: "#dff1ff",
              color: "#2563eb",
              borderRadius: "50px",
              fontSize: "14px",
              fontWeight: "600",
              marginBottom: "15px",
            }}
          >
            AI-Powered Assessment
          </div>

          <h1
            style={{
              fontSize: "38px",
              margin: "0 0 12px",
            }}
          >
            🩺 Oral & TMJ Assessment
          </h1>

          <p
            style={{
              color: "#667085",
              fontSize: "17px",
              lineHeight: "1.6",
            }}
          >
            Tell us about your symptoms to receive
            general AI-powered educational guidance.
          </p>
        </div>

        {/* Step 1 */}

        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "18px",
            marginBottom: "20px",
            boxShadow: "0 5px 20px rgba(0,0,0,0.06)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "#2563eb",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "700",
              }}
            >
              1
            </div>

            <h2 style={{ margin: 0, fontSize: "21px" }}>
              What is your main concern?
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "12px",
            }}
          >
            {problems.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setProblem(item)}
                style={{
                  padding: "16px",
                  borderRadius: "12px",
                  border:
                    problem === item
                      ? "2px solid #2563eb"
                      : "1px solid #d9e2ec",
                  background:
                    problem === item
                      ? "#eff6ff"
                      : "white",
                  color: "#172033",
                  fontSize: "15px",
                  textAlign: "left",
                  cursor: "pointer",
                  fontWeight:
                    problem === item ? "600" : "400",
                }}
              >
                {item === "Tooth Pain" && "🦷 "}
                {item === "Tooth Sensitivity" && "🧊 "}
                {item === "Tooth Decay / Cavity Concern" &&
                  "🪥 "}
                {item === "Gum Problem" && "🩸 "}
                {item === "Mouth Ulcer" && "👄 "}
                {item === "Bad Breath" && "😮 "}
                {item === "Jaw / TMJ" && "😬 "}
                {item === "Mouth / Face Swelling" && "🔴 "}
                {item === "Dry Mouth" && "💧 "}
                {item === "Tongue Concern" && "👅 "}
                {item === "Broken / Chipped Tooth" && "🦷 "}
                {item === "Other Oral Concern" && "❓ "}
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2 */}

        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "18px",
            marginBottom: "20px",
            boxShadow: "0 5px 20px rgba(0,0,0,0.06)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "#2563eb",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "700",
              }}
            >
              2
            </div>

            <h2 style={{ margin: 0, fontSize: "21px" }}>
              Describe your symptoms
            </h2>
          </div>

          <textarea
            value={symptoms}
            onChange={(event) =>
              setSymptoms(event.target.value)
            }
            placeholder="Example: I have pain in my jaw when opening my mouth..."
            rows="6"
            style={{
              width: "100%",
              padding: "16px",
              boxSizing: "border-box",
              border: "1px solid #d9e2ec",
              borderRadius: "12px",
              fontSize: "16px",
              resize: "vertical",
              outline: "none",
            }}
          />
        </div>

        {/* Step 3 */}

        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "18px",
            marginBottom: "20px",
            boxShadow: "0 5px 20px rgba(0,0,0,0.06)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "#2563eb",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "700",
              }}
            >
              3
            </div>

            <h2 style={{ margin: 0, fontSize: "21px" }}>
              How long have you had this problem?
            </h2>
          </div>

          {durations.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setDuration(item)}
              style={{
                display: "block",
                width: "100%",
                padding: "16px",
                marginBottom: "10px",
                borderRadius: "10px",
                border:
                  duration === item
                    ? "2px solid #2563eb"
                    : "1px solid #d9e2ec",
                background:
                  duration === item
                    ? "#eff6ff"
                    : "white",
                color: "#172033",
                fontSize: "16px",
                textAlign: "left",
                cursor: "pointer",
                fontWeight:
                  duration === item ? "600" : "400",
              }}
            >
              {duration === item ? "✓ " : ""}
              {item}
            </button>
          ))}
        </div>

        {/* Submit */}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: "100%",
            padding: "18px",
            border: "none",
            borderRadius: "12px",
            background: loading
              ? "#94a3b8"
              : "#2563eb",
            color: "white",
            fontSize: "18px",
            fontWeight: "700",
            cursor: loading
              ? "not-allowed"
              : "pointer",
            boxShadow: "0 8px 20px rgba(37,99,235,0.2)",
          }}
        >
          {loading
            ? "🤖 AI is analyzing..."
            : "Get AI Educational Guidance →"}
        </button>

        {/* Disclaimer */}

        <div
          style={{
            marginTop: "25px",
            padding: "20px",
            borderRadius: "14px",
            background: "#fff7e6",
            border: "1px solid #f0d58a",
          }}
        >
          <h3 style={{ marginTop: 0 }}>
            ⚠️ Important
          </h3>

          <p
            style={{
              marginBottom: 0,
              lineHeight: "1.6",
              color: "#5b6472",
            }}
          >
            This assessment provides general educational
            information only. It does not diagnose diseases
            or replace advice from a qualified healthcare
            professional.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Assessment;
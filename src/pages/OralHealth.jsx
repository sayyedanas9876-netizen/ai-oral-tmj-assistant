import { useState } from "react";

function OralHealth() {
  const [concern, setConcern] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const concerns = [
    "Tooth Sensitivity",
    "Tooth Pain",
    "Gum Problems",
    "Bad Breath",
    "Mouth Ulcer",
    "Dry Mouth",
    "Tongue Concern",
    "Tooth Decay / Cavity",
    "General Oral Health",
  ];

  async function getGuidance() {
    if (!concern) {
      alert("Please select an oral health concern.");
      return;
    }

    if (!question.trim()) {
      alert("Please describe your concern.");
      return;
    }

    setLoading(true);
    setAnswer("");

    try {
      const response = await fetch(
"https://ai-oral-tmj-assistant-production.up.railway.app/api/chat",        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: `
You are an educational oral health assistant.

The user's selected concern is:
${concern}

The user's description/question is:
${question}

Explain the topic in simple language.

Include:
1. What this concern commonly means
2. Common possible causes
3. General self-care or oral hygiene guidance
4. When the person should see a dentist
5. Any urgent warning signs if relevant

Do not diagnose the person.
Do not prescribe medicines.
Clearly mention that this is educational information only.
            `,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const result = await response.json();

      setAnswer(result.answer);
    } catch (error) {
      console.error(error);

      setAnswer(
        "Sorry, AI se response nahi mil raha. Please make sure the FastAPI backend is running."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "70vh",
        padding: "50px 20px",
        background: "#f4f9fc",
      }}
    >
      <div style={{ maxWidth: "750px", margin: "auto" }}>

        <h1
          style={{
            fontSize: "34px",
            marginBottom: "10px",
          }}
        >
          🦷 Oral Health Assistant
        </h1>

        <p
          style={{
            fontSize: "17px",
            color: "#555",
            marginBottom: "30px",
          }}
        >
          Learn about common oral-health concerns and get
          AI-powered educational guidance.
        </p>

        {/* Concern Selection */}

        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "15px",
            marginBottom: "20px",
            boxShadow: "0 3px 15px rgba(0,0,0,0.06)",
          }}
        >
          <h2
            style={{
              fontSize: "21px",
              marginBottom: "20px",
            }}
          >
            1. What would you like to know about?
          </h2>

          {concerns.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setConcern(item)}
              style={{
                display: "block",
                width: "100%",
                padding: "16px",
                marginBottom: "12px",
                borderRadius: "10px",
                border:
                  concern === item
                    ? "2px solid #2563eb"
                    : "2px solid #d9e2ec",
                background:
                  concern === item
                    ? "#dff1ff"
                    : "#ffffff",
                color: "#222",
                fontSize: "16px",
                textAlign: "left",
                cursor: "pointer",
                fontWeight:
                  concern === item ? "600" : "400",
              }}
            >
              {item === "Tooth Sensitivity" && "🧊 "}
              {item === "Tooth Pain" && "🦷 "}
              {item === "Gum Problems" && "🩸 "}
              {item === "Bad Breath" && "😮 "}
              {item === "Mouth Ulcer" && "👄 "}
              {item === "Dry Mouth" && "💧 "}
              {item === "Tongue Concern" && "👅 "}
              {item === "Tooth Decay / Cavity" && "🪥 "}
              {item === "General Oral Health" && "✨ "}

              {item}
            </button>
          ))}

          {concern && (
            <p
              style={{
                marginTop: "15px",
                fontWeight: "600",
                color: "#2563eb",
              }}
            >
              Selected: {concern}
            </p>
          )}
        </div>

        {/* Question */}

        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "15px",
            marginBottom: "20px",
            boxShadow: "0 3px 15px rgba(0,0,0,0.06)",
          }}
        >
          <h2
            style={{
              fontSize: "21px",
              marginBottom: "15px",
            }}
          >
            2. Describe your concern
          </h2>

          <textarea
            value={question}
            onChange={(event) =>
              setQuestion(event.target.value)
            }
            placeholder="Example: My teeth hurt when I drink something cold..."
            rows="6"
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "15px",
              border: "2px solid #d9e2ec",
              borderRadius: "10px",
              fontSize: "16px",
              fontFamily: "inherit",
              resize: "vertical",
              outline: "none",
            }}
          />
        </div>

        {/* Button */}

        <button
          type="button"
          onClick={getGuidance}
          disabled={loading}
          style={{
            display: "block",
            width: "100%",
            padding: "18px",
            border: "none",
            borderRadius: "10px",
            background: loading
              ? "#94a3b8"
              : "#2563eb",
            color: "white",
            fontSize: "18px",
            fontWeight: "600",
            cursor: loading
              ? "not-allowed"
              : "pointer",
            marginBottom: "20px",
          }}
        >
          {loading
            ? "🤖 AI is thinking..."
            : "Get AI Guidance →"}
        </button>

        {/* AI Answer */}

        {answer && (
          <div
            style={{
              background: "#eef7ff",
              padding: "25px",
              borderRadius: "15px",
              marginBottom: "20px",
              border: "1px solid #c9e4ff",
            }}
          >
            <h2>🤖 AI Educational Guidance</h2>

            <p
              style={{
                whiteSpace: "pre-wrap",
                lineHeight: "1.7",
                fontSize: "16px",
                marginTop: "15px",
              }}
            >
              {answer}
            </p>
          </div>
        )}

        {/* Disclaimer */}

        <div
          style={{
            background: "#fff7e6",
            padding: "20px",
            borderRadius: "12px",
            border: "1px solid #f0d58a",
          }}
        >
          <h3>⚠️ Important</h3>

          <p>
            This AI assistant provides general educational
            information only. It does not diagnose medical
            conditions or replace advice from a qualified
            healthcare professional.
          </p>

          <p>
            If you have severe swelling, difficulty
            breathing or swallowing, uncontrolled bleeding,
            significant facial injury, or rapidly worsening
            symptoms, seek urgent medical care.
          </p>
        </div>

      </div>
    </div>
  );
}

export default OralHealth;
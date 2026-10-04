import { useState } from "react";

function Chat() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendQuestion() {
    if (!question.trim()) {
      alert("Please enter your question.");
      return;
    }

    setLoading(true);
    setAnswer("");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: question,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Chat request failed");
      }

      const result = await response.json();

      setAnswer(
        result.answer ||
          "AI response is not available right now."
      );
    } catch (error) {
      console.error(error);

      setAnswer(
        "AI service is temporarily unavailable. Please try again after a few moments."
      );
    } finally {
      setLoading(false);
    }
  }

  function clearChat() {
    setQuestion("");
    setAnswer("");
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
              borderRadius: "50px",
              background: "#dff1ff",
              color: "#2563eb",
              fontSize: "14px",
              fontWeight: "600",
              marginBottom: "15px",
            }}
          >
            AI-Powered Assistant
          </div>

          <h1
            style={{
              fontSize: "38px",
              margin: "0 0 12px",
            }}
          >
            🤖 AI Oral & TMJ Assistant
          </h1>

          <p
            style={{
              color: "#667085",
              fontSize: "17px",
              lineHeight: "1.6",
            }}
          >
            Ask general educational questions about
            oral health, teeth, gums, or jaw/TMJ concerns.
          </p>
        </div>

        {/* Question Card */}

        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "18px",
            marginBottom: "20px",
            boxShadow: "0 5px 20px rgba(0,0,0,0.06)",
          }}
        >
          <h2
            style={{
              marginTop: 0,
              fontSize: "22px",
            }}
          >
            💬 Ask your question
          </h2>

          <p
            style={{
              color: "#667085",
              fontSize: "14px",
            }}
          >
            Example: Why does my jaw click when I open
            my mouth?
          </p>

          <textarea
            value={question}
            onChange={(event) =>
              setQuestion(event.target.value)
            }
            placeholder="Type your oral or jaw health question here..."
            rows="6"
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "16px",
              marginTop: "10px",
              border: "1px solid #d9e2ec",
              borderRadius: "12px",
              fontSize: "16px",
              resize: "vertical",
              outline: "none",
            }}
          />

          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "15px",
            }}
          >
            <button
              type="button"
              onClick={sendQuestion}
              disabled={loading}
              style={{
                flex: 1,
                padding: "16px",
                border: "none",
                borderRadius: "10px",
                background: loading
                  ? "#94a3b8"
                  : "#2563eb",
                color: "white",
                fontSize: "16px",
                fontWeight: "700",
                cursor: loading
                  ? "not-allowed"
                  : "pointer",
              }}
            >
              {loading
                ? "🤖 AI is thinking..."
                : "Ask AI →"}
            </button>

            <button
              type="button"
              onClick={clearChat}
              disabled={loading}
              style={{
                padding: "16px 20px",
                border: "1px solid #d9e2ec",
                borderRadius: "10px",
                background: "white",
                color: "#374151",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Clear
            </button>
          </div>
        </div>

        {/* AI Response */}

        {answer && (
          <div
            style={{
              background:
                "linear-gradient(135deg, #eef7ff, #f8fbff)",
              padding: "30px",
              borderRadius: "18px",
              marginBottom: "20px",
              border: "1px solid #c9e4ff",
              boxShadow:
                "0 5px 20px rgba(37,99,235,0.06)",
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
                  width: "45px",
                  height: "45px",
                  borderRadius: "12px",
                  background: "#2563eb",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "23px",
                }}
              >
                🤖
              </div>

              <div>
                <h2
                  style={{
                    margin: 0,
                    fontSize: "22px",
                  }}
                >
                  AI Response
                </h2>

                <p
                  style={{
                    margin: "4px 0 0",
                    color: "#667085",
                    fontSize: "14px",
                  }}
                >
                  General educational information
                </p>
              </div>
            </div>

            <div
              style={{
                background: "white",
                padding: "22px",
                borderRadius: "12px",
                lineHeight: "1.8",
                color: "#374151",
                whiteSpace: "pre-wrap",
                fontSize: "16px",
              }}
            >
              {answer}
            </div>
          </div>
        )}

        {/* Safety */}

        <div
          style={{
            background: "#fff7e6",
            padding: "22px",
            borderRadius: "16px",
            border: "1px solid #f0d58a",
          }}
        >
          <h3 style={{ marginTop: 0 }}>
            ⚠️ Important
          </h3>

          <p
            style={{
              color: "#5b6472",
              lineHeight: "1.7",
              marginBottom: "10px",
            }}
          >
            This AI assistant provides general educational
            information only. It does not diagnose medical
            conditions or prescribe treatment.
          </p>

          <p
            style={{
              color: "#5b6472",
              lineHeight: "1.7",
              marginBottom: 0,
            }}
          >
            For severe swelling, difficulty breathing or
            swallowing, uncontrolled bleeding, significant
            facial injury, or rapidly worsening symptoms,
            seek urgent medical care.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Chat;
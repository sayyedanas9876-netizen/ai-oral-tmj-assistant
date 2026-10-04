function Home() {
  return (
    <>
      <section className="hero" id="home">
        <div className="hero-content">

          <div className="badge">
            AI-Powered Oral Health Assistant
          </div>

          <h1>
            Understand Your
            <span> Oral & TMJ </span>
            Symptoms
          </h1>

          <p>
            Get easy-to-understand, AI-powered educational
            guidance about oral and jaw-related symptoms.
          </p>

          <a href="/assessment">
            <button className="primary-btn">
              Start Assessment
            </button>
          </a>

          <a href="/chat">
            <button className="secondary-btn">
              Ask AI Assistant
            </button>
          </a>

        </div>

        <div className="hero-card">
          <div className="tooth-icon">🦷</div>

          <h3>AI Oral Assistant</h3>

          <p>Smart. Simple. Informative.</p>
        </div>
      </section>

      <section className="features" id="features">

        <div className="section-title">
          <h2>What Can You Do?</h2>

          <p>
            Explore the main features of your AI health assistant.
          </p>
        </div>

        <div className="feature-grid">

          <div className="feature-card">
            <div className="icon">🦴</div>

            <h3>TMJ Assessment</h3>

            <p>
              Answer simple questions about jaw-related
              symptoms and receive educational guidance.
            </p>
          </div>

          <div className="feature-card">
            <div className="icon">🦷</div>

            <h3>Oral Health</h3>

            <p>
              Learn more about common oral-health symptoms
              and possible next steps.
            </p>
          </div>

          <div className="feature-card">
            <div className="icon">🤖</div>

            <h3>AI Assistant</h3>

            <p>
              Ask questions and get easy-to-understand
              AI-generated information.
            </p>
          </div>

        </div>

      </section>
    </>
  );
}

export default Home;
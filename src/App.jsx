import { useRef, useState } from "react";
import "./App.css";
import OpenAI from "openai";

function App() {
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const [isCooldown, setIsCooldown] = useState(false);

  let openai = useRef(
    new OpenAI({
      apiKey: import.meta.env.VITE_API_KEY,
      dangerouslyAllowBrowser: true,
    })
  );

  const handleSubmit = async () => {
    if (isCooldown) {
      setAnswer("Please wait before making another request.");
      return;
    }

    setAnswer("Writing your answer✍. Please wait...");
    setIsCooldown(true);

    try {
      const completion = await openai.current.chat.completions.create({
        messages: [{ role: "user", content: question }],
        model: "gpt-3.5-turbo",
      });
      setAnswer(completion.choices[0].message.content);
    } catch (error) {
      console.error("Error:", error.message);
      setAnswer("An error occurred. Please try again.");
    }

    setTimeout(() => {
      setIsCooldown(false);
    }, 5000);
  };

  return (
    <div>
      <div className="header">
        <img src="chatGPTlogo.webp" alt="logo" />
        <h3>ChatGPT</h3>
      </div>

      <div className="container">
        <div className="inputBox">
          <textarea
            type="text"
            placeholder="Enter your question..."
            autoFocus
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          ></textarea>
          <button onClick={handleSubmit} disabled={isCooldown}>
            Submit
          </button>
        </div>

        <div className="answer">{answer}</div>
      </div>
    </div>
  );
}

export default App;

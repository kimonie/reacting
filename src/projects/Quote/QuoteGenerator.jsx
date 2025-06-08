import React, { useState } from "react";
import "./QuoteGenerator.css";

const quotes = [
  { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
  { text: "Code is like humor. When you have to explain it, it’s bad.", author: "Cory House" },
  { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
  { text: "Before software can be reusable it first has to be usable.", author: "Ralph Johnson" },
];

function QuoteGenerator() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(false);

  const showRandomQuote = () => {
    setFade(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setIndex(randomIndex);
      setFade(false);
    }, 300);
  };

  const { text, author } = quotes[index];

  return (
    <div className="quote-container">
      <div className={`quote-box ${fade ? "fade" : ""}`}>
        <p className="quote-text">"{text}"</p>
        <p className="quote-author">— {author}</p>
      </div>
      <button onClick={showRandomQuote}>New Quote</button>
    </div>
  );
}

export default QuoteGenerator;

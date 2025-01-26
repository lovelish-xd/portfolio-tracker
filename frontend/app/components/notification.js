import { useState } from "react";

export default function Notification() {
  const [isVisible, setIsVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => setIsVisible(false), 300); // Matches animation duration
  };

  if (!isVisible) return null;

  return (
    <div className="bg-yellow-500 text-black px-4 py-2 text-center relative">
      <span className="px-10 py-5">
        🚧 The project is still under development. Only the frontend is
        complete (not pixel perfect tho) due to semester exams and health issues. Check out the GitHub repository for more updates:{" "}
        <a
          href="https://github.com/lovelish-xd/portfolio-tracker"
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-bold hover:text-yellow-700"
        >
          GitHub Repository
        </a>
      </span>
      <button
        onClick={handleClose}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-xl font-bold"
        aria-label="Close"
      >
        &times;
      </button>
    </div>
  );
}

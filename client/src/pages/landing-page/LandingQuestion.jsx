import React, { useState } from "react";
import { IoChevronUpOutline } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
const questions = [
  {
    id: 1,
    question: "What is therapy?",
    answer: "Therapy is a treatment for psychological problems.",
  },
  {
    id: 2,
    question: "How do i Know you need a therapy?",
    answer: "Yes, we offer a variety of organic nuts.",
  },
  {
    id: 3,
    question: "What should i expect from my first session?",
    answer: "We source our nuts from trusted suppliers worldwide.",
  },
  {
    id: 4,
    question: "What if i don't feel comfortable with my therapist?",
    answer: "We source our nuts from trusted suppliers worldwide.",
  },
];

const LandingQuestion = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = (id) => {
    setIsOpen((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="flex flex-col justify-center items-center mt-5 gap-5 p-5">
        <div className="flex flex-col justify-center items-center text-center text-2xl font-bold">
            <h2>We’re Here to Answer All your </h2>
            <h2>Questions</h2>
        </div>
      <div className="h-auto max-w-lg ">
        <div>
          {questions.map((question) => (
            <div key={question.id} className="border-b border-gray-200 ">
              <div className="flex justify-between items-center py-4 ">
                <h1 className="text-lg font-semibold">{question.question}</h1>
                <button
                  onClick={() => handleToggle(question.id)}
                  className="text-blue-500"
                >
                  {isOpen === question.id ? <IoChevronUpOutline /> : <FaChevronDown />}
                </button>
              </div>
              {isOpen === question.id && (
                <p className="py-4">{question.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingQuestion;

import { Lightbulb, LucideVolume2 } from "lucide-react";
import React from "react";

function QuestionSection({ mockQuest, activeQsIndex }) {
  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry , Your browser does not support textToSpeech");
    }
  };
  return (
    <div className="p-5 border rounded-lg  mt-14">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {mockQuest &&
          mockQuest.map((question, index) => (
            <div key={index} className="flex flex-col gap-2">
              <h2
                className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer ${
                  activeQsIndex === index
                    ? "bg-primary text-white"
                    : "bg-secondary text-black"
                }`}
              >
                <strong>Question {index + 1}: </strong>
              </h2>
            </div>
          ))}
      </div>

      <h2 className="my-5 text-md md:text-lg">
        {mockQuest && mockQuest[activeQsIndex] && mockQuest[activeQsIndex].question}
      </h2>
      <LucideVolume2
        className="cursor-pointer"
        onClick={() =>
          textToSpeech(mockQuest && mockQuest[activeQsIndex] && mockQuest[activeQsIndex].question)
        }
      />
      <div className="border rounded-lg p-5 bg-blue-100 mt-20">
        <h2 className="flex gap-2 items-center text-blue-500">
          <Lightbulb />
          <strong>Note: </strong>
        </h2>
        <h3 className="text-sm text-primary my-2">
          {process.env.NEXT_PUBLIC_INFORMATION}
        </h3>
      </div>
    </div>
  );
}

export default QuestionSection;

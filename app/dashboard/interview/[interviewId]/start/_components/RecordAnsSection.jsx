"Use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { chatSession } from "@/utils/GeminiAiModel";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { Mic } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import React, { use, useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import Webcam from "react-webcam";
import { toast } from "sonner";

function RecordAnsSection({ mockQuest, activeQsIndex, interviewdata }) {
  const [userAns, setuserAns] = useState("");
  const { user } = useUser();
  const [loading, setloading] = useState(false);
  const {
    error,
    interimResult,
    isRecording,
    results,
    setResults,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    results.map((resullt) => {
      setuserAns((prevAns) => prevAns + resullt?.transcript);
    });
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAns) {
      UpdateUserAnswer();
    }
  }, [isRecording, userAns]);
  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async () => {
    try {
      setloading(true);

      const feedBackPromt =
        "Question: " +
        mockQuest[activeQsIndex].question +
        " ,  Answer: " +
        userAns +
        "Please rate the candidate on a scale of 1-10 based on their answer and provide feedback (where the candidate needs to improve) in just 2 to 3 lines in JSON format containing rating and feedback field.";

      const result = await chatSession.sendMessage(feedBackPromt);
      const mockJsonResp = JSON.parse(
        result.response.text().replace("```json", "").replace("```", "")
      );
      console.log(mockJsonResp);
      const resp = await db.insert(UserAnswer).values({
        mockIdRef: interviewdata?.mockId,
        question: mockQuest[activeQsIndex]?.question,
        correctAns: mockQuest[activeQsIndex]?.answer,
        userAns: userAns,
        feedback: mockJsonResp?.feedback,
        rating: mockJsonResp?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
      });

      if (resp) {
        toast("Answer Recorded Successfully");
        setuserAns("");
        setResults([]);
      } else {
        toast("Failed to record answer");
      }
      setloading(true);
    } catch (error) {
      console.log(error);
      toast("Failed to record answer");
    }
  };

  return (
    <div className="flex items-center justify-center flex-col gap-5">
      <div className="flex flex-col mt-20 justify-center items-center rounded-lg p-5 ">
        <Image
          src="/webcam.png"
          width={200}
          height={200}
          alt="record"
          className="absolute"
        />
        <Webcam
          style={{
            height: 300,
            width: 300,
            borderRadius: "40%",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            objectFit: "cover",
            zIndex: 10
          }}
          mirrored={true}
        />
      </div>
      <Button
        Disabled={loading}
        variant="ghost"
        className=" w-1/2"
        onClick={StartStopRecording}
      >
        {isRecording ? (
          <h2 className="text-red-600 flex gap-2">
            <Mic /> Stop Recording....
          </h2>
        ) : (
          "Recort Answer"
        )}
      </Button>
    </div>
  );
}

export default RecordAnsSection;

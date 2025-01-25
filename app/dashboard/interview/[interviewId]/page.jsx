"use client";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { useEffect, useState } from "react";
import { db } from "@/utils/db";
import Webcam from "react-webcam";
import { WebcamIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
function InterviewPage({ params }) {
  const [webCamEnabled, setwebCamEnabled] = useState(false);
  const [interviewdata, setInterviewdata] = useState(null);
  useEffect(() => {
    console.log(params.interviewId);
    GetInterviewDetails();
  }, []);

  const handleUserMedia = () => {
    console.log("Webcam enabled");
    setwebCamEnabled(true);
  };

  const handleUserMediaError = (error) => {
    console.error("Webcam error:", error);
    setwebCamEnabled(false);
  };

  const GetInterviewDetails = async () => {
    try {
      const response = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));
      // console.log(response[0].jobPosition);
      setInterviewdata(response[0]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
      <div className=" my-10 justify-center flex flex-col items-center ">
        <h2 className="font-bold text-2xl">Let's get started</h2>
        {webCamEnabled ? (
          <Webcam
            onUserMedia={handleUserMedia}
            onUserMediaError={handleUserMediaError}
            style={{ height: 300, width: 300, rounded: true }}
            mirrored={true}
          />
        ) : (
          <>
            <WebcamIcon className="h-72 w-2/6 my-7 p-20 bg-secondary rounded-lg border" />
            <Button onClick={() => setwebCamEnabled(true)}>
              Enable Web Camera and Microphone
            </Button>
          </>
        )}
        <div className="flex flex-col my-5 gap-4">
        {interviewdata && (
          <>
            <h2 className="text-lg">
              <strong>Job Role / Job Position: </strong>
              {interviewdata.jobPosition}
            </h2>
            <h2 className="text-lg">
              <strong>Job Description / Tech Stack: </strong>
              {interviewdata.jobDesc}
            </h2>
            <h2 className="text-lg">
              <strong>Years of Experience: </strong>
              {interviewdata.jobExperience}
            </h2>
          </>
        )}
      </div>
      </div>
      
  );
}

export default InterviewPage;

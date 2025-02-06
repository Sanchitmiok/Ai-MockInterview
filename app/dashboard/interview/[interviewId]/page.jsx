"use client";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { useEffect, useState } from "react";
import { db } from "@/utils/db";
import Webcam from "react-webcam";
import { Lightbulb, WebcamIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
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

  alert("Enable Web Camera and Microphone to start the interview");

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 my-5 s">
        <div className="flex flex-col items-center gap-5">
          {webCamEnabled ? (
            <>
              <Webcam
                onUserMedia={handleUserMedia}
                onUserMediaError={handleUserMediaError}
                style={{
                  height: 300,
                  width: 300,
                  borderRadius: "50%",
                  border: "5px solid #4A90E2",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  objectFit: "cover",
                }}
                mirrored={true}
              />
              <Link href={`/dashboard/interview/${params.interviewId}/start`}>
                <Button
                  className="w-full border"
                  onClick={() => console.log("Start the interview")}
                >
                  Start the Interview
                </Button>
              </Link>
            </>
          ) : (
            <>
              <WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary rounded-xl border" />
              <Button
                variant="ghost"
                onClick={() => setwebCamEnabled(true)}
                className="w-full"
              >
                Enable Web Camera and Microphone
              </Button>
            </>
          )}
        </div>
        <div className="flex flex-col my-5 gap-4">
          <div className=" p-4 rounded-lg border ">
            {interviewdata && (
              <div className="flex flex-col gap-2">
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
              </div>
            )}
          </div>
          <div className="p-5 border rounded-lg border-yellow-400 bg-yellow-50">
            <h2 className="flex gap-2 items-center text-yellow-500">
              {" "}
              <Lightbulb className="h-10 w-10" /> <strong>Information</strong>
            </h2>
            <h2 className="mt-3 text-yellow-600">
              {process.env.NEXT_PUBLIC_INFORMATION}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterviewPage;

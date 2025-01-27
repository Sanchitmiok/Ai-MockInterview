"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import QuestionSection from "./_components/QuestionSection";
import RecordAnsSection from "./_components/RecordAnsSection";

function page({ params }) {
  const [interviewdata, setInterviewdata] = useState(null);
  const [mockQuest, setmockQuest] = useState(null);
  const [activeQsIndex, setactiveQsIndex] = useState(0)
  useEffect(() => {
    console.log(params.interviewId);
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    try {
      const response = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));

      setInterviewdata(response[0]);
      const jsonMockResponsse = JSON.parse(response[0].jsonMockResponse);
      setmockQuest(jsonMockResponsse);
      console.log(jsonMockResponsse);
    } catch (error) {
      console.log(error);
    }
  };
  return <div className="flex justify-between items-center gap-5">
    {/* Question section */}
    <QuestionSection mockQuest={mockQuest}
    activeQsIndex={activeQsIndex} />

    {/* Recording section */}
    <RecordAnsSection/>
  </div>;
}

export default page;

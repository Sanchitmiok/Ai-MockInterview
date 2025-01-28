"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import QuestionSection from "./_components/QuestionSection";
import RecordAnsSection from "./_components/RecordAnsSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function page({ params }) {
  const [interviewdata, setInterviewdata] = useState(null);
  const [mockQuest, setmockQuest] = useState([]);
  const [activeQsIndex, setactiveQsIndex] = useState(0);
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
  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Question section */}
        <QuestionSection mockQuest={mockQuest} activeQsIndex={activeQsIndex} />

        {/* Recording section */}
        <RecordAnsSection
          mockQuest={mockQuest}
          activeQsIndex={activeQsIndex}
          interviewdata={interviewdata}
        />
      </div>
      <div className="flex justify-end gap-5">
        {activeQsIndex > 0 && (
          <Button onClick={() => setactiveQsIndex(activeQsIndex - 1)}>
            Previous Question
          </Button>
        )}
        {activeQsIndex < mockQuest.length - 1 && (
          <Button onClick={() => setactiveQsIndex(activeQsIndex + 1)}>
            Next Question
          </Button>
        )}
        {activeQsIndex === mockQuest.length - 1 && (
          <Link href={`/dashboard/interview/${params.interviewId}/feedback`}>
            <Button>Submit</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default page;

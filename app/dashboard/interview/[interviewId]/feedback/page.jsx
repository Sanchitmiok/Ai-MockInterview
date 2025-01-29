"use client";
import React, { use, useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { ChevronsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function FeedBack({ params }) {
  const [feedbackList, setfeedbackList] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const router = useRouter();
  useEffect(() => {
    GetFeedBackData();
  }, []);
  const GetFeedBackData = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id, "asc");
    setfeedbackList(result);
    console.log(result);
    if (result.length > 0) {
      const totalRating = result.reduce((sum, feedback) => {
        const rating = parseInt(feedback.rating, 10);
        return sum + rating;
      }, 0);
      console.log(`Total Rating: ${totalRating}`);
      const avgRating = totalRating / result.length;
      setAverageRating(avgRating);
    }
  };
  return (
    <div className="p-10">
      {feedbackList?.length == 0 ? (
        <h2 className="font-bold text-xl text-red-500">No feedback available for this interview</h2>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-green-400">Congratulations</h2>
          <h2 className="text-2xl font-bold ">Here is your FeedBack</h2>

          <h2 className="text-lg text-primary">
            Your overall interview rating : {averageRating.toFixed(2)} / 10
          </h2>

          {feedbackList &&
            feedbackList.map((item, index) => (
              <Collapsible key={index} className="mt-4">
                <CollapsibleTrigger className="p-2 bg-secondary rounded-lg flex justify-between items-center">
                  {item.question}
                  <ChevronsDown size={20} />
                </CollapsibleTrigger>
                <CollapsibleContent className="p-2  rounded-lg border border-primary">
                  <div className="flex flex-col gap-2">
                    <h2
                      className={`font-bold ${
                        item.rating < 4 ? "text-red-500" : "text-green-500"
                      } `}
                    >
                      Rating: {item.rating} / 10
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-800">
                      <strong>Your Answer: </strong> {item.userAns}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-800">
                      <strong>Sample Answer: </strong> {item.correctAns}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-yellow-50 text-sm text-yellow-800">
                      <strong>Feeback: </strong> {item.feedback}
                    </h2>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
        </>
      )}
      <Button className="mt-4" onClick={() => router.replace("/dashboard")}>
        Home Page
      </Button>
    </div>
  );
}

export default FeedBack;

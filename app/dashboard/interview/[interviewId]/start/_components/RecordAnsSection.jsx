"Use client";
import { Button } from "@/components/ui/button";
import { Heading2, Mic } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import Webcam from "react-webcam";

function RecordAnsSection() {
    const [userAns, setuserAns] = useState("")
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    results.map((resullt)=>{
        setuserAns(prevAns => prevAns + resullt.transcript)
    })
  }, [results])
  

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
            zIndex: 10,
          }}
          mirrored={true}
        />
      </div>
      <Button
      variant='ghost'
        className=" w-1/2"
        onClick={isRecording ? stopSpeechToText : startSpeechToText}
      >
        {isRecording ? (
          <h2 className="text-red-600 flex gap-2">
            <Mic /> Stop Recording....
          </h2>
        ) : (
          "Recort Answer"
        )}
      </Button>
      <Button onClick={()=>console.log(userAns)}>Show Ans</Button>
    </div>
  );
}

export default RecordAnsSection;

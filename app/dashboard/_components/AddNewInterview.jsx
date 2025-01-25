"use client"
import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { chatSession } from "@/utils/GeminiAiModel";
import { LoaderCircleIcon } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { MockInterview } from "@/utils/schema";
import { db } from "@/utils/db";
import { useRouter } from "next/navigation";

function AddNewInterview() {
    const [openDaialog, setOpenDialog] = useState(false);
    const [JobPosition, setJobPosition] = useState()
    const [JobDesc, setJobDesc] = useState()
    const [JobExp, setJobExp] = useState()
    const [loading, setloading] = useState(false)
    const [jsonResponce, setjsonResponce] = useState([])
    const {user} = useUser();
    const router = useRouter()

    const onSubmit = async(e) => {
      setloading(true)
        e.preventDefault()

        console.log(JobPosition, JobDesc, JobExp)

        const InputPrompt = `Job Position: ${JobPosition} ; Job Description :${JobDesc}; years of experience:${JobExp}. Based on given information suggestion me some ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview question along with their ans in json formate , Give question and answer only without further classification in json formate.`

        const result = await chatSession.sendMessage(InputPrompt);
        setloading(false)
        
        const MockJsonResponse = (result.response.text()).replace('```json', '').replace('```', '')
        console.log(JSON.parse(MockJsonResponse))
        setjsonResponce(MockJsonResponse)

        if(MockJsonResponse){

          const response = await db.insert(MockInterview).values({
            jobPosition:JobPosition,
            jobDesc:JobDesc,
            jobExperience:JobExp,
            createdBy:user?.primaryEmailAddress?.emailAddress,
            createdAt:moment().format('YYYY-MM-DD HH:mm:ss'),
            jsonMockResponse:MockJsonResponse,
            mockId:uuidv4()
          }).returning({mockId:MockInterview.mockId}).execute()
  
          console.log("Inserted ID",response)
        }else{
          console.log("Error in mock interview")
        }
        if(response){
          setOpenDialog(false)
          router.push(`/dashboard/interview/${response[0].mockId}`)
        }
    }
  return (
    <div>
      <div className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-sm cursor-pointer transition-all" onClick={() => setOpenDialog(true)}>
        <h2 className="font-bold text-lg text-center">+ Add New</h2>
      </div>
      <Dialog open={openDaialog}>
        <DialogContent className='max-w-2xl'>
          <DialogHeader>
            <DialogTitle className='text-2xl'>Tell us more about your job role </DialogTitle>
            <DialogDescription>
            <form onSubmit={onSubmit}>
             <div>
             <h2>This will permanently delete your
             account and remove your data from our servers.</h2>
             <div className="mt-5 my-2">
                <label>Job Role / Job Position</label>
                <Input placeholder="Ex. Web Developer" required
                onChange={(event)=>setJobPosition(event.target.value)}/>
             </div>
             <div className="my-3">
                <label>Job Description / Tech Stack(In short)</label>
                <Input placeholder="Ex. Reactjs , Angular , Nodejs" required
                onChange={(event)=>setJobDesc(event.target.value)}/>
             </div>
             <div className="mt-5 my-2">
                <label>Year of Experience</label>
                <Input placeholder="Numbers only" type='number' max="50" required
                onChange={(event)=>setJobExp(event.target.value)}/>
             </div>
             </div>
              <div className="flex justify-end mt-5 gap-5">
                <Button type='button' onClick={()=>setOpenDialog(false)}>Cancel</Button>
                <Button type='submit' disable={loading}>
                  {loading ? <>
                  <LoaderCircleIcon className='animate-spin' size={20} />
                  </> : 'Start the interview'}</Button>
              </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;

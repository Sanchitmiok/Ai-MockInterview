import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

function InterviewItemCard({interview}) {
    const router = useRouter()
    const handleStart = () => {
        router.push(`/dashboard/interview/${interview?.mockId}`)
    }
    const handleFeedback = () => {
        router.push(`/dashboard/interview/${interview?.mockId}/feedback`)
    }
  return (
    <div className='border shadow-sm rounded-lg p-3'>
        <h2 className='font-bold text-primary'>{interview?.jobPosition}</h2>
        <h2 className='text-sm text-gray-500'>{interview?.jobExperience} Years of Experience</h2>
        <h2 className='text-xs text-gray-500'>Created At: {interview?.createdAt}</h2>
        <div className='flex justify-between mt-2 gap-5'>
            <Button className='w-full' variant = 'outline' size='sm' onClick={handleFeedback}>Feedback</Button>
            <Button size='sm' className='w-full' onClick = {handleStart}>Start</Button>
        </div>
      
    </div>
  )
}

export default InterviewItemCard

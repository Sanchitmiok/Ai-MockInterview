import { DocumentTextIcon,CameraIcon, VideoCameraIcon, FaceSmileIcon, PencilIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function HowItWorks() {
  const steps = [
    {
      title: "Create Interview",
      desc: "Click on '+Add New' and fill basic details like title, job role, and year of experience.",
      icon: <DocumentTextIcon className="w-8 h-8 text-primary" />,
    },
    {
      title: "Enable Web Camera and Microphone",
      desc: "Ensure your camera and microphone are enabled to seamlessly attempt and answer the questions without any issues.",
      icon: <CameraIcon className="w-8 h-8 text-primary" />,
    },
    {
      title: "Record Answer",
      desc:"Click on 'Record Answer' to start the recording. When you're finished, click on 'Stop recording' to end the recording.",
      icon: <VideoCameraIcon className="w-8 h-8 text-primary" />,
    },
    {
      title: "Feedback",
      desc: "After submitting your answers, you will be redirected to a feedback page where you can find a detailed analysis of your interview performance.",
      icon: <FaceSmileIcon className="w-8 h-8 text-primary" />,
    },
    {
      title: "Practice",
      desc: "You can also revisit any interviews you have attended in the past few days to review and reflect on your performance, identify areas for improvement, and reinforce key learnings.",
      icon: <PencilIcon className="w-8 h-8 text-primary" />,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Master Interviews in 5 Simple Steps
        </h1>
        <p className="text-gray-600 text-lg">
          From creating to attempting - we've got you covered!
        </p>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {steps.map((step, index) => (
          <div 
            key={index}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                {step.title}
              </h3>
            </div>
            <p className="text-gray-600">{step.desc}</p>
            <div className="mt-4 text-primary font-medium">
              Step {index + 1}
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="text-center mt-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Ready to Create Your Interview?
        </h2>
        <Link href='/dashboard'>
        <button  className="bg-primary text-white px-10 py-4 rounded-xl text-lg font-semibold hover:bg-primary-dark transition-colors">
          Create Interview Now
        </button>
        </Link>
      </div>
    </div>
  );
}
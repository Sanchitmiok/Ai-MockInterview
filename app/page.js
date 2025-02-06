import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  
  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 bg-gray-100">
        <h1 className="text-4xl md:text-6xl font-bold">
          Sharpen Your Interview Skills with AI
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl">
          Practice mock interviews and receive instant feedback powered by AI.
        </p>
        <div className="mt-6">
          <Link href="/dashboard">
            <Button className="bg-primary hover:bg-primary/90">
              Get Started
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 md:px-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Features That Empower
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 border rounded-lg shadow-sm text-center">
            <h3 className="text-xl font-semibold mb-2">AI-Powered Feedback</h3>
            <p className="text-gray-600">
              Get automated insights on your responses, highlighting strengths
              and areas to improve.
            </p>
          </div>
          <div className="p-6 border rounded-lg shadow-sm text-center">
            <h3 className="text-xl font-semibold mb-2">Extensive Question Bank</h3>
            <p className="text-gray-600">
              Prepare with a wide array of real-world interview questions.
            </p>
          </div>
          <div className="p-6 border rounded-lg shadow-sm text-center">
            <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
            <p className="text-gray-600">
              Monitor your performance over time and see how you improve.
            </p>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="flex flex-col items-center justify-center py-14 bg-blue-50">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">
          Ready to Master Your Next Interview?
        </h2>
        <Link href="/dashboard">
          <Button className="bg-primary hover:bg-primary/90">
            Start Mock Interview
          </Button>
        </Link>
      </section>
    </main>
  );
}
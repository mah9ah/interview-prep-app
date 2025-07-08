import React from 'react'
import {Button} from "@/components/ui/button";
import Link from 'next/link';
import Image from 'next/image';
import InterviewCard from '@/components/interviewCard';
import { getInterviewsByUserId, getLatestInterviews} from '@/lib/actions/general.action';
import { getCurrentUser } from '@/lib/actions/auth.action';
import { signOut } from '@/lib/actions/auth.action';



const page = async () => {
  const user = await getCurrentUser();
  const [userInterviews, latestInterviews] = await Promise.all([
    getInterviewsByUserId(user?.id!),
    getLatestInterviews({userId: user?.id!})

  ])

  const hasPastInterviews = userInterviews?.length > 0;
  const hasUpcomingInterviews = latestInterviews?.length > 0;

  return (
    <>
    <div className="w-full relative">
  <form action={signOut}>
    <button
      className="absolute top-6 right-6 px-4 py-2 bg-red-600 text-white font-bold rounded-md shadow-lg hover:bg-red-700 hover:scale-105 hover:shadow-xl transition duration-300"
    >
      Sign Out
    </button>
  </form>
</div>

        <section className="card-cta">
          <div className="flex flex-col gap-6 max-w-lg">
          <h2 style={{ color: 'black', textShadow: '0 0 8px #0ef97faa, 0 0 15px #0ef97fff', fontWeight: 600, fontSize: '1.875rem',}}>
              Get Ready For Interview With AI-Powered Practice & Feedback
          </h2>
          <p style={{ color: 'black', textShadow: '0 0 8px #0ef97faa, 0 0 15px #0ef97fff', fontSize: '1.125rem',  }} >
              practice on real interview questions & get instant feedback!
          </p>
          <Button asChild className="max-sm:w-full" style={{ backgroundColor: 'black', color: 'white', boxShadow: '0 0 10px #0ef97f, 0 0 20px #0ef97f', border: '1px solid #0ef97f', }} >
              <Link href="/interview">Start an interview</Link>
          </Button>
          </div>
          <Image src="/robot.png" alt="robo-dude" width={400} height={400} className="max-sm:hidden" />
        </section>

        <section className="flex flex-col gap-6 mt-8">
          <h2> YOUR INTERVIEWS</h2>
          <div className="interviews-section">

            { hasPastInterviews ? (
                userInterviews?.map((interview)=>(
                  <InterviewCard {...interview} key ={interview.id} />
                ))) : (
                  <p>You have not taken any interviews yet</p>
                )}
    

          </div>
        </section>

        <section className="flex flex-col gap-6 mt-8">
          <h2>Take an Interview</h2>
          
          <div className="interviews section">
              {hasUpcomingInterviews ? (
                latestInterviews?.map((interview)=>(
                  <InterviewCard {...interview} key ={interview.id} />
                ))) : (
                  <p>There are no new interviews availible!</p>
                )}
              
          </div>

        </section>


    </>

  )
}

export default page
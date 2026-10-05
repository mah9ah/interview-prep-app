'use client'

import { useRouter } from "next/navigation";
import { retakeInterview} from "@/lib/actions/auth.action";

interface RetakeButtonProps {
  interviewId: string;
  userId: string;
}

const RetakeButton = ({ interviewId, userId }: RetakeButtonProps) => {
  const router = useRouter();

  const handleClick = async () => {
    const newInterviewId = await retakeInterview(interviewId, userId);
    if (newInterviewId) {
      router.push(`/interview/${newInterviewId}`);
    } else {
      alert("Failed to retake interview.");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="btn-primary flex-1 text-sm font-semibold text-black text-center rounded-md hover:scale-105 transition-transform p-3"
    >
      Retake Interview
    </button>
  );
};

export default RetakeButton;

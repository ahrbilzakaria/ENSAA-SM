"use client"
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CloseButton() {
    const router = useRouter()
  return (
    <button aria-label="close modal" onClick={()=> router.back()}>
        <X></X>
    </button>
  )
}

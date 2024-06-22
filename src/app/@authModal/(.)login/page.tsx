import LoginForm from "@/app/(auth)/login/page";




export default function page() {
  return (
    <div className="fixed inset-0  bg-zinc-900/20  z-10">
        <div className="w-[80%] mx-auto h-full relative flex items-center justify-center">
            <LoginForm state={true} />
        </div>
    </div>
  )
}

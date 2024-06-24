
import Button from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'
import Link from 'next/link'

export const useLoginToasts = () => {
  const loginToast = () => {
    const { dismiss } = toast({
      title: 'Login required.',
      description: 'You need to be logged in.',
      variant: 'destructive',
      action: (
        <Link
          onClick={() => dismiss()}
          href='/login'
          >
            <Button className='hover:bg-gray-900 '>Login</Button>
          
        </Link>
      ),
    })
  }

  return { loginToast }
}

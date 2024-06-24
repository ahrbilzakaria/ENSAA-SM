// import {CreatePost} from '@/components/CreatePost'
import Button from '@/components/ui/button'
import { INFINITE_SCROLL_PAGINATION_RESULTS } from '@/config'
import { db } from '@/lib/db'
import getSession from '@/lib/getSession'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FC } from 'react'


interface pageProps {
  params: {
    name: string
  }
}

const  page: FC<pageProps> = async ({params}:pageProps) => {
  const session = await getSession()
  const {name} = params
  const subreddit = await db.subreddit.findFirst({
    where:{
      name : name
    },
    include:{
      posts: {
        include: {
          author:true,
          votes:true,
          comments:true,
          subreddit:true
        },
        take: INFINITE_SCROLL_PAGINATION_RESULTS
      },
    },

  })

  if (!subreddit) {
    return notFound()
  }

  return (<div >
  <h1 className="font-bold text-3xl md:text-4xl text-zinc-500">/<span className='text-gray-900 font-semibold pl-1'>{subreddit.name}</span></h1>
  {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-6 py-4"> */}
  <div className="grid grid-cols-3 " >
  <div className="flex flex-col md:col-span-2 col-span-3 gap-2 items-start py-4 ">
    <div className="px-3 ">
      <p className="text-sm text-zinc-500 text-start truncate-2-lines "><span className='font-bold'>Description: </span> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est, quae. Omnis minus autem ratione nisi aut odio consectetur quae accusamus eius, itaque laboriosam voluptas dolorem provident repellat reiciendis necessitatibus nam?</p>
    </div>
   {/* <CreatePost session={session}></CreatePost> */}
      </div>
    </div>
    
    </div>
)
}

export default page
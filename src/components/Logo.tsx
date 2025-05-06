import { Routes } from '@/constants/enums'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

function Logo({className, ...props}: React.ComponentPropsWithRef<"div">) {
  return (
    <div className={cn("", className)} {...props}>
        <Link href={Routes.ROOT} className={'text-2xl font-semibold hover:opacity-80 transition-all'}>Logo</Link>
    </div>
  )
}

export default Logo
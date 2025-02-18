import { cn } from '@/lib/utils';
import React from 'react'

export default function Navbar() {

  return (
    <nav className={cn(
        'py-10 flex justify-between items-center animate-move-down'
    )}>
        <img src="../../favicon.ico" alt="M" className='h-10' />
        <div className='flex items-center gap-5'>
        </div>
    </nav>
  )
}

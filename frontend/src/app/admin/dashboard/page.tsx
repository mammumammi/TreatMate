'use client';

import { ThemeSwitcher } from '@/app/components/ThemeSwitcher';
import { div } from 'framer-motion/client';
import React from 'react'




type Props = {}

const adminDashboard = (props: Props) => {
  return (
    <main className='  h-full min-h-screen'>
      <ThemeSwitcher/>
      <section>
        <h1 className='m-10 text-3xl'>Admin Dashboard</h1>
      </section>
    </main>
  )
}

export default adminDashboard
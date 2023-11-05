'use client';

import { Button } from '@/components/ui/button';
import useScores from '@/hooks/use-scores';
import Link from 'next/link';

export default function Home() {
  const { scores, setScores } = useScores();

  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-24'>
      <h1 className='text-2xl my-8'>Dashboard</h1>
      {scores
        .sort((a, b) => b.score - a.score)
        .map((s, i) => (
          <div key={s.name + i} className='mt-2'>
            {`${s.name}: ${s.score}`}
          </div>
        ))}
      <Link href='/game'>
        <Button
          variant={'outline'}
          className='bg-black text-white hover:text-black hover:bg-white mt-6'
        >
          {'Play'}
        </Button>
      </Link>
    </main>
  );
}

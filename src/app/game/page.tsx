'use client';

import { listMovies } from '@/api/api-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useScores from '@/hooks/use-scores';
import { Movie } from '@/types/Movie';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { XCircle, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const useMovieDescriptions = () => {
  return useQuery('movies', async () => await listMovies());
};

export default function GamePage() {
  const { scores, setScores } = useScores();
  const { data, isLoading, error } = useMovieDescriptions();

  const [title, setTitle] = useState('');
  const [valid, setValid] = useState<boolean | null>(null);
  const [randomNumber, setRandomNumber] = useState<number>(
    data ? Math.floor(Math.random() * (data.length - 0) + 0) : 0
  );

  if (isLoading || !data) return <div>Loading...</div>;
  if (error) return <div>Something went wrong...</div>;

  const generateRandomDesc = () => {
    const random = Math.floor(Math.random() * (data.length - 0) + 0);
    setRandomNumber(random);
    setValid(null);
    setTitle('');
    return random;
  };

  const handleGuessSubmit = (movie: Movie) => {
    // Don't provide the titles directly on client and write an endpoint to check the guessed value
    if (
      movie.title.replace(/\s/g, '').toLowerCase() ===
      title.replace(/\s/g, '').toLowerCase()
    ) {
      const s = scores;
      const currentUser = s.find((s) => s.name === 'Current User');

      if (currentUser) {
        currentUser.score++;
      }
      setScores(s);
      setValid(true);
      return;
    }
    setValid(false);
  };

  return (
    <div className='flex min-h-screen flex-col items-center justify-center p-24'>
      <h1 className='text-2xl my-8'>Guess the Movie</h1>
      <h3>
        Current score: {scores.find((s) => s.name === 'Current User')?.score}
      </h3>
      <div className='flex flex-col gap-4 my-4 w-full md:w-[500px]'>
        <div className='w-full '>{data[randomNumber].description}</div>
        <div className='flex flex-col md:flex-row gap-4'>
          <Input
            type='text'
            placeholder='Title'
            className='w-full md:w-[400px]'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button
            variant={'outline'}
            className='hover:text-white hover:bg-black'
            onClick={() =>
              valid
                ? generateRandomDesc()
                : handleGuessSubmit(data[randomNumber])
            }
          >
            {valid ? 'Generate new' : 'Submit'}
          </Button>
        </div>
        {valid && (
          <div className='flex flex-row gap-2 text-green-700'>
            <CheckCircle2 />
            Congratulations!
          </div>
        )}
        {valid === false ? (
          <div className='flex flex-row gap-2 text-red-700'>
            <XCircle />
            Try again
          </div>
        ) : (
          <></>
        )}
        <div className='flex gap-2'>
          <Button
            variant={'outline'}
            className='bg-black text-white hover:text-black hover:bg-white'
            onClick={generateRandomDesc}
          >
            {'Generate new'}
          </Button>
          <Link href='/'>
            <Button
              variant={'outline'}
              className='bg-black text-white hover:text-black hover:bg-white'
            >
              {'Back to the dashboard'}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

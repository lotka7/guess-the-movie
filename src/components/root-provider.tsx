'use client';

import { ScoresContext } from '@/hooks/use-scores';
import { Result } from '@/types/Score';
import { useState } from 'react';

type Props = {
  children: React.ReactNode;
};

function ScoresProvider({ children }: Props) {
  // TODO - save to database and get data from there
  const [scores, setScores] = useState<Result[]>([
    { name: 'Antoino', score: 8 },
    { name: 'Jessica', score: 5 },
    { name: 'Current User', score: 0 },
  ]);

  return (
    <ScoresContext.Provider value={{ scores, setScores }}>
      {children}
    </ScoresContext.Provider>
  );
}

export default ScoresProvider;

import { Result } from '@/types/Score';

import { createContext, useContext } from 'react';

const initialState = [
  { name: 'Antoino', score: 8 },
  { name: 'Jessica', score: 5 },
  { name: 'Current User', score: 0 },
];

export const ScoresContext = createContext({
  scores: initialState,
  setScores: (newScores: Result[]) => {},
});

const useScores = () => useContext(ScoresContext);

export default useScores;

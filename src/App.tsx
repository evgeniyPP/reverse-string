import { useState } from 'react';
import reverseStringWithSteps from './lib/reverseStringWithSteps';
import getCharStatus from './lib/getCharStatus';
import cn from './utils/cn';

function App() {
  const [input, setInput] = useState('');
  const [steps, setSteps] = useState<string[][] | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const startAlgorithm = () => {
    const newSteps = reverseStringWithSteps(input);
    setSteps(newSteps);
    setCurrentStepIndex(0);

    if (!newSteps.length) return;

    let index = 0;

    const intervalId = setInterval(() => {
      if (index >= newSteps.length - 1) {
        clearInterval(intervalId);
        return;
      }

      setCurrentStepIndex(++index);
    }, 1000);
  };

  return (
    <div className="mx-auto max-w-md space-y-6 py-10">
      <h1 className="text-2xl font-bold">Разворот строки</h1>
      <div className="mt-2 flex rounded-md shadow-sm">
        <div className="relative flex flex-grow items-stretch focus-within:z-10">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            className="block w-full rounded-none rounded-l-md border-0 py-2.5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
          />
        </div>
        <button
          type="button"
          onClick={startAlgorithm}
          className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white ring-1 ring-inset ring-blue-300 hover:bg-blue-700"
        >
          Развернуть
        </button>
      </div>

      <div className="flex flex-wrap gap-1 py-4">
        {steps?.[currentStepIndex].map((char, index) => {
          const status = getCharStatus({ index, steps, currentStepIndex });

          return (
            <span
              key={index}
              className={cn(
                'flex size-16 items-center justify-center rounded-full border-4 pb-1 text-3xl',
                {
                  'border-red-600': status === 'unsorted',
                  'border-yellow-400': status === 'sorting',
                  'border-green-500': status === 'sorted',
                }
              )}
            >
              {char}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default App;

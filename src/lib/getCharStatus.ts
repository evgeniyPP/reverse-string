type Props = {
  index: number;
  steps: string[][];
  currentStepIndex: number;
};

export default function getCharStatus({ index, steps, currentStepIndex }: Props) {
  const maxIndex = steps[currentStepIndex].length - 1;

  if (
    index < currentStepIndex ||
    index > maxIndex - currentStepIndex ||
    currentStepIndex === steps.length - 1
  ) {
    return 'sorted';
  }

  if (index === currentStepIndex || index === maxIndex - currentStepIndex) {
    return 'sorting';
  }

  return 'unsorted';
}

import { useCallback } from 'react';
import { StoryItem } from '@components/Storybook/StoryItem';

import { DecompositionPanel } from './DecompositionPanel';
import { DecompositionProvider } from './DecompositionProvider';
import { IDecompositionItem } from './types';

const Decomposition = () => {
  const getDecompositionCallBack = useCallback(async () => {
    return {
      1: {
        idtf: 'Привет',
        position: 0,
        decomposition: {
          2: {
            idtf: 'Я',
            position: 1,
            decomposition: {
              3: {
                idtf: 'Твоя',
                position: 3,
              } as any,
            },
          },
        },
      },
    };
  }, []);

  const addDecompositionItemCallBack = useCallback(
    async (_id: string, _data: IDecompositionItem): Promise<number | null> => {
      return 14;
    },
    [],
  );

  const editDecompositionItemCallback = useCallback(async (_id: number, _value: string) => {
    return true;
  }, []);

  const deleteDecompositionItemCallback = useCallback(
    async (_parentID: string, _id: string): Promise<number | null> => {
      return 12;
    },
    [],
  );

  return (
    <DecompositionProvider
      getDecompositionCallback={getDecompositionCallBack}
      addDecompositionItemCallBack={addDecompositionItemCallBack}
      editDecompositionItemCallback={editDecompositionItemCallback}
      deleteDecompositionItemCallback={deleteDecompositionItemCallback}
    >
      <DecompositionPanel editable deletable />
    </DecompositionProvider>
  );
};

export const DecompositionStory = () => (
  <StoryItem name="DecompositonPanel">
    <Decomposition />
  </StoryItem>
);

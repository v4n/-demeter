import winLikelihoodCalculator from './winLikelihoodCalculator';
import {generateAntKey} from '../../utils/ants';

export default function batchWinLikelihoodCalculator({
  ants,
  onEntryStart,
  onEntryCompletion,
  onCompletion,
}) {
  Promise.all(
    ants.map((ant) => {
      const key = generateAntKey(ant);
      onEntryStart && onEntryStart({key});

      return new Promise((resolve) => {
        winLikelihoodCalculator()((value) => {
          onEntryCompletion && onEntryCompletion({key, value});
          resolve();
        });
      });
    }),
  ).then(() => {
    onCompletion && onCompletion();
  });
}

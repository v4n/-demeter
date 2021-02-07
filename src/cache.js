import {InMemoryCache, makeVar} from '@apollo/client';
import {WIN_LIKEHOOD_STATES} from './constants';

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        winLikehoodState() {
          return winLikehoodStateVar();
        },
        winLikehood() {
          return winLikehoodVar();
        },
      },
    },
  },
});

export const winLikehoodStateVar = makeVar(WIN_LIKEHOOD_STATES.NOT_YET_RUN);
export const winLikehoodVar = makeVar({});

import { createSelector } from 'reselect';

export const transcriptState = state => state.transcripts;

export const transcriptSelector = createSelector(
  [transcriptState],
  transcriptList => transcriptList.transcriptList,
);

export const  transcriptListSelector = createSelector(
  [transcriptSelector],
  transcripts => {
    let list = [],
      count = 0;
    if (transcripts) {
      list = transcripts.result;
      count = transcripts.length;
    }
    return { list, count };
  },
);

import { createSelector } from 'reselect';

export const isLoadingSelector = state => state.common.isLoading;

export const commonState = state => state.common;

export const commonSelector = createSelector([commonState], common => {
  const { autoSuggestions = [] } = common;
  return autoSuggestions.map(item => item.name);
});

export const globalSearchSelector = createSelector([commonState], common => {
  const { autoSuggestions = [] } = common;
  return autoSuggestions;
});

export const globalSearchListSelector = createSelector(
  [commonState],
  common => {
    const globalSearch = common.globalSearch;
    let list = [],
      count = 0;
    if (globalSearch) {
      list = globalSearch.result;
      count = globalSearch._meta ? globalSearch._meta.count : 0;
    }
    return { list, count };
  },
);

export const channelList = state => {
  const channels = commonState(state);
  return channels.channelList;
};

export const channelListSelector = createSelector(
  channelList,
  channel => {
    const businessUnitsArray = [];
    for (var key in channel) {
      businessUnitsArray.push({
        value: channel[key],
        label: channel[key],
      });
    }
    return businessUnitsArray;
  },
);
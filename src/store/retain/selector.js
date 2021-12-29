import { createSelector } from 'reselect';

export const retainState = state => state.retain;

export const retainUsersSelector = createSelector(
  [retainState],
  retain => retain.retainUsers,
);

export const retainUsersListSelector = createSelector([retainState], users => {
  const retainUsers = users.retainUsers;
  let list = [],
    count = 0;
  if (retainUsers) {
    list = retainUsers.result;
    count = retainUsers._meta ? retainUsers._meta.count : 0;
  }
  return { list, count };
});

export const retainedListSelector = createSelector([retainState], users => {
  const retainedList = users.retainedList;
  let list = [],
    count = 0;
  if (retainedList) {
    list = retainedList.result;
    count = retainedList._meta ? retainedList._meta.count : 0;
  }
  return { list, count };
});

export const retainedNoiseListSelector = createSelector([retainState], users => {
  const retainedNoiseList = users.retainedNoiseList;
  let list = [],
    count = 0;
  if (retainedNoiseList) {
    list = retainedNoiseList.result;
    count = retainedNoiseList._meta ? retainedNoiseList._meta.count : 0;
  }
  return { list, count };
});

export const retainUserSearchListSelector = createSelector(
  [retainState],
  users => {
    const retainSearchUsers = users.retainSearchUsers;
    let list = [],
      count = 0;
    if (retainSearchUsers) {
      list = retainSearchUsers.result;
      count = retainSearchUsers._meta ? retainSearchUsers._meta.count : 0;
    }
    return { list, count };
  },
);

export const failedCapturesListSelector = createSelector(
  [retainState],
  users => {
    const failedCaptures = users.failedCaptures;
    let list = [],
      count = 0;
    if (failedCaptures) {
      list = failedCaptures.result && failedCaptures.result.data;
      count = failedCaptures._meta ? failedCaptures._meta.count : 0;
    }
    return { list, count };
  },
);

export const failedReasonListSelector = createSelector([retainState], users => {
  const failedCaptures = users.failedCapturesReasons;
  // let list = [],
  //   reasonList = [],
  //   _reasonList = [];
  // if (failedCaptures) {
  //   list = failedCaptures.result && failedCaptures.result.data;
  //   list.map(item => {
  //     reasonList = [...reasonList, item.details.map(_item => _item.reason)];
  //   });
  // }
  // _reasonList = reasonList.flat();
  // _reasonList = [...new Set(_reasonList)];
  let finalReasonList = (failedCaptures || []).map(item => {
    let _obj = {};
    _obj.label = item;
    _obj.value = item;
    return _obj;
  });
  let _allObj = {};
  _allObj.label = 'All';
  _allObj.value = '';
  finalReasonList.unshift(_allObj);

  return finalReasonList;
});

export const successCapturesListSelector = createSelector(
  [retainState],
  users => {
    const successCaptures = users.successCaptures;
    let list = [],
      count = 0;
    if (successCaptures) {
      list = successCaptures.result && successCaptures.result.data;
      count = successCaptures._meta ? successCaptures._meta.count : 0;
    }
    return { list, count };
  },
);

export const retainedDetailsSelector = createSelector([retainState], users => {
  const retainedDetails = users.retainedDetails;
  let list = [],
    count = 0;
  if (retainedDetails) {
    list = retainedDetails.result && retainedDetails.result.data;
    count = retainedDetails._meta ? retainedDetails._meta.count : 0;
  }
  return { list, count };
});

export const employeeDetailSelector = createSelector([retainState], emp => {
  return emp.employeeDetails || {};
});

export const exemptedListSelector = createSelector([retainState], users => {
  const exemptedList = users.exemptedList;
  let list = [],
    count = 0;
  if (exemptedList) {
    list = exemptedList.result;
    count = exemptedList._meta ? exemptedList._meta.count : 0;
  }
  return { list, count };
});

export const exemptedUserSearchListSelector = createSelector(
  [retainState],
  users => {
    const exemptedSearchUser = users.exemptedSearchUser;
    let list = [],
      count = 0;
    if (exemptedSearchUser) {
      list = exemptedSearchUser.result;
      count = exemptedSearchUser._meta ? exemptedSearchUser._meta.count : 0;
    }
    return { list, count };
  },
);

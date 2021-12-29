import React from 'react';
import UserInfoCircle from '../UserInfoCircle';
import '@testing-library/jest-dom/extend-expect';
import renderWithRouterAndRedux from 'utils/testUtils';

test('render  user info circle with correct initial', () => {
  const { getByTestId } = renderWithRouterAndRedux(<UserInfoCircle initials="NL" />);
  const circleEl = getByTestId('user-info-circle');
  expect(circleEl.textContent).toBe('NL');
});

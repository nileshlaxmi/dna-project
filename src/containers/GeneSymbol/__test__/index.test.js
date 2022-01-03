import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import renderWithRouterAndRedux from 'utils/testUtils';
import GeneSymbolContainer from '../index';
import { CONSTANTS } from 'constants/index';

test('render header with correct value', () => {
  const { getByTestId } = renderWithRouterAndRedux(<GeneSymbolContainer />);
  const headerEl = getByTestId('home-page-text');
  expect(headerEl.textContent).toBe(CONSTANTS.homePageText);
});

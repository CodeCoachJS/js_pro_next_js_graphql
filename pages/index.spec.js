import { render, screen, fireEvent } from '@testing-library/react';
import IndexPage from './index';
import { useLazyQuery } from '@apollo/react-hooks';

jest.mock('@apollo/react-hooks', () => ({
  useLazyQuery: jest.fn()
}));

describe('index page', () => {
  beforeEach(() => {
    jest.useFakeTimers('modern');
  });
  afterEach(() => {
    jest.useRealTimers();
  });
  const getUsersMock = jest.fn(); // mock the getUsers function and be able to inspect it

  it('should render', async () => {
    // TODO: add tests when the page is loading
    // TODO: add tests for a user with 5 respositories
    // TODO: add tests for a user with 4 respositories
  });

  it('debounces the calls to request more data', async () => {
    // TODO: test the the debounced function is called after 1 second
  });
});

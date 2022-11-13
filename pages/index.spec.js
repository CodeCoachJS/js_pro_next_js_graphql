import { render, screen, fireEvent } from '@testing-library/react';
import IndexPage from './index';
import { useLazyQuery } from '@apollo/react-hooks';

jest.mock('@apollo/react-hooks', () => ({
  useLazyQuery: jest.fn()
}));

jest.useFakeTimers();

describe('index page', () => {
  it('should render', async () => {
    // TODO: add tests when the page is loading
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // TODO: add tests for a user with 5 respositories
    expect(screen.getByText('Repository Count: 5')).toBeInTheDocument();
    expect(screen.getByTestId('user-avatar')).toBeInTheDocument();

    // TODO: add tests for a user with 4 respositories
    expect(screen.getByText('Repository Count: 4')).toBeInTheDocument();
    expect(
      screen.getByText('This user does not have many repositories')
    ).toBeInTheDocument();
    expect(screen.getByTestId('user-avatar')).toBeInTheDocument();
  });

  it('debounces the calls to request more data', async () => {
    const getUsersMock = jest.fn();
    useLazyQuery.mockImplementation(() => [
      getUsersMock,
      {
        loading: true,
        data: null
      }
    ]);
    render(<IndexPage />);

    // TODO: test the the debounced function is called after 1 second

    expect(getUsersMock).toHaveBeenCalledTimes(2);
  });
});

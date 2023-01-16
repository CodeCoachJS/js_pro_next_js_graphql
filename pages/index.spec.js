import { render, screen, fireEvent } from '@testing-library/react';
import IndexPage from './index';
import { useLazyQuery } from '@apollo/react-hooks';

jest.mock('@apollo/react-hooks', () => ({
  useLazyQuery: jest.fn()
}));

jest.useFakeTimers();

describe('index page', () => {
  const getUsersMock = jest.fn(); // mock the getUsers function and be able to inspect it

  it('should render', async () => {
    // TODO: add tests when the page is loading
    useLazyQuery.mockImplementation(() => [
      getUsersMock,
      {
        loading: true,
        data: null
      }
    ]);

    const { rerender } = render(<IndexPage />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    useLazyQuery.mockImplementation(() => [
      getUsersMock,
      {
        loading: false,
        data: {
          user: {
            avatarUrl: 'https://avatars.githubusercontent.com/u/1?v=4',
            repositories: { totalCount: 5 }
          }
        }
      }
    ]);

    rerender(<IndexPage />);
    // TODO: add tests for a user with 5 respositories
    expect(
      screen.getByText('Repository Count: 5', { exact: false })
    ).toBeInTheDocument();
    expect(screen.getByTestId('user-avatar')).toBeInTheDocument();

    useLazyQuery.mockImplementation(() => [
      getUsersMock,
      {
        loading: false,
        data: {
          user: {
            avatarUrl: 'https://avatars.githubusercontent.com/u/1?v=4',
            repositories: { totalCount: 4 }
          }
        }
      }
    ]);

    rerender(<IndexPage />);

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

    const input = screen.getByTestId('search-input');
    // it only calls the function once every 1000ms

    fireEvent.change(input, { target: { value: '123' } });
    jest.advanceTimersByTime(250);
    fireEvent.change(input, { target: { value: '456' } });
    jest.advanceTimersByTime(250); // 500ms
    fireEvent.change(input, { target: { value: '123' } });
    jest.advanceTimersByTime(250); // 750ms
    fireEvent.change(input, { target: { value: '456' } });
    jest.advanceTimersByTime(250); // 1000ms
    fireEvent.change(input, { target: { value: '123' } });
    jest.advanceTimersByTime(250); // 1250ms
    fireEvent.change(input, { target: { value: '456' } });
    jest.advanceTimersByTime(250); // 1500ms
    // TODO: test the the debounced function is called after 1 second

    expect(getUsersMock).toHaveBeenCalledTimes(3);
  });
});

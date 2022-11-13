import { render, screen, fireEvent } from '@testing-library/react';
import IndexPage from './index';
import { useLazyQuery } from '@apollo/react-hooks';

jest.mock('@apollo/react-hooks', () => ({
  useLazyQuery: jest.fn()
}));

jest.useFakeTimers();

afterAll(() => {
  jest.useRealTimers();
});

describe('index page', () => {
  it('should render', async () => {
    const getUsersMock = jest.fn(); // mock the getUsers function and be able to inspect it

    useLazyQuery.mockImplementation(() => [
      getUsersMock,
      {
        loading: true,
        data: null
      }
    ]);

    const { rerender } = render(<IndexPage />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    expect(
      screen.getByText('Please enter a valid Github User Name')
    ).toBeInTheDocument();

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

    expect(screen.getByText('Repository Count: 5')).toBeInTheDocument();
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

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(
      screen.getByText('Please enter a valid Github User Name')
    ).toBeInTheDocument();

    const input = screen.getByTestId('search-input');

    // it only calls the function once every 1000ms
    fireEvent.change(input, { target: { value: '123' } });
    jest.advanceTimersByTime(1000);

    fireEvent.change(input, { target: { value: '456' } });
    jest.advanceTimersByTime(1000);

    fireEvent.change(input, { target: { value: '123' } });
    jest.advanceTimersByTime(1000);

    fireEvent.change(input, { target: { value: '456' } });
    fireEvent.change(input, { target: { value: '123' } });
    fireEvent.change(input, { target: { value: '456' } });

    expect(getUsersMock).toHaveBeenCalledTimes(3);
  });
});

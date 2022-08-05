import { gql } from '@apollo/client';
import { useLazyQuery } from '@apollo/react-hooks';
import Image from 'next/image';
import { useDebounce } from '../hooks';

const GET_USER_REPOS = gql`
  query ($login: String!) {
    user(login: $login) {
      avatarUrl
      bio
      bioHTML
      name
      company
      location
      repositories {
        totalCount
      }
    }
  }
`;

const THRESHOLD = 5;

export default function Home() {
  const [getUsers, { loading, data = [] }] = useLazyQuery(GET_USER_REPOS);

  const debouncedGetUsers = useDebounce(getUsers, 1000);

  return (
    <div>
      <nav className="bg-gray-900 py-2 md:py-4 text-center w-100">
        <div className="container px-4 mx-auto text-center">
          <h1 className="font-bold text-xl text-pink-600">
            Github Repo Explorer
          </h1>
        </div>
      </nav>

      <div className="text-center flex h-screen">
        <div className="mt-20 mx-auto">
          <input
            data-testid="search-input"
            className="border border-slate-300 rounded-md px-3 py-2"
            onChange={(e) => {
              if (e.target.value.length > 2) {
                return debouncedGetUsers({
                  variables: { login: e.target.value }
                });
              } else {
                return debouncedGetUsers({
                  variables: { login: ' ' }
                });
              }
            }}
            placeholder="Enter a username"
          />
          {!data?.user && <p>Please enter a valid Github User Name</p>}
          {data?.user && (
            <div className="flex flex-col items-center mt-10">
              <Image
                data-testid="user-avatar"
                alt="user image"
                src={data.user.avatarUrl}
                width={200}
                height={200}
              />
              <p className="text-bold">
                Repository Count: {data.user.repositories.totalCount}
              </p>
              {data.user.repositories.totalCount < THRESHOLD && (
                <p className="text-red-500 font-bold">
                  This user does not have many repositories
                </p>
              )}
            </div>
          )}
          {loading && <p>Loading...</p>}
        </div>
      </div>
    </div>
  );
}

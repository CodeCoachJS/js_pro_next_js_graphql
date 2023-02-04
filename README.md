## Getting Started

---

First, install dependencues and run the development server:

```bash
yarn
yarn dev
```

To run tests

```bash
yarn test
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

You can watch a walkthrough here: https://www.loom.com/share/c108d903f6b24a348b7675afabd38101

## TODO

---

First you will need a file `.env.local` at the root of this project with your github user access token: `GITHUB_ACCESS_TOKEN=`

To get your github user access token: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token

This app pulls a github user's data from the github graphql API https://docs.github.com/en/graphql and displays their avatar and the number of repositories they own.

Add tests in the `index.spec.js` file to cover all `TODO`s and run `yarn test`... ALL tests should pass.

**Video walkthrough:** https://www.loom.com/share/2c0610272deb456da0b5f4b92d56b036

---

**BONUS**

Add tests (and functionality) for a failed call to the graphql endpoint.

# Playwright Exercise

## About Playwright

Playwright is a modern testing framework that provides end-to-end (E2E) automation for web applications. It allows you to write tests using JavaScript/TypeScript for browser testing, API testing, and mobile app testing, all in a single environment.

## Project Overview

This project is a hands-on exercise designed to practice and improve your skills in Playwright. It includes:

- E2E (end-to-end) testing for web applications.
- API automation using the dummy endpoint from [restful-booker](https://restful-booker.herokuapp.com/apidoc/index.html#api-Auth-ReadBooking).

## Motivation

I've created this exercise to improve and train my skills with `Playwright`, using a well-known dummy website and endpoint to do basic things on the frontend or create some basic requests that can be used in another website or scenarios.

## Credentials

You can get your credentials for API testing on this site [restful-booker](https://restful-booker.herokuapp.com/apidoc/index.html#api-Auth-CreateToken). This is just a dummy site to practice automation skills.

## Getting Started

### Prerequisites

- Node.js (version >= 20.x)
- npm (version >= 11.x)

### Installation Steps

1. Clone the repository:

   ```sh
   git clone git@github.com:armindojr/playwright-exercise.git
   cd playwright-exercise
   ```

2. Install dependencies:

   ```sh
   npm i
   ```

3. Set up environment variables:

   - Make a copy of `.env.example` and rename it to `.env`.
   - Add your credentials from [restful-booker](https://restful-booker.herokuapp.com/apidoc/index.html#api-Auth-CreateToken).

4. Run the tests:
   ```sh
   npm run test
   ```

## Project Structure

```
.
└── playwright-exercise/
    ├── .github/                             # Github actions files
    ├── auth/                                # Temporary token storage
    ├── context/                             # Group files that will be added to playwright context
    │   ├── apiObject/                       # Group API Routes
    │   │   └── route-name.page.ts           # API routes name convention
    │   └── pageObject/                      # Group page objects
    │       └── page-name.page.ts            # Page objects name convention
    ├── fixtures/                            #
    │   └── index.ts                         # Extend playwright adding fixtures to it
    ├── spec/                                # Group tests
    │   ├── api/                             # Group api tests
    │   │   ├── test-name.spec.ts            # Test name convention
    │   │   ├── setup.ts                     # Code that executes before running api tests (Authentication)
    │   │   └── teardown.ts                  # Code that executes after running api tests (Clear token)
    │   └── e2e/                             # Group e2e tests
    │       └── test-name.spec.ts            # Test name convention
    ├── utils/                               #
    │   └── index.ts                         # Reusable code for helper functions
    ├── .env.example                         # Example environment variables configuration
    ├── .gitignore                           # Ignore specific files and folders on git
    ├── .prettierrc                          # Configuration file for Prettier
    ├── eslint.config.mjs                    # Configuration file for ESlint
    ├── package-lock.json                    # File that specifies packages version
    ├── package.json                         # File that contains packages and scripts
    ├── playwright.config.ts                 # Configuration file for Playwright
    └── README.md                            # This file. Project documentation
```

## Contributing

Contributions are welcome! If you'd like to help improve this exercise, please fork the repository and create a pull request.

### Steps to Contribute:

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature-name`).
3. Commit changes (`git add . && git commit -m 'your commit message'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a Pull Request against the `main` branch.

## Code Style

This project enforces the following standards:

- JavaScript/TypeScript (ES6+).
- Code formatting adheres to ESLint rules.
- Tests should cover both UI and API endpoints.

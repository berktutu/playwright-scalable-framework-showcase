# Playwright Scalable Framework Showcase
A small Playwright automation project focused on showcasing scalable automation framework understanding.

## Authentication Approach

Initial login is tested through the UI from the user's perspective using user facing locators.

For the other tests where login is only a necessary step, authentication is handled through the API and a custom Playwright fixture to demonstrate practical understanding of these concepts.

Executed tests are selected selectively to showcase this structure with 3 test cases. 

## What is Used?

- Playwright + TypeScript
- User-facing locators
- Custom fixtures
- Page Object Model
- Utilities
- Parallel execution
- Tracing, screenshots and HTML reporting
- GitHub Actions
- Authentication through API

## Project Structure

```text
api/        → API request
fixtures/   → Custom Playwright fixtures
pages/      → Page Object Models
tests/      → Executed tests
utils/      → Reusable utility
```
## Credentials Storage

"Sensitive credentials" are stored using GitHub Actions Secrets.
```yaml
USER_EMAIL: ${{ secrets.USER_EMAIL }}
USER_PASSWORD: ${{ secrets.USER_PASSWORD }}
```

## Run This Project

```bash
npm install
```

```bash
npx playwright install
```

Note: Create a `.env` file based on `.env.template`.

Run the tests:

```bash
npx playwright test
```

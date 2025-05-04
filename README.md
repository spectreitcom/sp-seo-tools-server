# SP SEO Tool Server - Project Guidelines

## Project Overview
SP SEO Tool Server is a comprehensive SEO analysis and tracking application built with NestJS. The application provides tools for analyzing search engine results pages (SERPs), tracking keyword rankings, and measuring page performance metrics.
The project was built for fun 😀

## Project Structure
The project follows a modular architecture typical of NestJS applications, with clear separation of concerns:

```
src/
├── admin-auth/            # Admin authentication module
├── app.module.ts          # Main application module
├── database/              # Database configuration and services
├── google-scraper/        # Service for scraping Google search results
├── html-parser/           # Service for parsing HTML content
├── main.ts                # Application entry point
├── page-speed/            # Service for measuring page speed metrics
├── rank-tracker/          # Module for tracking search engine rankings
├── rank-tracker-subscription/ # Subscription management for rank tracking
├── search-engine/         # Service for interacting with search engines
├── serp-analyzer/         # Module for analyzing search engine results pages
├── serp-analyzer-subscription/ # Subscription management for SERP analysis
├── shared/                # Shared utilities and services
└── user-auth/             # User authentication module
```

## Architecture
The application uses the following architectural patterns and technologies:

- **Modular Architecture**: Each feature is encapsulated in its own module
- **CQRS Pattern**: Command Query Responsibility Segregation for separating read and write operations
- **Domain-Driven Design**: Focus on the core domain and domain logic
- **Repository Pattern**: Abstraction layer between domain and data mapping layers
- **Dependency Injection**: NestJS's built-in DI container for managing dependencies
- **Event-Driven Architecture**: Using event emitters for loose coupling between components
- **Queue Processing**: BullMQ for handling background tasks and job queues

## Key Technologies
- **NestJS**: Progressive Node.js framework for building server-side applications
- **TypeScript**: Typed superset of JavaScript
- **Prisma**: Next-generation ORM for Node.js and TypeScript
- **BullMQ**: Queue system for handling distributed jobs
- **Jest**: Testing framework
- **Swagger**: API documentation
- **Sentry**: Error tracking and monitoring
- **Redis**: In-memory data structure store used for caching and as a message broker
- **Stripe**: Payment processing

## Testing
The project uses Jest for testing. Tests are located alongside the source code with the `.spec.ts` extension.

### Running Tests
- **Unit Tests**: `npm test` or `yarn test`
- **Watch Mode**: `npm run test:watch` or `yarn test:watch`
- **Coverage**: `npm run test:cov` or `yarn test:cov`
- **E2E Tests**: `npm run test:e2e` or `yarn test:e2e`

When implementing new features or fixing bugs, make sure to write appropriate tests and verify that existing tests pass.

## Building the Project
To build the project, run:
```
npm run build
```
or
```
yarn build
```

This will compile the TypeScript code to JavaScript in the `dist` directory.

## Database Management
The project uses Prisma ORM for database access. Common database commands:

- **Push Schema Changes**: `npm run db:push` or `yarn db:push`
- **Run Migrations**: `npm run db:migrate` or `yarn db:migrate`
- **Open Prisma Studio**: `npm run db:studio` or `yarn db:studio`

## Code Style and Conventions
The project uses ESLint and Prettier for code formatting and linting:

- **Formatting**: `npm run format` or `yarn format`
- **Linting**: `npm run lint` or `yarn lint`

## Code Review
The code review was done by SonarQube, which provides static code analysis and identifies potential bugs, vulnerabilities, and code smells.
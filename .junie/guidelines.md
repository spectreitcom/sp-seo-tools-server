# SP SEO Tool Server - Project Guidelines

## Project Overview
SP SEO Tool Server is a comprehensive SEO analysis and tracking application built with NestJS. The application provides tools for analyzing search engine results pages (SERPs), tracking keyword rankings, and measuring page performance metrics.

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

Follow these general guidelines:
- Use meaningful variable and function names
- Write clear comments for complex logic
- Follow the SOLID principles
- Keep functions small and focused on a single responsibility
- Use async/await for asynchronous operations
- Use dependency injection for better testability
- Follow the existing patterns in the codebase

## Error Handling
The project uses a centralized error handling approach with the ErrorHandlerService. Always use this service for logging errors and avoid exposing internal error details to clients.

## Security Considerations
- Always validate user input using class-validator
- Use parameterized queries with Prisma to prevent SQL injection
- Follow the principle of least privilege
- Use proper authentication and authorization checks
- Be cautious with sensitive data and never log it

## Deployment
The application can be deployed using Docker. A Dockerfile and docker-compose.yml are provided for local development and production deployment.

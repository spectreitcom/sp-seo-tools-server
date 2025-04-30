import { Injectable, Logger } from '@nestjs/common';

/**
 * A service for handling errors in a standardized way,
 * ensuring that sensitive error details are not exposed to clients.
 */
@Injectable()
export class ErrorHandlerService {
  private readonly logger = new Logger(ErrorHandlerService.name);

  /**
   * Handles an error by logging it in a sanitized way and returning a generic error message.
   * @param error The error to handle
   * @param context Additional context information (e.g., class name, method name)
   * @returns A generic error message that can be safely exposed to clients
   */
  handleError(error: any, context = 'unknown'): string {
    // Log the error with context for internal debugging
    this.logger.error(
      `Error in ${context}: ${this.getSanitizedErrorMessage(error)}`,
      this.getSanitizedStackTrace(error),
    );

    // Return a generic error message that doesn't expose sensitive details
    return 'An error occurred while processing your request.';
  }

  /**
   * Logs an error without returning a message.
   * @param error The error to log
   * @param context Additional context information
   */
  logError(error: any, context = 'unknown'): void {
    this.logger.error(
      `Error in ${context}: ${this.getSanitizedErrorMessage(error)}`,
      this.getSanitizedStackTrace(error),
    );
  }

  /**
   * Gets a sanitized error message that doesn't contain sensitive information.
   * @param error The error to sanitize
   * @returns A sanitized error message
   */
  private getSanitizedErrorMessage(error: any): string {
    if (!error) {
      return 'Unknown error';
    }

    // If it's a string, sanitize it directly
    if (typeof error === 'string') {
      return this.sanitizeString(error);
    }

    // If it has a message property, sanitize that
    if (error.message) {
      return this.sanitizeString(error.message);
    }

    // Otherwise, convert to string and sanitize
    return this.sanitizeString(String(error));
  }

  /**
   * Gets a sanitized stack trace that doesn't contain sensitive information.
   * @param error The error to get the stack trace from
   * @returns A sanitized stack trace or null if none exists
   */
  private getSanitizedStackTrace(error: any): string | null {
    if (!error || !error.stack) {
      return null;
    }

    return this.sanitizeString(error.stack);
  }

  /**
   * Sanitizes a string by removing potentially sensitive information.
   * @param str The string to sanitize
   * @returns A sanitized string
   */
  private sanitizeString(str: string): string {
    // Remove potential sensitive information like file paths, database connection strings, etc.
    // This is a simple example - in a real application, you might want to use more sophisticated
    // techniques like regular expressions to identify and remove sensitive patterns.
    return str
      .replace(/\/Users\/[^\/]+/g, '/Users/***')
      .replace(/password=([^&]+)/g, 'password=***')
      .replace(/apiKey=([^&]+)/g, 'apiKey=***')
      .replace(/token=([^&]+)/g, 'token=***')
      .replace(/secret=([^&]+)/g, 'secret=***');
  }
}

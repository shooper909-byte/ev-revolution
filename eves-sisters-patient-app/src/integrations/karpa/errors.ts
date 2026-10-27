export class IntegrationError extends Error {
  constructor(
    message: string,
    readonly code: 'not-configured' | 'not-authorized' | 'network' | 'validation' | 'not-found' | 'invalid-credentials',
  ) {
    super(message);
    this.name = 'IntegrationError';
  }
}

export class IntegrationNotConfiguredError extends IntegrationError {
  constructor(feature: string) {
    super(
      `${feature} is not connected. Karpa Health integration has not been authorized or documented yet, so this action is unavailable.`,
      'not-configured',
    );
    this.name = 'IntegrationNotConfiguredError';
  }
}

/** User-safe message for any error; never surfaces internal details. */
export function toUserMessage(error: unknown): string {
  if (error instanceof IntegrationError) {
    switch (error.code) {
      case 'invalid-credentials':
        return 'That email and password combination didn’t match. Please try again.';
      case 'network':
        return 'We couldn’t reach Eve’s Sisters right now. Please check your connection and try again.';
      case 'not-configured':
        return 'This feature isn’t connected yet in this preview.';
      case 'not-authorized':
        return 'Your session has ended. Please sign in again.';
      case 'not-found':
        return 'We couldn’t find that item.';
      case 'validation':
        return error.message;
    }
  }
  return 'Something went wrong. Please try again.';
}

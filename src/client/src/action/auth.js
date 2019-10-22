export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';

export function login(authenticated, currentUser) {
    return { type: LOG_IN, authenticated, currentUser};
  }
/**
 * Regular expression pattern for validating usernames.
 * The username must start with a letter, followed by 2 to 19 alphanumeric characters, dots, underscores, or hyphens.
 */
export const VALID_USERNAME_REGEX = /^(?:[A-Za-z]{1,1})(?:[A-Za-z0-9._-]{2,19})/;

/**
 * Regular expression pattern for validating passwords.
 * The password must contain at least one lowercase letter, one uppercase letter, one digit, one special character,
 * and be between 8 and 20 characters long.
 */
export const VALID_PASSWORD_REGEX = /^(?=.[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\w !#$%&()*+,.:;<=>?@\|-])(?=.{8,20})/;

/**
 * Regular expression pattern for validating email addresses.
 * The email address must follow the standard format of username@domain.extension.
 */
export const VALID_EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;

/**
 * Regular expression pattern for validating numbers.
 * The number must contain at least one digit and can be 1 or 2 characters long.
 */
export const VALID_NUMBERS_REGEX = /^(?=.*[0-9])(?=.{1,2})/;

/**
 * Regular expression pattern for validating URLs.
 * The URL must follow the standard format and can contain alphanumeric characters, dots, hyphens, and special characters.
 */
export const VALID_URL_REGEX = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/;

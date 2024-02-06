export const VALID_USERNAME_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[._-])(?=.{5,20})/;

export const VALID_LETTERS_REGEX = /^(?=.*[a-z\s])(?=.*[A-Z\s])(?=.{2,40})/;

export const VALID_PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\w !#$%&()*+,.:;<=>?@\|-])(?=.{8,20})/;

export const VALID_EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;

export const VALID_NUMBERS_REGEX = /^(?=.*[0-9])(?=.{1,2})/;

export const VALID_URL_REGEX = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/;

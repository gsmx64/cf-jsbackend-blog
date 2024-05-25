import * as yup from "yup";

import {
  //VALID_USERNAME_REGEX,
  VALID_LETTERS_REGEX,
  //VALID_PASSWORD_REGEX,
  VALID_EMAIL_REGEX,
  //VALID_URL_REGEX
} from "../../../../../constants/validationsRegex";


const validationSchema = yup
  .object({
    /*username: yup.string()
      .test(
        'len',
        'The username must be between 3 and 20 characters.',
        (val: any) =>
        val &&
        val.toString().length >= 3 &&
        val.toString().length <= 20
      )
      .required('This field is required!')
      .matches(
        VALID_USERNAME_REGEX,
        'Cannot contain spaces and only these special characters: . _ -'
      ),*/
    /*password: yup.string()
      .test(
        'len',
        'The password must be between 8 and 40 characters.',
        (val: any) =>
        val &&
        val.toString().length >= 8 &&
        val.toString().length <= 40
      )
      .required('This field is required!')
      .matches(
        VALID_PASSWORD_REGEX,
        'Password must be at least 8 characters, at least one letter uppercase, \
        at least one letter lowercase, at least one number and at least one espace or \
        special character like: !#$%&()*+,.:;<=>?@\|-',
      ),
    repeat_password: yup
      .string()
      .oneOf(
        [yup.ref('password'), ''], 
        'Passwords must match'
      )
      .required('Passwords must match'),*/
    firstName: yup.string()
      .test(
        'len',
        'The firstname must be between 2 and 40 characters.',
        (val: any) =>
        val &&
        val.toString().length >= 2 &&
        val.toString().length <= 40
      )
      .required('This field is required!')
      .matches(
        VALID_LETTERS_REGEX,
        'Cannot contain special characters or spaces, and the first letter must be uppercase.'
      ),
    lastName: yup.string()
      .test(
        'len',
        'The lastname must be between 2 and 40 characters.',
        (val: any) =>
        val &&
        val.toString().length >= 2 &&
        val.toString().length <= 40
      )
      .required('This field is required!')
      .matches(
        VALID_LETTERS_REGEX,
        'Cannot contain special characters or spaces, and the first letter must be uppercase.'
      ),
    email: yup.string()
      .test(
        'len',
        'The email must be between 7 and 254 characters.',
        (val: any) =>
        val &&
        val.toString().length >= 7 &&
        val.toString().length <= 254
      )
      .email('This is not a valid email.')
      .required('This field is required!')
      .matches(
        VALID_EMAIL_REGEX,
        'The value must be a valid email.'
      ),
    age: yup.number()
      .test(
        'len',
        'The age must be between 13 and 99.',
        (val: any) =>
        val &&
        val.toString().length >= 1 &&
        val.toString().length <= 2 &&
        val >= 13
      )
      .required('This field is required!'),
    city: yup.string()
      .test(
        'len',
        'The city must be between 2 and 40 characters.',
        (val: any) =>
        val &&
        val.toString().length >= 2 &&
        val.toString().length <= 40
      )
      .required('This field is required!')
      .matches(
        VALID_LETTERS_REGEX,
        'Cannot contain special characters or spaces, and the first letter must be uppercase.'
      ),
    country: yup.string()
      .test(
        'len',
        'The country must be between 2 and 40 characters.',
        (val: any) =>
        val &&
        val.toString().length >= 2 &&
        val.toString().length <= 40
      )
      .required('This field is required!')
      .matches(
        VALID_LETTERS_REGEX,
        'Cannot contain special characters or spaces, and the first letter must be uppercase.'
      ),
    /*avatar: yup
      .string()
      .matches(
        VALID_URL_REGEX,
        { message: 'Only url direct link allowed.', excludeEmptyString: true }
      ),*/
  })
  .required();

export default validationSchema;
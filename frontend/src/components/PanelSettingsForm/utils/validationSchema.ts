import * as yup from "yup";

import {
  VALID_LETTERS_NUMBERS_REGEX,
  VALID_URL_REGEX
} from "../../../constants/validationsRegex";


const validationSchema = yup
  .object({
    brand: yup.string()
    .test(
      'len',
      'The title must be between 3 and 254 characters.',
      (val: any) =>
      val &&
      val.toString().length >= 3 &&
      val.toString().length <= 254
    )
    .required('This field is required!')
    .matches(
      VALID_LETTERS_NUMBERS_REGEX,
      'Title can contain spaces, letters, numbers and only these special characters: % & ( ) * + , . : ? @ _ -',
    ),
    activation: yup.string()
      .required('This field is required!'),
    terms: yup.string()
    .test(
      'len',
      'The title must be more than 3 characters.',
      (val: any) =>
      val &&
      val.toString().length >= 3
    )
    .required('This field is required!')
    .matches(
      VALID_LETTERS_NUMBERS_REGEX,
      'Terms can contain spaces, letters, numbers and only these special characters: % & ( ) * + , . : ? @ _ -',
    ),
    facebook: yup.string()
    .matches(
      VALID_URL_REGEX,
      { message: 'Only url direct link allowed.', excludeEmptyString: true }
    ),
    instagram: yup.string()
    .matches(
      VALID_URL_REGEX,
      { message: 'Only url direct link allowed.', excludeEmptyString: true }
    ),
    twitterx: yup.string()
    .matches(
      VALID_URL_REGEX,
      { message: 'Only url direct link allowed.', excludeEmptyString: true }
    ),
    linkedin: yup.string()
    .matches(
      VALID_URL_REGEX,
      { message: 'Only url direct link allowed.', excludeEmptyString: true }
    ),
    youtube: yup.string()
    .matches(
      VALID_URL_REGEX,
      { message: 'Only url direct link allowed.', excludeEmptyString: true }
    ),
    tiktok: yup.string()
    .matches(
      VALID_URL_REGEX,
      { message: 'Only url direct link allowed.', excludeEmptyString: true }
    ),
  })
  .required();

export default validationSchema;
import * as yup from "yup";

import {
  VALID_LETTERS_NUMBERS_REGEX,
  VALID_URL_REGEX
} from "../../../constants/validationsRegex";


const validationSchema = yup
  .object({
    title: yup.string()
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
      description: yup.string()
      .test(
        'len',
        'The description must be between 3 and 254 characters.',
        (val: any) =>
        val &&
        val.toString().length >= 3 &&
        val.toString().length <= 738
      )
      .required('This field is required!')
      .matches(
        VALID_LETTERS_NUMBERS_REGEX,
        'Description can contain spaces, letters, numbers and only these special characters: % & ( ) * + , . : ? @ _ -',
      ),
      image: yup.string()
      .matches(
        VALID_URL_REGEX,
        { message: 'Only url direct link allowed.', excludeEmptyString: false }
      ),
      content: yup.string()
      .required('This field is required!'),
      category: yup.string()
      .required('This field is required!'),
      status: yup.string()
      .required('This field is required!'),
  })
  .required();

export default validationSchema;
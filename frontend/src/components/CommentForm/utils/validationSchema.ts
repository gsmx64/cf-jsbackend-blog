import * as yup from "yup";

import { VALID_LETTERS_NUMBERS_REGEX } from "../../../constants/validationsRegex";


const validationSchema = yup
  .object({
      message: yup.string()
      .test(
        'len',
        'The message must be between 3 and 254 characters.',
        (val: any) =>
        val &&
        val.toString().length >= 3 &&
        val.toString().length <= 254
      )
      .required('This field is required!')
      .matches(
        VALID_LETTERS_NUMBERS_REGEX,
        'Message can contain spaces, letters, numbers and only these special characters: % & ( ) * + , . : ? @ _ -',
      ),
  })
  .required();

export default validationSchema;
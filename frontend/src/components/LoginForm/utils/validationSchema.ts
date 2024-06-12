import * as yup from "yup";

import {
  VALID_USERNAME_REGEX,
  VALID_PASSWORD_REGEX
} from "../../../constants/validationsRegex";


const validationSchema = yup
  .object({
    username: yup.string()
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
      ),
    password: yup.string()
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
  })
  .required();

export default validationSchema;
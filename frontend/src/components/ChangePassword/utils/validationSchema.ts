import * as yup from "yup";

import { VALID_PASSWORD_REGEX } from "../../../constants/validationsRegex";


const validationSchema = yup
  .object({
    current_password: yup.string()
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
    password: yup.string()
    .test(
      'len',
      'The password must be between 8 and 40 characters.',
      (val: any) =>
      val &&
      val.toString().length >= 8 &&
      val.toString().length <= 40
    )
    .notOneOf(
      [yup.ref('current_password'), null],
      'Passwords must be different with the last password!'
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
    .required('Passwords must match'),
  })
  .required();

export default validationSchema;
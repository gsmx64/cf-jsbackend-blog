import * as yup from "yup";

import { VALID_URL_REGEX } from "../../../constants/validationsRegex";


const validationSchema = yup
  .object({
    avatar: yup
    .string()
    .matches(
      VALID_URL_REGEX,
      { message: 'Only url direct link allowed.', excludeEmptyString: true }
    ),
  })
  .required();

export default validationSchema;
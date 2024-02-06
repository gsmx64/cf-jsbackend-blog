import * as Yup from 'yup';
import { VALID_USERNAME_REGEX, VALID_LETTERS_REGEX, VALID_PASSWORD_REGEX,
    VALID_EMAIL_REGEX, VALID_NUMBERS_REGEX, VALID_URL_REGEX } from '../../../constants/validationsRegex';

const validationSchema = () => (
    Yup.lazy(() =>          
        Yup.object().shape({
            username: Yup.string()
                .min(5, 'Must be at least 5 characters')
                .max(20, 'Must be less  than 20 characters')
                .required('Username is required')
                .matches(
                    VALID_USERNAME_REGEX,
                    'Cannot contain spaces and only these special characters: . _ -'
            ),
            password: Yup.string()
                .min(8, 'Must be at least 8 characters')
                .max(20, 'Must be less  than 20 characters')
                .required('Password is required')
                .matches(
                    VALID_PASSWORD_REGEX,
                    'Password must be at least 8 characters, at least one letter uppercase, \
                    at least one letter lowercase, at least one number and at least one espace or \
                    special character like: !#$%&()*+,.:;<=>?@\|-',
            ),
            repeat_password: Yup.string()
                .oneOf(
                    [Yup.ref('password'), ''], 
                    'Passwords must match'
                )
                .required('Passwords must match'),
            avatar: Yup.string()
                .min(6, 'Must be at least 6 characters')
                .max(255, 'Must be less  than 255 characters')
                .matches(
                    VALID_URL_REGEX,
                    'Only url direct link allowed'
            ),
            name: Yup.string()
                .min(8, 'Must be at least 8 characters')
                .max(20, 'Must be less  than 20 characters')
                .required('Name is required')
                .matches(
                    VALID_LETTERS_REGEX,
                    'Cannot contain special characters or spaces'
            ),
            surname: Yup.string()
                .min(2, 'Must be at least 2 characters')
                .max(20, 'Must be less  than 20 characters')
                .matches(
                    VALID_LETTERS_REGEX,
                    'Cannot contain special characters or spaces'
            ),
            email: Yup.string()
                .min(8, 'Must be at least 8 characters')
                .max(20, 'Must be less  than 20 characters')
                .required('Email is required')
                .matches(
                    VALID_EMAIL_REGEX,
                    'Cannot contain special characters or spaces'
            ),
            age: Yup.string()
                .min(1, 'Must be at least 1 characters')
                .max(2, 'Must be less than 2 characters')
                .matches(
                    VALID_NUMBERS_REGEX,
                    'Only numbers'
            ),
            city: Yup.string()
                .min(2, 'Must be at least 2 characters')
                .max(40, 'Must be less  than 40 characters')
                .matches(
                    VALID_LETTERS_REGEX,
                    'Cannot contain special characters or spaces'
            ),
            country: Yup.string()
                .min(2, 'Must be at least 2 characters')
                .max(40, 'Must be less than 40 characters')
                .matches(
                    VALID_LETTERS_REGEX,
                    'Cannot contain special characters or spaces'
            ),
        })
    )
)

export default validationSchema;
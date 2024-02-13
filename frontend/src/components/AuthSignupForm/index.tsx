import React from "react";
import { Formik, FormikHelpers } from "formik";

import TFormValues from "./interfaces/tFormValues";
import ValidationSchema from "./utils/validationSchema";
import initialFormValues from "./utils/initialValues";


const AuthSignupForm = (): React.JSX.Element => {
  return (
    <div>
      <h1>Sign up form:</h1>
      <Formik
        initialValues={initialFormValues}
        validationSchema={ValidationSchema()}
        onSubmit={(
            values: TFormValues,
            { setSubmitting }: FormikHelpers<TFormValues>
          ) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          resetForm,                    
          isSubmitting
        }) => (
          <form onSubmit={handleSubmit}>
            <label>
              Username:
              <input
                type="text"
                name="username"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
              />
              {errors.username && touched.username && errors.username}
            </label>
            <label>
              Password:
              <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password && errors.password}
            </label>
            <label>
              Repeat Password:
              <input
                type="password"
                name="repeat_password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.repeat_password}
              />
              {errors.repeat_password && touched.repeat_password && errors.repeat_password}
            </label>
            <label>
              Avatar:
              <input
                type="text"
                name="avatar"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.avatar}
              />
              {errors.avatar && touched.avatar && errors.avatar}
            </label>
            <label>
              Name:
              <input
                type="text"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              {errors.name && touched.name && errors.name}
            </label>
            <label>
              Surname:
              <input
                type="text"
                name="surname"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.surname}
              />
              {errors.surname && touched.surname && errors.surname}
            </label>
            <label>
              Email:
              <input
                type="text"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
            </label>
            <label>
              Age:
              <input
                type="text"
                name="age"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.age}
              />
              {errors.age && touched.age && errors.age}
            </label>
            <label>
              City:
              <input
                type="text"
                name="city"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.city}
              />
              {errors.city && touched.city && errors.city}
            </label>
            <label>
              Country:
              <input
                type="text"
                name="country"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.country}
              />
              {errors.country && touched.country && errors.country}
            </label>
            <div>
              <button
                type="reset"
                onClick={() => resetForm()}
              >
                Clear
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AuthSignupForm;
import React from "react";
import { Formik, FormikHelpers } from 'formik';
import TMyInfoValues from './interfaces/tMyInfoValues';
import ValidationSchema from './utils/validationSchema';
import initialFormValues from "./utils/myInfoValues";

import styles from './MyInfo.module.css';
//import { useEffect } from 'react';

//const USER_DATA = 'userData';

const MyInfo = (): React.JSX.Element => {
    /*const { handleSubmit, register, setValue } = useForm();

    useEffect(() => {
        try {
            console.log(1010)
            const userData = JSON.parse(localStorage.getItem(USER_DATA)) || {};

            setValue('name', userData?.name);
            setValue('age', userData?.age);
            setValue('email', userData?.email);
        } catch (error) {
            console.error(error);
        }
    }, [setValue]);

    const handleFormSubmit = (data: any) => {
        try {
            localStorage.setItem(USER_DATA, JSON.stringify(data));
            alert('Usuario actualizado');
        } catch (error) {
            alert('Ha ocurrido un error');
        }
    };*/

    return (
        <Formik
            initialValues={initialFormValues}
            validationSchema={ValidationSchema()}
            onSubmit={(
                    values: TMyInfoValues,
                    { setSubmitting }: FormikHelpers<TMyInfoValues>
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
                isSubmitting
            }) => (
                <form onSubmit={handleSubmit} className={styles.form}>
                    <label>
                        Username:
                        
                    </label>
                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            className={styles.input}
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
                            className={styles.input}
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
                        className={styles.input}
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
                            className={styles.input}
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
                        className={styles.input}
                        />
                        {errors.surname && touched.surname && errors.surname}
                    </label>
                    <label>
                        Email:
                        
                    </label>
                    <label>
                        Age:
                        <input
                        type="text"
                        name="age"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.age}
                        className={styles.input}
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
                            className={styles.input}
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
                        className={styles.input}
                        />
                        {errors.country && touched.country && errors.country}
                    </label>
                    <div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={styles.submitButton}
                        >
                            Save
                        </button>
                    </div>
                </form>
            )}
        </Formik>
    );
};

export default MyInfo;
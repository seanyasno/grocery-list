import { auth, firestore } from '@/config';
import { updateProfile } from '@firebase/auth';
import { doc, setDoc } from '@firebase/firestore';
import { useFormik } from 'formik';
import { isEmpty } from 'lodash';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';

type RegisterInfo = {
    fullName: string;
    city: string;
    street: string;
    houseNumber: number;
    entrance: string;
    phoneNumber: string;
    email: string;
    password: string;
};

type RegisterInfoErrors = {
    [key in keyof RegisterInfo]?: string;
};

export const useRegisterForm = () => {
    const [createUserWithEmailAndPassword] =
        useCreateUserWithEmailAndPassword(auth);

    return useFormik<RegisterInfo>({
        initialValues: {
            fullName: '',
            city: '',
            street: '',
            houseNumber: 0,
            entrance: '',
            phoneNumber: '',
            email: '',
            password: '',
        },
        onSubmit: async (values) => {
            try {
                const { user } = await createUserWithEmailAndPassword(
                    values.email,
                    values.password
                );
                await updateProfile(user, {
                    displayName: values.fullName,
                });
                delete values.password;
                await setDoc(doc(firestore, 'users', user.uid), {
                    ...values,
                    favoriteGroceries: [],
                });
            } catch (error) {
                console.error(error);
            }
        },
        validate: (values) => {
            const errors: Partial<RegisterInfoErrors> = {};
            const { fullName, city, email, password, phoneNumber, street } =
                values;

            if (isEmpty(fullName)) {
                errors.fullName = 'שדה ריק';
            }

            if (isEmpty(city)) {
                errors.city = 'שדה ריק';
            }

            if (isEmpty(email)) {
                errors.email = 'שדה ריק';
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
            ) {
                errors.email = 'כתובת אימייל אינה תקינה';
            }

            if (isEmpty(password)) {
                errors.password = 'שדה ריק';
            }

            if (isEmpty(phoneNumber)) {
                errors.phoneNumber = 'שדה ריק';
            } else if (
                !/^(?:(?:(\+?972|\(\+?972\)|\+?\(972\))(?:\s|\.|-)?([1-9]\d?))|(0[23489]{1})|(0[57]{1}[0-9]))(?:\s|\.|-)?([^0\D]{1}\d{2}(?:\s|\.|-)?\d{4})$/i.test(
                    phoneNumber
                )
            ) {
                errors.phoneNumber = 'מספר פלאפון לא תקין';
            }

            if (isEmpty(street)) {
                errors.street = 'שדה ריק';
            }

            return errors;
        },
    });
};

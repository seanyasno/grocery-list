import { auth } from '@/config';
import { useFormik } from 'formik';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';

type LoginInfo = {
    email: string;
    password: string;
};

export const useLoginForm = () => {
    const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

    return useFormik<LoginInfo>({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: ({ email, password }) =>
            signInWithEmailAndPassword(email, password),
        validate: ({ email, password }) => {
            const errors: Partial<LoginInfo> = {};

            if (!email) {
                errors.email = 'שדה ריק';
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
            ) {
                errors.email = 'כתובת אימייל אינה תקינה';
            }

            if (!password) {
                errors.password = 'שדה ריק';
            }

            return errors;
        },
    });
};

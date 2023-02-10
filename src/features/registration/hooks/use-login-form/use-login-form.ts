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
                errors.email = 'Required';
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
            ) {
                errors.email = 'Invalid email address';
            }

            if (!password) {
                errors.password = 'Required';
            }

            return errors;
        },
    });
};

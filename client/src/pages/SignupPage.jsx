import * as yup from 'yup';
import { useState } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { Box, Button, Stack, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Link, useNavigate } from 'react-router-dom';

import { userSignUp } from '../api/user.api';

const SignupPage = () => {
    const navigate = useNavigate();

    const [isRequest, setIsRequest] = useState(false);

    const form = useFormik({
        initialValues: {
            username: '',
            password: '',
            confirmPassword: '',
        },

        validationSchema: yup.object({
            username: yup.string().required('Username is required').min(6).max(20),
            password: yup.string().required('Password is required').min(6),
            confirmPassword: yup
                .string()
                .required('Password is required')
                .min(6)
                .oneOf([yup.ref('password')], 'Confirm Password not match'),
        }),

        onSubmit: (values) => onSignUp(values),
    });

    const onSignUp = async ({ username, password }) => {
        if (isRequest) return;
        setIsRequest(true);

        const { response, err } = await userSignUp({
            username,
            password,
        });

        setIsRequest(false);

        if (response) {
            toast.success('Signup success');
            navigate('/signin');
        }

        if (err) toast.error(err.message);
    };

    return (
        <Box component="form" noValidate onSubmit={form.handleSubmit}>
            <Stack spacing={3}>
                <TextField
                    fullWidth
                    placeholder="Username"
                    name="username"
                    value={form.values.username}
                    onChange={form.handleChange}
                    error={form.touched.username && form.errors.username !== undefined}
                    helperText={form.touched.username && form.errors.username}
                />

                <TextField
                    fullWidth
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={form.values.password}
                    onChange={form.handleChange}
                    error={form.touched.password && form.errors.password !== undefined}
                    helperText={form.touched.password && form.errors.password}
                />

                <TextField
                    fullWidth
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    value={form.values.confirmPassword}
                    onChange={form.handleChange}
                    error={form.touched.confirmPassword && form.errors.confirmPassword !== undefined}
                    helperText={form.touched.confirmPassword && form.errors.confirmPassword}
                />

                <LoadingButton type="submit" size="large" variant="contained" loading={isRequest} color="success">
                    sign up
                </LoadingButton>

                <Button component={Link} to="/signin" size="small">
                    sign in
                </Button>
            </Stack>
        </Box>
    );
};

export default SignupPage;

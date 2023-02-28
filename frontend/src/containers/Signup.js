import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../actions/auth';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Signup = ({ signup, isAuthenticated }) => {

    const authInfo = useSelector(state => state.auth)
    const [accountCreated, setAccountCreated] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: 'DOE',
        email: '',
        password: '',
        re_password: ''
    });

    const { first_name, last_name, email, password, re_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        if (password === re_password) {
            signup(first_name, last_name, email, password, re_password);
            // setAccountCreated(true);
        }
    };

    const getSignUpMessage = () => {
        if (authInfo === null) return;
        if (authInfo.signUpSuccess === null) return;
        if (authInfo.signUpSuccess === true) {
            return <div class="alert alert-success" role="alert">
                Success! To continue, please click on the activation link we sent to your email.
            </div>
        } else {
            if (authInfo.hasOwnProperty('email') && authInfo.hasOwnProperty('first_name')) {
                return <div class="alert alert-danger">Email and username are already in use.</div>
            } else if (authInfo.hasOwnProperty('email')) {
                return <div class="alert alert-danger">Email is already in use.</div>
            } else {
                return (
                    <div class="alert alert-danger">
                        Username is already in use.
                        Note: if you encountered this error while signing up with Google, your Google account is not eligible.
                    </div>
                )
            }
        }
    }

    const continueWithGoogle = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=${process.env.REACT_APP_API_URL}/google`)
            window.location.replace(res.data.authorization_url);
        } catch (err) {

        }
    };

    if (isAuthenticated) {
        return <Redirect to='/' />
    }
    if (accountCreated) {
        return <Redirect to='/login' />
    }

    return (
        <div className='container mt-5'>
            <h1>Sign Up</h1>
            <p>Create your Account<br/>
            For your safety, use a password that you do not use for other sites.</p>
            {
                getSignUpMessage()
            }
            {
                password !== re_password ?
                <div class="alert alert-danger">Passwords do not match.</div> : ""
            }
            <form onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Username*'
                        name='first_name'
                        value={first_name}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='email'
                        placeholder='Email*'
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Password*'
                        name='password'
                        value={password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Confirm Password*'
                        name='re_password'
                        value={re_password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                    />
                </div>
            <div style={{display:"inline"}}>
                <button className='btn btn-primary' type='submit'>Register</button>
            </div>
            </form>
            
            {/* <button className='btn btn-primary mt-3' onClick={continueWithFacebook}>
                Continue With Facebook
            </button> */}
            <p className='mt-3'>
                Already have an account? <Link to='/login'>Sign In</Link>
            </p>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { signup })(Signup);

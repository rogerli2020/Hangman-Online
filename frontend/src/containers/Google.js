import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { googleAuthenticate } from '../actions/auth';
import queryString from 'query-string';

const Google = ({ googleAuthenticate }) => {
    let location = useLocation();

    useEffect(() => {
        const values = queryString.parse(location.search);
        const state = values.state ? values.state : null;
        const code = values.code ? values.code : null;

        console.log('State: ' + state);
        console.log('Code: ' + code);

        if (state && code) {
            googleAuthenticate(state, code);
        }
    }, [location]);

    return (
        <div className='container'>
            <div class='jumbotron mt-5'>
                <h1 class='display-4'>Welcome to Hangman Online!</h1>
                <p class='lead'>You're now signed in through Google. Click on the "START PLAYING" button to start playing!</p>
                <hr class='my-4' />
                <Link class='btn btn-primary btn-lg' to='/' role='button'>START PLAYING</Link>
            </div>
        </div>
    );
};

export default connect(null, { googleAuthenticate })(Google);

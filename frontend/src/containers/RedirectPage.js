import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


// mainMsg: the main message to display.
// variant: success/error/warning.
// linkName: name of new link to jump to.
// link: actual link to the redirected page.

const RedirectPage = (props) => (
    <div className='container'>
        <div class='jumbotron mt-5'>
            <h2>{props.mainMsg}</h2>
            <h2>Account created successfully!</h2>
            <hr class='my-4' />
            <p>You will be redirected to your {props.linkName} or you can&nbsp;
            <Link to={props.linkName}>click here directly</Link>
            .</p>
        </div>
    </div>
);

export default RedirectPage;

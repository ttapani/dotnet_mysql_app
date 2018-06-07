import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import * as styles from './register.css';

interface ILoginValidationError {
    username?:string;
    password?:string;
}

// Client side validation
function validate(values:any) {
    let errors:ILoginValidationError = {};
    let hasErrors = false;
    if (!values.username || values.username.trim() === '') {
        errors.username = 'Enter username';
        hasErrors = true;
    }
    if (!values.password || values.password.trim() === '') {
        errors.password = 'Enter password';
        hasErrors = true;
    }
    return hasErrors && errors;
}


export class Register extends React.Component<RouteComponentProps<{}>, {}> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event: any) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {
            "email": formData.get("email"),
            "password": formData.get("password"),
            "firstName": formData.get("firstName"),
            "lastName": formData.get("lastName"),
        };
        const headers = new Headers({'Content-type': 'application/json'});

        fetch('api/accounts', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
        });
    }

    public render() {
        return <div className="col-md-6 col-md-offset-3">
            <h2>Register</h2>
            <div className={styles.registercontainer}>
            <form name="registerForm" onSubmit={this.handleSubmit} className={styles.registerform}>
                <label htmlFor="email">Enter email</label>
                <input id="email" name="email" type="text" required/>
                <label htmlFor="password">Enter password</label>
                <input id="password" name="password" type="password" required/>
                <label htmlFor="firstName">Enter first name</label>
                <input id="firstName" name="firstName" type="text" required/>
                <label htmlFor="lastName">Enter last name</label>
                <input id="lastName" name="lastName" type="text" required/>
                <button className={styles.registerbutton}>Register!</button>
            </form>
            </div>
        </div>;
    }
}

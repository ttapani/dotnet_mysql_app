import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import * as styles from './register.css';

export class Register extends React.Component<RouteComponentProps<{}>, {}> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event: any) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {
            email: formData.get('email'),
            password: formData.get('password'),
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
        };
        const headers = new Headers({'Content-type': 'application/json'});

        fetch('api/accounts', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
        });
    }

    public render() {
        return (
            <div className="col-md-6 col-md-offset-3">
            <h2>Register</h2>
            <div className={styles.registercontainer}>
            <form name="registerForm" onSubmit={this.handleSubmit} className={styles.registerform}>
                <label htmlFor="email">Enter email</label>
                <input id="email" name="email" type="text" required={true}/>
                <label htmlFor="password">Enter password</label>
                <input id="password" name="password" type="password" required={true}/>
                <label htmlFor="firstName">Enter first name</label>
                <input id="firstName" name="firstName" type="text" required={true}/>
                <label htmlFor="lastName">Enter last name</label>
                <input id="lastName" name="lastName" type="text" required={true}/>
                <button className={styles.registerbutton}>Register!</button>
            </form>
            </div>
        </div>
        );
    }
}

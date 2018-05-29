import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import styles from './login.css';

export class Login extends React.Component<RouteComponentProps<{}>, {}> {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event: any) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {
            "username": formData.get("username"),
            "password": formData.get("password"),
        };
        const headers = new Headers({'Content-type': 'application/json'});

        fetch('api/auth', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
        });
    }

    public render() {
        return <div className="col-md-6 col-md-offset-3">
        <h2>Login</h2>
            <form name="loginForm" onSubmit={this.handleSubmit} className={styles.signinorm}>
                <div className={styles.signincontainer}>
                    <label htmlFor="username">Enter email</label>
                    <input id="username" name="username" type="text" required/>
                    <label htmlFor="password">Enter password</label>
                    <input id="password" name="password" type="password" required/>
                    <button className={styles.signinbutton}>Login!</button>
                </div>
            </form>
        </div>;
    }
}

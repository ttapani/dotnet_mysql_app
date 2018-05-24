import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export class Login extends React.Component<RouteComponentProps<{}>, {}> {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event: any) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {
            "email": formData.get("email"),
            "password": formData.get("password"),
        };
        const headers = new Headers({'Content-type': 'application/json'});

        fetch('api/auth/login', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
        });
    }

    public render() {
        return <div>
            <h1>Login</h1>

            <p>Here should be a login form.</p>
            <form name="loginForm" onSubmit={this.handleSubmit}>
                <label htmlFor="email">Enter email</label>
                <input id="email" name="email" type="text" />
                <label htmlFor="password">Enter password</label>
                <input id="password" name="password" type="password" />
                <button>Login!</button>
            </form>
        </div>;
    }
}

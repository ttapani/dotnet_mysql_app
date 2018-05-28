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

            <p>Here should be a login form.</p>
            <form name="loginForm" onSubmit={this.handleSubmit}>
                <label htmlFor="username">Enter email</label>
                <input id="username" name="username" type="text" />
                <label htmlFor="password">Enter password</label>
                <input id="password" name="password" type="password" />
                <button>Login!</button>
            </form>
        </div>;
    }
}

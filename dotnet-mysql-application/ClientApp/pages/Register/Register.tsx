import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export class Register extends React.Component<RouteComponentProps<{}>, {}> {
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
        return <div>
            <h1>Register</h1>

            <p>Here should be a register user form.</p>
            <form name="registerForm" onSubmit={this.handleSubmit}>
                <label htmlFor="email">Enter email</label>
                <input id="email" name="email" type="text" />
                <label htmlFor="password">Enter password</label>
                <input id="password" name="password" type="password" />
                <label htmlFor="firstName">Enter first name</label>
                <input id="firstName" name="firstName" type="text" />
                <label htmlFor="lastName">Enter last name</label>
                <input id="lastName" name="lastName" type="text" />
                <button>Register!</button>
            </form>
        </div>;
    }
}

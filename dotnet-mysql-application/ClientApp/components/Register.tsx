import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export class Register extends React.Component<RouteComponentProps<{}>, {}> {
    constructor() {
        super();
    }

    public render() {
        return <div>
            <h1>Register</h1>

            <p>Here should be a register user form.</p>

        </div>;
    }
}

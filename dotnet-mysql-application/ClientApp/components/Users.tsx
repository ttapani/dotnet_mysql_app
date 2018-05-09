import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export class Users extends React.Component<RouteComponentProps<{}>, {}> {
    constructor() {
        super();
    }

    public render() {
        return <div>
            <h1>Users</h1>

            <p>This is a simple example of a React component.</p>

        </div>;
    }
}

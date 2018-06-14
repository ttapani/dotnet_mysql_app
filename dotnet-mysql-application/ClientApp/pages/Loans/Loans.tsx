import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export class Loans extends React.Component<RouteComponentProps<{}>, {}> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
        <div>
            <h1>Loans</h1>

            <p>This is a simple example of a React component.</p>

        </div>
        );
    }
}

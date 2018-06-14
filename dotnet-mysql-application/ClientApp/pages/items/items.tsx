import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export default class Items extends React.Component<RouteComponentProps<{}>, {}> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
        <div>
            <h1>Items</h1>

            <p>This is a simple example of a React component.</p>

        </div>
        );
    }
}

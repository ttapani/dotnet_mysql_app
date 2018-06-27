import { Layout } from './layout';
import * as React from 'react';
import * as RoutesModule from './router/routes';
const routes = RoutesModule.routes;

interface AppProps {

}

class App extends React.Component<AppProps> {
    constructor(props: AppProps) {
        super(props);
    }

    public render(): React.ReactNode {
        return (
        <Layout>
            {routes}
        </Layout>
        );
    }
}

export default App;

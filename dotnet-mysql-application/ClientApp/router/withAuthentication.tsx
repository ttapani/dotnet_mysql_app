import * as React from 'react';
import { Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';
import { LoginState } from '../store/user/types';

interface WithAuthenticationProps {
}

type AllProps = LoginState & WithAuthenticationProps & RouteProps;

const withAuthentication = <P extends object>(Component: React.ComponentType<P>) =>
    class WithAuthentication extends React.Component<P & AllProps> {
        constructor(props: P & AllProps) {
            super(props);
            console.log(this.props);
        }

        public render() {
            const { loggedIn, ...rest } = this.props as AllProps;
            return (
                loggedIn === true
                ? <Component {...rest} />
                : <Redirect to={{pathname: '/login', state: { from: this.props.location }}} />
            );
        }
    };

export default withAuthentication;

import * as React from 'react';
import { ApplicationState } from '../../store';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { LoginState } from '../../store/user/types';

export interface HomeProps extends RouteComponentProps<any>, React.Props<any> {
    userName: string;
}

type AllProps = HomeProps & LoginState;

class Home extends React.Component<AllProps> {
    public static defaultProps: Partial<AllProps> = {
        userName: 'guest',
    };

    public render() {
        return (
        <div>
            <h1>Hello, {this.props.userName}</h1>
            <p>Welcome to your new single-page application.</p>
        </div>
        );
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    userName: state.login.userName,
});

export default withRouter(connect(
    mapStateToProps,
    null
)(Home));

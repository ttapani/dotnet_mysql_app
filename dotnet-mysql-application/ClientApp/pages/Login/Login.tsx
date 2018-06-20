import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import * as styles from './login.css';
import { signInUser } from '../../store/user/actions';
import { connect } from 'react-redux';
import { LoginState } from '../../store/user/types';
import { ConnectedReduxProps, ApplicationState } from '../../store';

export interface LoginPageProps extends ConnectedReduxProps<LoginState>, RouteComponentProps<any>, React.Props<any> {
}

type AllProps = LoginPageProps & LoginState;

class Login extends React.Component<AllProps> {
    constructor(props: AllProps) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event: any): void {
        event.preventDefault();
        const formData = new FormData(event.target);
        const credentials = {
            username: formData.get('username'),
            password: formData.get('password'),
        };
        this.props.dispatch(signInUser(credentials));
    }

    public render(): React.ReactNode {
        return (
        <div className="col-md-6 col-md-offset-3">
        <h2>Login</h2>
        <div className={styles.signincontainer}>
            <form name="loginForm" onSubmit={this.handleSubmit}>
            <fieldset disabled={this.props.isLoggingIn ? true : false}>
                    <label htmlFor="username">Enter email</label>
                    <input className={styles.textinput} name="username" type="text" required={true}/>
                    <label htmlFor="password">Enter password</label>
                    <input className={styles.passwordinput} name="password" type="password" required={true}/>
                    <button className={styles.signinbutton}>Login!</button>
            </fieldset>
            </form>
            </div>
        </div>
        );
    }
}

export default withRouter(connect(
    (state: ApplicationState) => state.login,
    null
)(Login));

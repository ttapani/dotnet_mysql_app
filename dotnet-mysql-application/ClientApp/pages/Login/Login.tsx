import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RouteComponentProps } from 'react-router';
import * as styles from './login.css';
import { signInUser, signInUserSuccess, signInUserFailure, userFromToken } from '../../store/user/actions';
import { connect, Dispatch } from 'react-redux';
import { LoginState, UserSignInActions } from '../../store/user/types';
import { ConnectedReduxProps, ApplicationState } from '../../store';
import { AnyAction } from 'redux';

interface ILoginValidationError {
    username?:string;
    password?:string;
}

export interface LoginPageProps extends ConnectedReduxProps<LoginState>, RouteComponentProps<any>, React.Props<any> {
}

interface State {
}

type AllProps = LoginPageProps & LoginState; 

// Client side validation
function validate(values:any) {
    let errors:ILoginValidationError = {};
    let hasErrors = false;
    if (!values.username || values.username.trim() === '') {
        errors.username = 'Enter username';
        hasErrors = true;
    }
    if (!values.password || values.password.trim() === '') {
        errors.password = 'Enter password';
        hasErrors = true;
    }
    return hasErrors && errors;
}

class Login extends React.Component<any, any> {
    constructor(props: AllProps) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
        }
    }

    handleSubmit(event: any): void {
        event.preventDefault();
        const formData = new FormData(event.target);
        const credentials = {
            "username": formData.get("username"),
            "password": formData.get("password"),
        };
        this.props.dispatch(signInUser(credentials));
    }

    public render(): React.ReactNode {
        return <div className="col-md-6 col-md-offset-3">
        <h2>Login</h2>
        <div className={styles.signincontainer}>
            <form name="loginForm" onSubmit={this.handleSubmit} className={styles.signinform}>
            <fieldset disabled={this.props.isLoggingIn ? true : false }>
                    <label htmlFor="username">Enter email</label>
                    <input id="username" name="username" type="text" required/>
                    <label htmlFor="password">Enter password</label>
                    <input id="password" name="password" type="password" required/>
                    <button className={styles.signinbutton}>Login!</button>
            </fieldset>
            </form>
            </div>
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => state.login,
)(Login);

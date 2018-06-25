import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import * as styles from './navMenu.css';
import { connect, Dispatch } from 'react-redux';
import { ApplicationState } from '../store';
import { LoginState } from '../store/user/types';
import { logOutUser } from '../store/user/actions';
import { bindActionCreators } from 'redux';

export interface NavMenuProps extends React.Props<any>  {
    isLoggedIn?: boolean;
    onLogOutUser: () => any;
}

type AllProps = NavMenuProps & LoginState;

class NavMenu extends React.Component<AllProps> {
    public static defaultProps: Partial<AllProps> = {
        isLoggedIn: false,
    };

    constructor(props: AllProps) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout = (event: any) => {
        event.preventDefault();
        this.props.onLogOutUser();
    }

    public render() {
        return (
        <div className={styles.mainNav}>
                <div className={`navbar-default navbar navbar-inverse navbar-fixed-top`}>
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button
                                type="button"
                                className="navbar-toggle"
                                data-toggle="collapse"
                                data-target=".navbar-collapse"
                            >
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"/>
                                <span className="icon-bar"/>
                                <span className="icon-bar"/>
                            </button>
                            <Link className="navbar-brand" to={'/'}>react</Link>
                        </div>
                {/* <div className='clearfix'></div> */}
                <div className="navbar-collapse collapse">
                    <ul className="nav navbar-nav">
                        <li>
                            <NavLink to={'/'} exact={true} activeClassName="active">
                                <span className="glyphicon glyphicon-home"/> Home
                            </NavLink>
                        </li>
                        {this.renderNavLeft()}
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        {this.renderNavRight()}
                    </ul>
                </div>
                </div>
            </div>
        </div>
        );
    }

    private renderNavLeft() {
        const { isLoggedIn } = this.props;
        if (isLoggedIn) {
            return (
            <li>
                <NavLink to={'/items'} activeClassName="active">
                    <span className="glyphicon glyphicon-th-list"/> Items
                </NavLink>
            </li>
            );
        }
    }

    private renderNavRight() {
        const { isLoggedIn } = this.props;
        if (isLoggedIn) {
            return (
            <React.Fragment>
                <li>
                    <NavLink to={'#'} activeClassName="active" onClick={this.handleLogout}>
                        <span className="glyphicon glyphicon-log-in"/> Logout
                    </NavLink>
                </li>
            </React.Fragment>
            );
        } else {
            return (
            <React.Fragment>
                <li>
                    <NavLink to={'/register'} activeClassName="active">
                        <span className="glyphicon glyphicon-user"/> Register
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/login'}  activeClassName="active">
                        <span className="glyphicon glyphicon-log-in"/> Login
                    </NavLink>
                </li>
            </React.Fragment>
            );
        }
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    isLoggedIn: state.login.loggedIn,
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(
    {
    onLogOutUser: logOutUser,
    },
    dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavMenu);

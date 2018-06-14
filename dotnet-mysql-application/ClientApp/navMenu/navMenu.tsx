import * as React from 'react';
import { Link, NavLink, RouteComponentProps, withRouter } from 'react-router-dom';
import * as styles from './navMenu.css';
import { connect, Dispatch } from 'react-redux';
import { ApplicationState, ConnectedReduxProps } from '../store';
import { LoginState, LogOutUserAction } from '../store/user/types';
import { logOutUser } from '../store/user/actions';
import { LoginPageProps } from '../pages/login/Login';
import { bindActionCreators, Action } from 'redux';

{/* NavMenu is not a route component, don't give it RouteComponentProps!!! */}
export interface NavMenuProps extends React.Props<any>  {
    isLoggedIn?: boolean,
    onLogOutUser: () => any,
}

type AllProps = NavMenuProps & LoginState; 

class NavMenu extends React.Component<AllProps> {
    constructor(props: AllProps) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    public static defaultProps: Partial<AllProps> = {
        isLoggedIn: false,
    };

    handleLogout = (event: any) => {
        event.preventdefault;
        this.props.onLogOutUser();
    };

    public render() {
        return <div className={styles.mainNav}>
                <div className={`navbar-default navbar navbar-inverse navbar-fixed-top`}>
                    <div className='container-fluid'>
                        <div className='navbar-header'>
                            <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
                                <span className='sr-only'>Toggle navigation</span>
                                <span className='icon-bar'></span>
                                <span className='icon-bar'></span>
                                <span className='icon-bar'></span>
                            </button>
                            <Link className='navbar-brand' to={ '/' }>react</Link>
                        </div>
                {/* <div className='clearfix'></div> */}
                <div className='navbar-collapse collapse'>
                    <ul className='nav navbar-nav'>
                        <li>
                            <NavLink to={ '/' } exact activeClassName='active'>
                                <span className='glyphicon glyphicon-home'></span> Home
                            </NavLink>
                        </li>
                        {/* <li>
                            <NavLink to={ '/counter' } activeClassName='active'>
                                <span className='glyphicon glyphicon-education'></span> Counter
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ '/fetchdata' } activeClassName='active'>
                                <span className='glyphicon glyphicon-th-list'></span> Fetch data
                            </NavLink>
                        </li> */}
                        {/* <li>
                            <NavLink to={ '/equipments' } activeClassName='active'>
                                <span className='glyphicon glyphicon-th-list'></span> Equipments
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ '/loans' } activeClassName='active'>
                                <span className='glyphicon glyphicon-th-list'></span> Loans
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ '/users' } activeClassName='active'>
                                <span className='glyphicon glyphicon-th-list'></span> Users
                            </NavLink>
                        </li> */}  
                    </ul>
                    <ul className='nav navbar-nav navbar-right'>
                        <li className={this.props.isLoggedIn ? "hidden" : ""}>
                            <NavLink to={ '/register' } activeClassName='active'>
                                <span className='glyphicon glyphicon-user'></span> Register
                            </NavLink>
                        </li>
                        <li className={this.props.isLoggedIn ? "hidden" : ""}>
                            <NavLink to={ '/login' }  activeClassName='active'>
                                <span className='glyphicon glyphicon-log-in'></span> Login
                            </NavLink>
                        </li>
                        <li className={!this.props.isLoggedIn ? "hidden" : ""}>
                            <NavLink to={ '#' } activeClassName='active' onClick={ this.handleLogout }>
                                <span className='glyphicon glyphicon-log-in'></span> Logout
                            </NavLink>
                        </li>
                    </ul>
                </div>
                </div>
            </div>
        </div>;
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
    mapDispatchToProps,
)(NavMenu);
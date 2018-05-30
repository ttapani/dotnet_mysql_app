import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import * as styles from './navMenu.css';

export class NavMenu extends React.Component<{}, {}> {
    constructor() {
        super();
    }

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
                        {/* <li>
                            <NavLink to={ '/register' } activeClassName='active'>
                                <span className='glyphicon glyphicon-flash'></span> Register
                            </NavLink>
                        </li> */}
                        
                    </ul>
                    <ul className='nav navbar-nav navbar-right'>
                        <li>
                            <NavLink to={ '/login' } activeClassName='active'>
                                <span className='glyphicon glyphicon-log-in'></span> Login
                            </NavLink>
                        </li>
                    </ul>
                </div>
                </div>
            </div>
        </div>;
    }
}
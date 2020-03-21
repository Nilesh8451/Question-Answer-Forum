import React, { Component } from 'react';
import './AHeader.css';
// import SigupSignin from '../Popup/SignupSignin';
import Searcher from '../../Search/Search';

import { Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
class AHeader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profile: true,
            home: true
        }
    }


    adhome = () => {
        // console.log(this.state.profile)
        this.setState({ home: true })
        // console.log("CLICKED")
        if (this.state.profile === true) {
            this.setState({ profile: false })
            // console.log("Inside if", this.state.profile)

        }
        else {
            this.setState({ profile: false })
            window.location.reload('/Admin');
        }

    }

    clickedprofile = () => {
        // console.log(this.state.profile)
        this.setState({ profile: true })
        // console.log(this.state.profile)
    }
    render() {
        return (
            <div>
                <header className="toolbar">
                    <nav className="nevigation_menu">
                        <div className="logo_style">
                            <a href=""><NavLink to="/Admin">Quest</NavLink></a>
                        </div>

                        <Searcher></Searcher>

                        <div className="lists">
                            <div className="Afst">
                                <li><NavLink to="/Admin"><a href="" onClick={this.adhome}>Home</a></NavLink></li>
                            </div>

                            <div className="Atrd">
                                <li><NavLink to="/AProfile"><a href="" onClick={this.clickedprofile}>Profile</a></NavLink></li>
                            </div>
                        </div>
                        <div className="login_reg">
                            <a href="javascript:void(0);"><NavLink to="/AProfile" className="LRNL" style={{ color: 'white', fontWeight: 650 }}>Welcome Admin</NavLink></a>
                            {/* <a href="#" variant="outlined" color="primary" onClick={this.handleClickOpen}>Login or Register  </a>  */}
                            {/* <SigupSignin /> */}
                        </div>
                    </nav>
                </header>



                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="SNAV">
                    <Navbar.Brand href="/Admin" className="IconS">Quest</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Searcher></Searcher>
                        </Nav>
                        <Nav className="NAVITEMLIST">
                            <Nav.Link eventKey={1} href="/Admin">
                                Home
                            </Nav.Link>
                            <Nav.Link eventKey={3} href="/AProfile">
                                Profile
                            </Nav.Link>
                            <a href="javascript:void(0);" className="LRNL" style={{ color: 'white', fontWeight: 650 }} >Welcome Admin</a>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

            </div>
        );
    }
}

export default AHeader
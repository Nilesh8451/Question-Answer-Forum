import React, { Component } from 'react';
import './AProfile.css';
import Header from '../AHeader/AHeader';
import withAuth from '../../../../src/withAuthAdmin'
import { Button } from 'react-bootstrap'
import AuthService from '../../../AuthService/AuthService'
import NavLink from 'react-bootstrap/NavLink';
class AProfile extends Component {
    constructor(props) {
        super(props)
        this.Auth = new AuthService()
        this.state = {
            Profile: [],
            lastlogin: '',
            date: '',
            time: '',
            apiurl: 'http://localhost:5000/api/'

        };

    }
    

    componentWillMount() {
        this.Auth.fetch(this.state.apiurl+'viewprofile', {
            method: 'POST', body: JSON.stringify({

            })
        }).then(res => {
            // this.setState({ Profile: res })
            // console.log("this is admin profile---------------", res)
            this.setState({ lastlogin: res.lastsession })
            // console.log("this is last login", this.state.lastlogin)
        }
            // console.log(this.state.img)
        )
            .catch(err => {
                // console.log('Profile', err)
            })


        this.Auth.fetch(this.state.apiurl+'viewprofile', {
            method: 'POST', body: JSON.stringify({
            })
        }).then(res => {
            // this.setState({ Profile: res })
            // console.log("this is admin profile---------------", res)

        }
            // console.log(this.state.img)
        )
            .catch(err => {
                // console.log('Profile', err)
            })





    }


    log = () => {
        // console.log("inside")
        this.Auth.fetch(this.state.apiurl+'adminlogout', {
            method: 'POST', body: JSON.stringify({

            })
        }).then(res => {
            // this.setState({ Profile: res })
            // console.log("this is admin profile---------------logout", res)

        }
        )
            .catch(err => {
                // console.log('Profile', err)
            })


        this.Auth.logout()
        this.setState()


    }

    render() {
        let array = []
        array = this.state.lastlogin.split("T");
        // this.setState({date:array[0]})
        let newarray = []
        let tp = ''
        tp = "" + array[1]
        newarray = tp.split(".")

        let hourminsec = newarray[0].split(':')
        let hour = parseInt(hourminsec[0])
        let min = parseInt(hourminsec[1])
        let sec = parseInt(hourminsec[2])
        min = min + 30;
        if (min > 60) {
            min = min - 60;
            hour = hour + 1;
        }
        hour = hour + 5;
        if (hour > 24) {
            hour = hour - 24;
        }
        hourminsec[0] = hour.toString();
        hourminsec[1] = min.toString();
        hourminsec[2] = sec.toString();
        let displaytime = hourminsec.join(':')


        return (

            <div >
                <div className="APFirst">
                    <Header />
                </div>
                <div className="APSecond">
                    <div className="APMAINDIV">
                        <div className="AdminP">
                            <h3>Hello Admin</h3>
                            <h3>Last Login: {displaytime}</h3>
                            <h3>On {array[0]}</h3>
                            <a href="/"><Button variant="outline-primary" onClick={this.log} className="ALB">Logout</Button></a>
                        </div>
                    </div>
                </div>

            </div>

        );
    }
}

export default withAuth(AProfile)
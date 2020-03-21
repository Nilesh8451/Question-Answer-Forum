import React, { Component } from 'react';
import './Notification.css';
import Header from '../Header/Header';
import AuthService from '../../AuthService/AuthService';
import withAuth from '../../withAuth'

import { Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';

class Notification extends Component {
    constructor(props) {
        super(props)
        this.Auth = new AuthService()
        this.state = {
            YH: false,
            Request: true,
            QA: false,
            resultshare: [],
            resultQA: [],
            resultreps: [],
            shrdque: [],
            shrdq: [],
            apiurl: 'http://localhost:5000/api/'
        };

    }



    componentWillMount() {
        this.fetchingdata()
    }


    fetchingdata = () => {

        this.Auth.fetch(this.state.apiurl+'viewprofile', {
            method: 'POST', body: JSON.stringify({
            })
        }).then(res => {
            this.setState({ username: res.userName })

        })
            .catch(err => {
                // console.log('Profile', err)
            })


        this.Auth.fetch(this.state.apiurl+'notification', {
            method: 'POST', body: JSON.stringify({
                mod: 'reps'
            })

        }).then(res => {
            this.setState({ resultreps: res })
            // console.log("Reps Notification Content", res)
            this.state.resultreps.reverse()
            // console.log("Reps Notification Content", res)
        })
            .catch(err => {
                // console.log('Reps History Error', err)
            })



        this.Auth.fetch(this.state.apiurl+'notification', {
            method: 'POST', body: JSON.stringify({
                mod: 'request'
            })
        }).then(res => {
            this.setState({ resultshare: res })
            // console.log("Request Notification COntent", res)
        })
            .catch(err => {
                // console.log('Request Notification Error', err)
            })



        this.Auth.fetch(this.state.apiurl+'notification', {
            method: 'POST', body: JSON.stringify({
                mod: 'answer'
            })
        }).then(res => {
            this.setState({ resultQA: res })
            // console.log("Answer Notification Content", this.state.resultQA)
        })
            .catch(err => {
                // console.log('Answer Notification Error', err)
            })



        // this.Auth.fetch('http://localhost:5000/api/notification', {
        //     method: 'POST', body: JSON.stringify({
        //         mod: 'shared'
        //     })
        // }).then(res => {
        //     var tp = []
        //     if (this.state.resultQA !== []) {
        //         var ttp = this.state.resultQA
        //         tp = [...ttp]
        //     }

        //     tp = [...tp, ...res]
        //     this.setState({ resultQA: tp })
        //     console.log("Shared NOtification Content", res)
        // })
        //     .catch(err => console.log('Shared Notification Error', err))



        this.Auth.fetch(this.state.apiurl+'notification', {
            method: 'POST', body: JSON.stringify({
                mod: 'shared'
            })
        }).then(res => {
            this.setState({ shrdq: res })
            // console.log("shared only Notification", this.state.shrdq)
        })
            .catch(err => {
                // console.log('Shared Notification Error', err)
            })



        this.Auth.fetch(this.state.apiurl+'follow', {
            method: 'POST', body: JSON.stringify({

            })
        }).then(res => {
            var tp = [...this.state.resultQA]
            tp = [...tp, ...res]
            this.setState({ resultQA: tp })
        })
            .catch(err => {
                // console.log('nothing', err)
            })



        this.Auth.fetch(this.state.apiurl+'sharedwithme', {
            method: 'POST', body: JSON.stringify({
            })
        }).then(res => {
            // console.log("shared Questions", res)
            this.setState({ shrdque: res })
            // console.log("This is isisssisisisisisisisisisisisisisis", this.state.shrdque)
        })
            .catch(err => {
                // console.log('Shared Ques Noti', err)
            })

    }


    acceptReq = (rqid) => {
        this.Auth.fetch(this.state.apiurl+'acceptreq', {
            method: 'POST', body: JSON.stringify({
                rid: rqid,
                status: 1
            })
        }).then(res => {
            // console.log("success")
            this.fetchingdata()
            this.setState()
        })
            .catch(err => {
                // console.log('Profile', err)
            })

    }

    rejectReq = (rqid) => {

        this.Auth.fetch(this.state.apiurl+'acceptreq', {
            method: 'POST', body: JSON.stringify({
                rid: rqid,
                status: 0
            })
        }).then(res => {
            // console.log("successfully rejected")
            this.fetchingdata()
            this.setState()
        })
            .catch(err => {
                // console.log('Profile', err)
            })

    }


    RequestHandler = () => {
        this.setState({ YH: false });
        this.setState({ QA: false });
        this.setState({ Request: true });
    }

    QAHandler = () => {
        this.setState({ YH: false });
        this.setState({ Request: false });
        this.setState({ QA: true });
    }

    YHHandler = () => {
        this.setState({ Request: false });
        this.setState({ QA: false });
        this.setState({ YH: true });
    }


    render() {



        let shrinfo = ''
        // console.log("this is only shared info",this.state.shrdq)
        if (this.state.shrdq.length > 0) {
            shrinfo = this.state.shrdq.map(s1 => {
                return (<div className="Notirequest">
                    <div className="Notirequestmaindiv">
                        <span style={{ fontWeight: 550, opacity: 0.8 }}><NavLink to={"/Ques/" + (s1.qid)} style={{ textDecoration: 'none', color: 'black' }}>{s1.msg}</NavLink></span><br />
                    </div>
                </div>)
            })
        }

        let hist = ''
        // console.log('Reps COntenttttttttttttttttttttttttttt', this.state.resultreps)
        if (this.state.resultreps.length > 0) {
            hist = this.state.resultreps.map(h1 => {
                return (<div className="Notirequest">
                    <div className="Notirequestmaindiv">
                        <span>{h1.msg}</span><br /></div>
                </div>)
            })
        }

        let ana = ''
        // console.log("QAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", this.state.resultQA)
        if (this.state.resultQA.length > 0) {
            ana = this.state.resultQA.map(anan1 => {
                return (<div className="Notirequest">
                    <div className="Notirequestmaindiv">
                        <span><NavLink to={"/Ques/" + (anan1.qid)} style={{ textDecoration: 'none', color: 'black' }}>{anan1.msg}</NavLink></span>
                    </div>
                </div>)

            })
        }
        let re = ''
        if (this.state.resultshare.length > 0) {
            re = this.state.resultshare.map(r1 => {
                return (<div className="Notirequest">
                    <div className="Notirequestmaindiv">
                        <span className="Notirequestspan">The request from user {r1.sentby} for  {r1.name} Community</span><br />
                        <Button style={{ height: 20, fontSize: 12, paddingTop: 0, paddingBottom: 0 }} onClick={() => { this.acceptReq(r1._id) }}>Accept</Button>
                        <Button style={{ height: 20, fontSize: 12, paddingTop: 0, paddingBottom: 0, float: 'right', marginRight: 10 }} onClick={() => { this.rejectReq(r1._id) }}>Reject</Button>
                    </div>
                </div>)

            })
        }

        if (re == '') {
            re = (<div className="NotirequestNo">
                <div className="NotirequstNo">
                    <span className="NotirequestspanNo">No New Request</span><br />
                </div>
            </div>)
        }

        if (hist == '') {
            hist = (<div className="NotirequestNo">
                <div className="NotirequstNo">
                    <span className="NotirequestspanNo" style={{marginLeft:"37%"}}>No History</span><br />
                </div>
            </div>)
        }

        if (shrinfo == '' && ana == '') {
            shrinfo = (<div className="NotirequestNo">
                <div className="NotirequstNo">
                    <span className="NotirequestspanNo" style={{marginLeft:"28%"}}>Nothing to show</span><br />
                </div>
            </div>)
        }



        return (
            <div>
                <div className="PFirst">
                    <Header />
                </div>
                <div className="PSecond">
                    <p className="NOTH">Notifications</p>
                    <div className="NotiNav">
                        <div className="NotiNavF">
                            <p className="NotiP" onClick={this.RequestHandler}>Request</p>
                        </div>
                        <div className="NotiNavS">
                            <p className="NotiP" onClick={this.QAHandler}>Q & A</p>
                        </div>
                        <div className="NotiNavT">
                            <p className="NotiP" onClick={this.YHHandler}>Your History</p>
                        </div>
                    </div>

                    <div className="NotiMD">
                        {
                            this.state.Request === true ?
                                <div className="notiD">
                                    {re}

                                </div> : null
                        }


                        {
                            this.state.QA === true ?
                                <div className="notiD">
                                    {shrinfo}
                                    {ana}

                                </div> : null

                        }


                        {
                            this.state.YH === true ?
                                <div className="notiD">
                                    {hist}

                                </div> : null
                        }
                    </div>

                </div>
            </div>
        );
    }

}


export default withAuth(Notification)




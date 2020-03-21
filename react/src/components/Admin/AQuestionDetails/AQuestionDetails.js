import React, { Component } from "react";
import './AQuestionDetails.css';
import AuthService from '../../../AuthService/AuthService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { Button } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';

import SweetAlert from 'react-bootstrap-sweetalert';

const style = {
    // paddingTop: "4px",
    // fontSize: "14px",
    // paddingBottom: "4px",
    // // marginLeft: "-70px",
    // marginTop: "15px",
    // float: "right",
    // marginRight: "20px"

}
class AQuestionDetails extends Component {
    constructor(props) {
        super(props)
        this.Auth = new AuthService()
        this.state = {
            text: '',
            notags: '',
            question: {},
            answers: [],
            alert: null,
            alertdel: null,
            apiurl: 'http://localhost:5000/api/'

        }
    }
    componentDidMount() {
        this.getResult()
        // console.log('inside')


        // this.Auth.fetch('http://localhost:5000/api/viewanswersadmin', {
        //     method: 'POST', body: JSON.stringify({
        //         qid: this.props.qid
        //     })
        // }).then(res => {
        //     let ques = res[0]
        //     res.shift()

        //     this.setState({ question: ques, answers: res })

        // })
        //     .catch(err =>{
        //         // console.log('latest', err)
        //     })


        // const script = document.createElement("script");
        // script.src = "https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js?lang=py&amp;skin=sunburst";
        // script.async = true;


        // document.body.appendChild(script);



    }

    getResult = () => {


        this.Auth.fetch(this.state.apiurl+'viewanswersadmin', {
            method: 'POST', body: JSON.stringify({
                qid: this.props.qid
            })
        }).then(res => {
            let ques = res[0]
            res.shift()

            this.setState({ question: ques, answers: res })

        })
            .catch(err => {
                // console.log('latest', err)
            })


        const script = document.createElement("script");
        script.src = "https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js?lang=py&amp;skin=sunburst";
        script.async = true;


        document.body.appendChild(script);





    }

    scriptLoaded() {

        window.PR.prettyPrint();
        // console.log('eth')
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.scriptLoaded()
    }


    approve = (aid) => {
        // console.log(aid)
        this.Auth.fetch(this.state.apiurl+'verifyanswer', {
            method: 'POST', body: JSON.stringify({
                aid: aid
            })
        }).then(res => {
            this.getResult()
            // console.log('approved')
            this.setState()

        })
            .catch(err => {
                // console.log('approve', err)
            })

    }


    deletepop = (aid) => {
        const getAlert = () => (
            <SweetAlert
                warning
                showCancel
                confirmBtnText="Yes, delete it!"
                confirmBtnBsStyle="danger"
                cancelBtnBsStyle="default"
                title="Are you sure?"
                onConfirm={() => this.delete(aid)}
                onCancel={() => this.hideAlert()}
            >
                You will not be able to recover this imaginary file!
    </SweetAlert>)

        this.setState({
            alertdel: getAlert()
        });

    }


    delete = (aid) => {
        this.hideAlertDel()
        console.log(aid)
        this.Auth.fetch(this.state.apiurl+'deleteansweradmin', {
            method: 'POST', body: JSON.stringify({
                aid: aid
            })
        }).then(res => {
            this.getResult()
            // console.log('deleted')
            this.setState()

        })
            .catch(err => {
                //  console.log('del', err)
            })

    }


    deleteqpop = () => {
        const getAlert = () => (
            <SweetAlert
                warning
                showCancel
                confirmBtnText="Yes, delete it!"
                confirmBtnBsStyle="danger"
                cancelBtnBsStyle="default"
                title="Are you sure?"
                onConfirm={() => this.deleteq()}
                onCancel={() => this.hideAlert()}
            >
                You will not be able to recover this imaginary file!
    </SweetAlert>)

        this.setState({
            alert: getAlert()
        });

    }

    hideAlert() {
        // console.log('Hiding alert...');
        this.setState({
            alert: null
        });
        this.setState()
    }

    hideAlertDel() {
        // console.log('Hiding alert...');
        this.setState({
            alertdel: null
        });
        this.setState()
    }



    deleteq = () => {
        this.hideAlert()
        // console.log('insssss', this.props.qid)
        this.Auth.fetch(this.state.apiurl+'deletequestiongrp', {
            method: 'POST', body: JSON.stringify({
                qid: this.props.qid
            })
        }).then(res => {

            // console.log('deleted ques')
            this.setState()
            window.location.reload('/Admin')

        })
            .catch(err => {
                // console.log('delques error', err)
            })
    }


    render() {
        let ques = ''
        let tags = ''
        if (this.state.question.question !== undefined) {
            ques = this.state.question.question.replace('"ql-syntax" spellcheck="false"', '"prettyprint"')
            tags = this.state.question.tags.map(t => { return (<a href="">{t}</a>) })
        }
        let ans = this.state.answers.map(a => {
            // console.log(a.answer)
            a.answer = a.answer.replace('"ql-syntax" spellcheck="false"', '"prettyprint"')
            return (<div className="AAnsdiv">
                <div className="Aansp">

                    {ReactHtmlParser(a.answer)}

                    <div className="Aans">

                        <p>Answered by:</p><a href="" className="Aansu">{a.creatorname}</a>
                        <Button variant="outline-primary" style={style} onClick={() => this.approve(a._id)} className="Adminabut">APPROVE ANSWER</Button>
                        <Button variant="outline-primary" style={style} onClick={() => this.deletepop(a._id)} className="Adminabut Adminabutd">DELETE ANSWER</Button>
                        {this.state.alertdel}
                    </div><br />

                </div>
                <hr /></div>)
        })
        return (
            <div className="AMAINTOPDIV" >
                <div className="AQT">
                    <div className="Aquestinfo">
                        <div className="Aqasecdiv">
                            <div className="Aqu"><a href="">{this.state.question.title}</a></div>
                            <div className="Aqu"><a href="" style={{ fontWeight: 450 }}>{ReactHtmlParser(ques)}</a></div>
                            <div className="Ata">{tags}</div>
                            <div className="Aas"><p>Asked by:</p><a href="">{this.state.question.creatorname}</a></div>
                            <Button variant="outline-primary" style={style} onClick={this.deleteqpop} className="ADQ">DELETE QUESTION</Button>
                            {this.state.alert}
                        </div>
                    </div>
                </div>

                <hr />
                <p className="Aanslabel">ANSWERS</p>
                <hr className="hrtag" />
                {ans}
            </div>
        );
    }
}

export default AQuestionDetails
import React, { Component } from 'react';
import './quill.snow.css'
import AuthService from '../../AuthService/AuthService'
import './Answer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Editor from "../Popup/Editor";
import { Button } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import 'code-prettify';
import SweetAlert from 'react-bootstrap-sweetalert';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
class Answer extends Component {
    constructor(props) {
        super(props)
        this.Auth = new AuthService()
        this.state = {
            text: '',
            notags: '',
            question: {},
            answers: [],
            accepted: false,
            alert: null,
            username: '',
            apiurl: 'http://localhost:5000/api/'

        }
    }


    componentDidMount() {
        this.getResult()

        this.Auth.fetch(this.state.apiurl + 'viewprofile', {
            method: 'POST', body: JSON.stringify({
            })
        }).then(res => {
            this.setState({ username: res.userName })



        })
            .catch(err => {
                // console.log('Profile', err)
            })

    }


    getResult = () => {


        this.Auth.fetch(this.state.apiurl + 'viewqa', {
            method: 'POST', body: JSON.stringify({
                qid: this.props.qid
            })
        }).then(res => {
            let ques = res[0]
            res.shift()
            // this.setState({ accepted: res[0].accepted })
            // console.log("this is i want", res[0].accepted)
            this.setState({ question: ques, answers: res })

        })
            .catch(err => {
                //  console.log('Inside answer component', err)
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


    ansSubmit = () => {
        //   this.scriptLoaded()

        const getAlert = () => (
            <SweetAlert
                success
                title="SUCCESS"
                onConfirm={() => this.hideAlert()}
            >
                Answer added successfully
        </SweetAlert>
        );

        console.log("THIS IS INSIDE BEFORE")
        this.Auth.fetch(this.state.apiurl + 'addanswer', {
            method: 'POST', body: JSON.stringify({
                username: this.state.username,
                qid: this.props.qid,
                answer: this.state.text
            })
        }).then(res => {

            // console.log("THIS IS INSIDE BEFORE after")
            // console.log("anssubmit", res)

            this.setState({
                alert: getAlert()
            });
            this.getResult()
            // window.location.reload('/Question')
            this.setState({ text: '' })
        })
            .catch(err => {
                // console.log('anssubmit', err)
            })
    }



    hideAlert() {
        // console.log('Hiding alert...');
        this.setState({
            alert: null
        });
        this.setState()
    }


    upans = (aid) => {
        this.Auth.fetch(this.state.apiurl + 'editupvotes', {
            method: 'POST', body: JSON.stringify({

                aid: aid
            })
        }).then(res => {
            this.getResult()
            //  console.log("upvoted ans", res)
        })
            .catch(err => {
                //  console.log('upvoted ans', err)
            })
    }


    downans = (aid) => {
        this.Auth.fetch(this.state.apiurl + 'editdownvotes', {
            method: 'POST', body: JSON.stringify({

                aid: aid
            })
        }).then(res => {
            this.getResult()
            //  console.log("downvoted ans", res)
        })
            .catch(err => {
                //  console.log('downvoted ans', err)
            })
    }


    upques = () => {
        this.Auth.fetch(this.state.apiurl + 'editupvotesquestion', {
            method: 'POST', body: JSON.stringify({

                qid: this.props.qid
            })
        }).then(res => {
            this.getResult()
            // console.log("upvoted ques", res)
        })
            .catch(err => {
                // console.log('upvoted ques', err)
            })
    }
    downques = () => {
        this.Auth.fetch(this.state.apiurl + 'editdownvotesquestion', {
            method: 'POST', body: JSON.stringify({

                qid: this.props.qid


            })
        }).then(res => {
            this.getResult()
            // console.log("downvoted ques", res)
        })
            .catch(err => {
                // console.log('downvoted ques', err)
            })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.scriptLoaded()
    }

    handleChangeEditor = (value, delta, source, editor) => {
        // console.log(value)
        this.setState({ text: value })
        this.setState({ notags: editor.getText(value) })

    }
    render() {
        let acc = ''
        if (this.state.accepted === true) {
            acc = (<div className="AcceptedDiv">

                <a href="javascript:void(0);"><FontAwesomeIcon icon="check-circle" className="checkedans" tabindex="1" /></a>
                <span>Verified By Admin</span>
            </div>)

        }


        // console.log(this.state)
        let ques
        if (this.state.question.question !== undefined) {
            var tags = this.state.question.tags.map(l => { return (<a href="">{l}</a>) })
            ques = this.state.question.question.replace('"ql-syntax" spellcheck="false"', '"prettyprint"')
        }
        let ans = this.state.answers.map(a => {

            let acc = ''
            if (a.accepted === true) {
                if (a.verified === true) {
                    acc = (<div className="AcceptedDiv">
                        <a href="javascript:void(0);"><FontAwesomeIcon icon="check-circle" className="checkedans" tabindex="1" /></a>
                        <span>Verified By Admin</span>
                    </div>)
                }
                else {
                    acc = (<div className="AcceptedDiv">
                        <a href="javascript:void(0);"><FontAwesomeIcon icon="check-circle" className="checkedans" tabindex="1" /></a>
                    </div>)
                }
            }
            else {
                if (a.verified === true) {

                    acc = (<div className="AcceptedDiv">
                        <span>Verified By Admin</span>
                    </div>)

                }
            }


            // console.log(a.answer)
            a.answer = a.answer.replace('"ql-syntax" spellcheck="false"', '"prettyprint"')

            //a.answer = a.answer.replace('</pre>', '>')
            return (
                <div className="Ansdiv">
                    {acc}
                    <div className="ansp">
                        <div style={{ padding: 20 }}>
                            {ReactHtmlParser(a.answer)}
                        </div>

                        <div className="ans">

                            <p>Answered by:</p><a href="" className="ansu">{a.creatorname}</a>
                            <a href="javacript:void(0);"><FontAwesomeIcon icon="thumbs-up" className="iconsty anslike" tabindex="1" onClick={() => this.upans(a._id)} /><span style={{ color: 'black', marginLeft: 5 }}>{a.upvotes}</span></a>
                            <a href="javacript:void(0);" className="DOWNICON"><FontAwesomeIcon icon="thumbs-down" className="iconsty anslike" tabindex="1" onClick={() => this.downans(a._id)} /><span style={{ color: 'black', marginLeft: 5 }}>{a.downvotes}</span></a>

                        </div><br />

                    </div>
                    <hr />
                </div>

            )
        })
        return (

            <div className="MAINTOPDIV" onClick={this.scriptLoaded}>
                <div className="QT">
                    <div className="questinfo">
                        <div className="qasecdiv">
                            <div className="qu"><a href="">{this.state.question.title}</a></div>
                            <div className="qu"> {ReactHtmlParser(ques)}</div>
                            <div className="ta">{tags}</div>
                            <div className="as"><p>Ask by:</p><a href="">{this.state.question.creatorname}</a></div>
                        </div>
                    </div>
                    <div className="Useraction">
                        <div className="upvotediv">
                            <div className="like">
                                <a href="javacript:void(0);"><FontAwesomeIcon icon="thumbs-up" className="iconsty" tabindex="1" onClick={this.upques} /><span style={{ color: 'black', marginLeft: 5 }}>{this.state.question.upvotes}</span></a>
                                <a href="javacript:void(0);" className="DOWNICON"><FontAwesomeIcon icon="thumbs-down" className="iconsty anslike" tabindex="1" onClick={this.downques} /><span style={{ color: 'black', marginLeft: 5 }}>{this.state.question.downvotes}</span></a>
                                {/* <p>Votes</p> */}
                            </div>
                        </div>
                        <div className="submitdiv">
                            <a href="#useransid" className="addans"><button>Add Answer</button></a>
                        </div>
                    </div>
                </div>

                <hr />
                <p className="anslabel">ANSWERS</p>
                <hr className="hrtag" />
                {ans}

                <div className="useransdiv" id="useransid" >
                    <form className='formdiv' noValidate autoComplete="off">

                        <Editor placeholder={'Write Something...'} text={this.state.text} onChange={this.handleChangeEditor} />

                        <Button variant="outline-primary" className='submit' onClick={this.ansSubmit} className="ANSBUTT">Submit Answer</Button>
                        {this.state.alert}
                    </form>
                </div></div>

        );
    }
}

export default Answer
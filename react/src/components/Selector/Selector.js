import React from 'react';
import './Selector.css';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import QuestionPopup from '../Popup/QuestionPopup';
import Users from '../../RoutingMain/UserRoute/UserRoute';
import Tags from '../../RoutingMain/TagsRoute/TagsRoute';
const selector = () => {
    return (
        <div className="Mainclass">
            <div className="Add_Button">
                <QuestionPopup />
                {/* <Button className="add_but"><b className="addsign">+</b> ASK A QUESTION</Button> */}
            </div><hr />
            <div className="Fields">
                {/* <li><a href="" ><NavLink to="/Question" className="R">Questions</NavLink></a></li> */}
                {/* <li><a href="">Tags</a></li>
                <li><a href="">Users</a></li> */}

                <li><NavLink to="/Question" className="R" style={{ textDecoration: 'none' }}>Questions</NavLink></li>
                <li><NavLink to="/Users" className="R" style={{ textDecoration: 'none' }}>Users</NavLink></li>
                <li><NavLink to="/Tags" className="R" style={{ textDecoration: 'none' }}>Tags</NavLink></li>
                <li><NavLink to="/Communities" className="R" style={{ textDecoration: 'none' }}>Communities</NavLink></li>
            </div>
            <hr className="SHRTAG" />
        </div>
    );
}

export default selector
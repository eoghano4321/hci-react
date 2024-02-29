import NavBar from "./components/NavBar";
import './Contact.css';

import {state, useRef, useState, Component, createRef} from 'react';
import React from "react";

class Contact extends Component {

    form = createRef();

    sendEmail = (e) => {
        e.preventDefault();
    
        console.log("Sending email...");
        setTimeout(() => {  // Simulate a server delay
            console.log("Email Sent!");
            alert("We have received your message! We will be in touch shortly!");
            e.target.reset();
        }, 1000);
    };


    render() {
        return (
            <>
            <NavBar currentPage={Contact}/>
            <section className="container">
                <h1>Contact Me</h1>
                <form ref={this.form} onSubmit={this.sendEmail}>
                    <div className="row">
                        <div className="col-25">
                            <label for="fname">First Name</label>
                        </div>
                        <div className="col-75">
                            <input type="text" id="fname" name="fname" placeholder="Your name.."/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label for="lname">Last Name</label>
                        </div>
                        <div className="col-75">
                            <input type="text" id="lname" name="lname" placeholder="Your last name.."/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label for="email">Email</label>
                        </div>
                        <div className="col-75">
                            <input type="text" id="email" name="email" placeholder="someone@example.com"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <label for="subject">Subject</label>
                        </div>
                        <div className="col-75">
                            <textarea id="subject" name="subject" placeholder="Write something.." style={{height: "200px"}}></textarea>
                        </div>
                    </div>
                    <div className="row">
                        <input type="submit" value="Submit"/>
                    </div>
                </form>
            </section>
            
            </>
        );
    }
}

export default Contact;
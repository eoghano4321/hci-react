import { wait } from "@testing-library/user-event/dist/utils";
import NavBar from "./components/NavBar";
import './Upload.css';

import {state, useRef, useState, Component, createRef} from 'react';
import React from "react";

class Upload extends Component {

    form = createRef();

    uploadFile = (e) => {
        e.preventDefault();
    
        console.log("Uploading...");
        setTimeout(() => {  // Simulate a server delay
            console.log("File uploaded!");
            alert("File uploaded!");
            e.target.reset();
        }, 1000);
    };


    render() {
        return (
            <>
            <NavBar />
            <section className="container">
                <h1>Upload Form</h1>
                <form ref={this.form} onSubmit={this.uploadFile}>
                    <div className="row">
                        <div className="col-5">
                            <label for="fname"><b>Upload a file:</b></label>
                        </div>  
                        <div className="col-7">
                            <input type="file" id="file" name="file" accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"/>
                        </div>
                    </div>
                    <div className="row">
                        <input type="submit" value="Upload"/>
                    </div>
                </form>
            </section>
            
            </>
        );
    }
}

export default Upload;
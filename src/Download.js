import { wait } from "@testing-library/user-event/dist/utils";
import NavBar from "./components/NavBar";
import './Upload.css';

import {state, useRef, useState, Component, createRef} from 'react';
import React from "react";

class Upload extends Component {

    downloadTextFile = () => {
        const textContent = "This is a basic text file for download.";

        // Create a blob with the text content
        const blob = new Blob([textContent], { type: 'text/plain' });

        // Create a temporary anchor element to trigger the download
        const anchorElement = document.createElement('a');
        anchorElement.href = window.URL.createObjectURL(blob);
        anchorElement.download = 'freedomefile.txt';
        anchorElement.click();
    };


    render() {
        return (
            <>
            <NavBar />
            <section className="container">
                <h1>Download File</h1>
                <form ref={this.form} onSubmit={this.uploadFile}>
                    <div className="row">
                        <div className="col-5">
                            <label for="fname"><b>Download a file:</b></label>
                        </div>  
                        <div className="col-7">
                        <button className="download-button"  onClick={this.downloadTextFile}>Download Text File</button>
                        </div>
                    </div>
                </form>
            </section>
            
            </>
        );
    }
}

export default Upload;
import React from "react";


export default function About(props) {
    return (
        <>
            <div className="container my-4 mx-auto" style={props.style} data-bs-theme={props.mode} >
                <h2 className="my-3">{props.heading}</h2>
                <p style={props.style}>
                    Welcome to TextInsights, your go-to online text utility tool designed to make your writing clearer, sharper, and more effective.

                    Whether you're a student, writer, professional, or content creator, our tool provides instant feedback on your text. Simply paste your content, and we'll give you valuable insights — including:

                </p>

                <div className="card" style={props.style}>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"><b>Sentence Count </b> 
                        - No. of sentences</li>
                        <li className="list-group-item"><b>Word Count </b>
                        - No. of words
                        </li>
                        <li className="list-group-item"><b>Character Count </b>
                        - No. of characters
                        </li>
                        <li className="list-group-item"><b>Estimated Read Time </b>
                        - Average time to read text
                        </li>
                        <li className="list-group-item"><b>Tone Detection </b>
                        - Tone of text
                        </li>
                        <li className="list-group-item"><b>Reading Level </b>
                        - Reading complexity level
                        </li>

                    </ul>
                </div>

                <p className="my-4">
                    Our goal is simple: to help you understand your writing better and communicate more effectively. With our intuitive interface and fast results, you can quickly refine your content before publishing, emailing, or submitting.
                </p>

                <p className="my-3">
                    Built with usability and precision in mind, TextInsights is perfect for anyone who wants to write with clarity and purpose. Whether you're checking length, evaluating tone, or optimizing your writing flow, we're here to support your creative and professional goals.
                </p>

            </div>
        </>
    )
}
import { useState } from "react";

import axios from 'axios';

let updateFlag=0;
let prevtext;

export default function Form(props) {
    let sentence, words, chars, schars, readTime, readingLevel;
    const [text, setText] = useState("");
    const [tone,setTone] = useState("None");

    const run = async () => {
        setTone("fetching... this may take a moment as the render server might be waking from sleep mode.")
        try {
        const response = await axios.get(
            'https://table-booking-eiag.onrender.com/get-tone',{params:{text:text}},
        );

        const {emotion, emoji} = response.data;
        
        setTone(`${emotion} ${emoji}`);
        } 
        catch (err) {
            setTone("Tone detection not working");
        }
    }

    //eslint-disable-next-line
    const [property, setProperty] = useState({
        sentence: 0,
        words: 0,
        schars: 0,
        chars: 0,
        readTime: 0,
        readingLevel: "None!"
    });

    function formatReadTime(minutes) {
        if (minutes < 1) {
            const seconds = Math.ceil(minutes * 60);
            return `${seconds} sec`;
        } else {
            const min = Math.floor(minutes);
            const sec = Math.ceil((minutes - min) * 60);
            return sec > 0 ? `${min} min ${sec} sec` : `${min} min`;
        }
    }

    function countSyllables(word) {
        word = word.toLowerCase();
        if (word.length <= 3) return 1;
        word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
        word = word.replace(/^y/, '');
        const matches = word.match(/[aeiouy]{1,2}/g);
        return matches ? matches.length : 1;
    }

    function calculateReadingLevel(text) {
        const sentences = text.split(/[.?!]+/).filter(Boolean).length;
        const words = text.trim().split(/\s+/).filter(Boolean);
        const wordCount = words.length;
        const syllables = words.reduce((acc, word) => acc + countSyllables(word), 0);

        if (wordCount === 0 || sentences === 0) return "N/A";

        const gradeLevel = (0.39 * (wordCount / sentences) + 11.8 * (syllables / wordCount) - 15.59).toFixed(1);

        if (gradeLevel <= 5.5) {
            return "Very Simple";
        }
        else if (gradeLevel > 5.5 && gradeLevel <= 8) {
            return "General Audience";
        }

        else if (gradeLevel > 8.5 && gradeLevel <= 12) {
            return "Advanced Reader";
        }

        else if (gradeLevel > 12) {
            return "Academic/Professional";
        }
    }



    const analyzeText = () => {
        sentence = sentence = text !== "" ? (text.trim().split(/[.!?]+/).filter(s => s.trim().length > 0).length) : 0;
        words = text !== "" ? (text.match(/\b[\w''-]+\b/g) || []).length : 0;
        schars = text.length;
        chars = text.replace(/\s/g, '').length;
        readTime = formatReadTime(words / 200);
        run();
        readingLevel = calculateReadingLevel(text);
        setProperty({
            sentence: sentence,
            words: words,
            schars: schars,
            chars: chars,
            readTime: readTime,
            readingLevel: readingLevel
        })
        updateFlag=0;
    }

    const copyText = () => {
        navigator.clipboard.writeText(text);
    }

    const clearText = () => {
        setText('');
    }
    //eslint-disable-next-line
    const undoText = () => {
        if (text !== "") {
            setText(prevtext);
        }
    }

    const capitalize = () => {
        setText(text.toUpperCase());
    }

    const lower = () => {
        setText(text.toLowerCase());
    }

    const toTitleCase = () => {
        setText(text.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()));
    }

    const toSentenceCase = () => {
        setText(text.charAt(0).toUpperCase() + text.slice(1).toLowerCase());
    }

    const cleanText = () => {
        setText(text
            .replace(/\s+/g, ' ')
            .replace(/\n\s*\n/g, '\n')
            .trim());
    }

    const update = (event) => {
        if(updateFlag===0){
        updateFlag=1;
        }
        prevtext = text;
        setText(event.target.value);
    }



    return (
        <>
            <div className="container my-4" style={props.style} data-bs-theme={props.mode} >
                <h2 className="my-3">{props.heading}</h2>
                <div className="mb-3">
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="8" value={text} onChange={update} placeholder="Enter Text Here"></textarea>

                    <button className="btn btn-primary my-2 mx-2" onClick={clearText}>Clear</button>

                    <button className="btn btn-primary my-2 mx-2" onClick={copyText}>Copy</button>

                    <button className="btn btn-primary my-2 mx-2" onClick={cleanText}>Clean Text</button>

                    <button className="btn btn-primary my-2 mx-2" onClick={capitalize}> UpperCase</button>

                    <button className="btn btn-primary my-2 mx-2" onClick={lower}>LowerCase</button>

                    <button className="btn btn-primary my-2 mx-2" onClick={toTitleCase}>TitleCase</button>

                    <button className="btn btn-primary my-2 mx-2" onClick={toSentenceCase}>SentenceCase</button>

                    <button className={`btn btn-success my-2 mx-2 ${text.length>0?"":"disabled"}`} onClick={analyzeText}>Analyze Text</button>

                </div>
            </div>

            <div className="container my-3" style={props.style}>
                <h2>Text analysis </h2><p>{updateFlag===1?"(Update Needed)":""}</p>
                <p>
                    <b>{property.sentence}</b> {property.sentence > 1 ? "sentences" : "sentence"} <br />
                    <b>{property.words}</b> {property.words > 1 ? "words" : "word"}<br />
                    <b>{property.schars}</b> {property.schars > 1 ? "characters" : "character"} (with spaces) <br />
                    <b>{property.chars}</b> {property.chars > 1 ? "characters" : "character"} (without spaces)<br />
                </p>

                <p><b>{property.readTime}</b> read time</p>

                <p><b>Tone: </b>{tone}</p>
                <p><b>Reading Level: </b>{property.readingLevel}</p>
            </div>

        </>
    );
}
import React, { useState, useEffect } from "react";
import axios from "axios";
import head from "../images/face.png";
import body from "../images/body.png";
import leftl from "../images/leftleg.png";
import rightl from "../images/rightleg.png";
import lefta from "../images/leftarm.png";
import righta from "../images/rightarm.png";
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import "./fillIn.css"

export default function FillIn() {
    const [num, setNum] = useState(0);
    const [allQuestions, setAllQuestions] = useState([]);

    const [questnum, setQuestNum] = useState();
    const [question, setQuestion] = useState("");
    const [Answer, setAnswer] = useState("");
    const [answerbuilder, setAnswerBuilder] = useState();
    const [guess, setGuess] = useState([]);
    const [wrongAnswers, setWrongAnswers] = useState(0);
    const [letter, setLetter] = useState("");
    const [word, setWord] = useState("");
    const [score, setScore] = useState(0);
    const [displayResults, setDisplayResults] = useState(false);

    useEffect(() => {

        axios
            .get("http://localhost:8080/questions")
            .then((res) => {
                setAllQuestions(res.data);
                setQuestNum(res.data[num].questionNum)
                setQuestion(res.data[num].question)

                for (let key in res.data[num]) {
                    if (res.data[num][key][1] == 'true') {
                        setAnswer(res.data[num][key][0])
                    }
                }

                let builder = "";
                let index = 0;

                while (builder.length < Answer.length) {
                    if (Answer[index] === " ") {
                        builder += "-"
                    } else {
                        builder += "x"
                    }
                    index++
                }
                setAnswerBuilder(builder)
                //makes the oupt show an (x) for each letter and a (-) for each space in between
            })
            .catch((err) => {
                console.log("Error fetching data:", err)
            });

    }, [num, Answer]);



    const nextQ = (e) => {
        e.preventDefault()
        setNum(num + 1)

    }
    // console.log(Answer)
    // console.log(answerbuilder)
    // console.log(letter)
    // console.log(guess)

    const checkLetter = () => {
        if (!guess.includes(letter)) {

            setGuess([...guess, letter])
            let string = answerbuilder.split("")
            let allIndexes = []
            let space = []
            if (Answer.includes(letter)) {
                setScore(score + 1)
                for (let i = 0; i < Answer.length; i++) {
                    if (Answer[i] == letter || Answer[i] == letter.toUpperCase()) {
                        if (!allIndexes.includes(i)) {
                            allIndexes.push(i)
                        }
                    }
                }
                // console.log(allIndexes)
                // console.log(space)
                allIndexes.map((e, i) => {
                    string.splice(e, 1, letter)
                })

                setAnswerBuilder(string.join(""))

            }
            else if (!Answer.includes(letter)) {
                setWrongAnswers(wrongAnswers + 1)
            }
            setLetter("")
        }
    }

    const checkWord = () => {

        let string = Answer.toLowerCase().split(" ");
        let newstring = "";
        let wordAnswer = answerbuilder.toLowerCase().split("-");
        // console.log(wordAnswer, string)

        if (!wordAnswer.includes(word) && string.includes(word) && word.length !== 0) {//this stops the user from using the same word twice or entering in a empty spot and causing an error
            let scores = 0//created this variable to store the added score so it would add if the word shows more than once with the setstate it only changed once
            string.map((e, i) => {
                if (e === word) {
                    wordAnswer.splice(i, 1, e);
                    scores += e.length
                    newstring = wordAnswer
                }
            })
            //console.log(newstring)
            setScore(score + scores)
            setAnswerBuilder(newstring.join("-"))
        }
        else if (!string.includes(word)) {
            setWrongAnswers(wrongAnswers + 1)
        }
    }


    const reset = () => {
        setDisplayResults(false)
        setWrongAnswers(0)
        setAnswerBuilder("".padStart(Answer.length, "x"))
        setGuess([])
        setScore(0)
        setLetter("")
    }

    return (
        <div>
            <section id="hangDiv">
                {wrongAnswers >= 1 ? <img src={head} id="head" /> : ""}
                {wrongAnswers >= 2 ? <img src={body} id="body" /> : ""}
                {wrongAnswers >= 3 ? <img id="leftarm" src={lefta} /> : ""}
                {wrongAnswers >= 4 ? <img id="rightarm" src={righta} /> : ""}
                {wrongAnswers >= 5 ? <img id="leftleg" src={leftl} /> : ""}
                {wrongAnswers == 6 ? <img id="rightleg" src={rightl} /> : ""}
                {wrongAnswers == 6 ? <div id="lose"><h1 >Game Over</h1 >You lose<br /><h1></h1>Final Score: {score}</div> : ""}
                <div id="score"> Score: {score}</div>
                {num > allQuestions.length - 1 ? <div>You made it to the end with a Final Score of {score}</div> : ""}

            </section>

            <section id="questionDiv">
                <form >

                    <button id="nextbtn" onClick={nextQ}>Next Question</button>

                    <h1 id="questionTitle"> Question <u>{questnum}</u> out of <u>{allQuestions.length}</u></h1>

                    <label id="answerLabel"><h2 id="question">{question}?</h2> </label>
                    <div id="answersDiv" className="col">
                        <InputGroup className="mb-3">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="input letter guess &#11179;"
                                className="mb-2"
                            >
                                <Form.Control type="text" value={letter} onChange={e => setLetter(e.target.value)} /><Button variant="secondary" type="button" className="position-absolute top-0 end-0" onClick={() => checkLetter()}>Submit Letter</Button> </FloatingLabel>
                        </InputGroup>
                    </div>


                    {/* <br /> */}
                    <div id="answersDiv" className="col">
                        <InputGroup className="mb-3">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="input word guess &#11179;"
                                className="mb-2"
                            >
                                <Form.Control type="text" value={word} onChange={e => setWord(e.target.value)} /><Button variant="secondary" className="position-absolute top-0 end-0" onClick={() => checkWord()}>Submit Word</Button>
                            </FloatingLabel>
                        </InputGroup></div>
                </form>








                <section id="guessAnswerDiv">
                    <label id="guesesLabel"><h2 id="question">Letter Guesses</h2>
                        <div id="guessDiv">
                            {guess}
                        </div>
                    </label>

                    <div><h6>Answer builder</h6><h3><u>{answerbuilder}</u></h3></div>
                    <button onClick={reset}>Reset</button>
                </section>
            </section>

        </div>
    )
}
import React, { useState, useEffect } from "react";
import axios from "axios";
import head from "../images/face.png";
import body from "../images/body.png";
import leftl from "../images/leftleg.png";
import rightl from "../images/rightleg.png";
import lefta from "../images/leftarm.png";
import righta from "../images/rightarm.png";
import "./main.css";

export default function Main() {
    const [num, setNum] = useState(0);
    const [allQuestions, setAllQuestions] = useState([]);

    const [questnum, setQuestNum] = useState();
    const [question, setQuestion] = useState("");
    const [answer1, setAnswer1] = useState("");
    const [answer2, setAnswer2] = useState("");
    const [answer3, setAnswer3] = useState("");
    const [answer4, setAnswer4] = useState("");

    const [wrongAnswers, setWrongAnswers] = useState(0);
    const [choice, setChoice] = useState("");
    const [score, setScore] = useState(0);
    const [displayResults, setDisplayResults] = useState(false);
    const [correctAnswer, setCorrectAnswer] = useState("")
    useEffect(() => {

        axios
            .get("http://localhost:8080/questions")
            .then((res) => {
                // console.log(res.data)
                setAllQuestions(res.data);
                setQuestNum(res.data[num].questionNum)
                setQuestion(res.data[num].question)
                setAnswer1(res.data[num].answer1[0])
                setAnswer2(res.data[num].answer2[0])
                setAnswer3(res.data[num].answer3[0])
                setAnswer4(res.data[num].answer4[0])
               
              
            })
            .catch((err) => {
                console.log("Error fetching data:", err)
            });

    }, [num, score]);
    // console.log(num)
     console.log(choice)
    // console.log(score)

    function newQuestion(currentnum) {
        for (const key in allQuestions[num]) {
            console.log(allQuestions[num][key])
               if(Array.isArray(allQuestions[num][key])&&allQuestions[num][key].includes(
                'true')){
                    setCorrectAnswer(`${choice?"Correct Answer":"Wrong  Answer"} , The Correct Answer is: ${allQuestions[num][key][0]}`)
                }
                
            }
       
       let wait= setTimeout(() => {
        
            if (choice.length !== 0) {
                if (choice == "true") {
                    setScore(score + 1)
                    setChoice('')
                }
                if (choice == "false") {
                    setWrongAnswers(wrongAnswers + 1)
                    setChoice('')
                }
                if (currentnum <= allQuestions.length - 1) {
                    setNum(num + 1)
                    setQuestNum(allQuestions[num].questionNum)
                    setQuestion(allQuestions[num].question)
                    setAnswer1(allQuestions[num].answer1[0])
                    setAnswer2(allQuestions[num].answer2[0])
                    setAnswer3(allQuestions[num].answer3[0])
                    setAnswer4(allQuestions[num].answer4[0])
                    setChoice("")
                } else if (wrongAnswers == 6) {
                    return
                } else if (currentnum > allQuestions.length - 1) {
                    setDisplayResults(true)
                }
                setCorrectAnswer("")
                clearTimeout(wait)
            }
        },1000)//come back
    }

    const reset = () => {
        setDisplayResults(false)
        setChoice('')
        setWrongAnswers(0)
        setNum(0)
    }
console.log(num)
    return (
        <div>
            <section id="hangDiv">

                <div id="score"> Score: {score}</div>
                {wrongAnswers >= 1 ? <img src={head} id="head" /> : ""}
                {wrongAnswers >= 2 ? <img src={body} id="body" /> : ""}
                {wrongAnswers >= 3 ? <img id="leftarm" src={lefta} /> : ""}
                {wrongAnswers >= 4 ? <img id="rightarm" src={righta} /> : ""}
                {wrongAnswers >= 5 ? <img id="leftleg" src={leftl} /> : ""}
                {wrongAnswers == 6 ? <img id="rightleg" src={rightl} /> : ""}
                {wrongAnswers == 6 ? <div id="lose"><h1 >Game Over</h1 >You lose<br /><h1></h1>Final Score: {score}</div> : ""}

                {displayResults ? <div id="win"><h1>Game Over</h1>Score: {score}</div> : ""}

            </section>
            
            <section id="questionDiv">
                <form>
                   
                    <h1 id="questionTitle"> Question <u>{questnum}</u> out of <u>{allQuestions.length}</u></h1>

                    <h2 id="question">{question}?</h2>

                    <div id="answersDiv1">

                        <label htmlFor="answer1" className="answer"> <input id="answer1" type="radio" name="question" value={answer1} onChange={() => setChoice(allQuestions[num].answer1[1])} />{answer1}</label>

                        <label htmlFor="answer2" className="answer"><input id="answer2" type="radio" name="question" value={answer2} onChange={() => setChoice(allQuestions[num].answer2[1])} />{answer2}</label>

                        <label htmlFor="answer3" className="answer"><input id="answer3" type="radio" name="question" value={answer3} onChange={() => setChoice(allQuestions[num].answer3[1])} />{answer3}</label>

                        <label htmlFor="answer4" className="answer"><input id="answer4" type="radio" name="question" value={answer4} onChange={() => setChoice(allQuestions[num].answer4[1])} />{answer4}</label>

                    </div>
                    <h6> {correctAnswer}</h6>
                </form>

                <button type="button" onClick={() => newQuestion(questnum)}>Submit</button><br />
                <button onClick={reset}>Reset</button>
            </section>

        </div>
    )
}
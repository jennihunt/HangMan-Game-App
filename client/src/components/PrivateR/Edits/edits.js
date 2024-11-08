import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./edits.css"

export default function Edits() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [userState, setUserState] = useState([])
    const [questionInfo, setQuestionInfo] = useState([])
    const [question, setQuestion] = useState()
    const [answer1, setAnswer1] = useState()
    const [answer2, setAnswer2] = useState()
    const [answer3, setAnswer3] = useState()
    const [answer4, setAnswer4] = useState()
    const [answer1Bool, setAnswer1Bool] = useState()
    const [answer2Bool, setAnswer2Bool] = useState()
    const [answer3Bool, setAnswer3Bool] = useState()
    const [answer4Bool, setAnswer4Bool] = useState()
    const [bool, setBool] = useState([])

    useEffect(() => {
        axios
            .get("http://localhost:8080/user", {
                withCredentials: true,
            })
            .then((res) => {
                setUserState(res.data)//pulls up currently logged in user
            })
            .catch((error) => console.error(error));

        axios
            .get(`http://localhost:8080/update/${id}`)
            .then((res) => {
                setQuestionInfo(res.data)//pulls up currently logged in user
                //update the bool and answer together and make it where only one answer is chosen as right
                //possibly a boolean that says if answerbool is changed to true then then filter the question info and change the true val to false
                setAnswer1(res.data["answer1"][0])
                setAnswer2(res.data["answer2"][0])
                setAnswer3(res.data["answer3"][0])
                setAnswer4(res.data["answer4"][0])
                setAnswer1Bool(res.data["answer1"][1])
                setAnswer2Bool(res.data["answer2"][1])
                setAnswer3Bool(res.data["answer3"][1])
                setAnswer4Bool(res.data["answer4"][1])
                console.log(res.data)
            })
            .catch((error) => console.error(error));
    }, [])
    
    const handleQuestion = (e) => {
        setQuestionInfo({ ...questionInfo, question: e.target.value });
    };

    const handleAnswer1 = (e) => {
        setAnswer1(e.target.value)
        setQuestionInfo({ ...questionInfo, answer1: [e.target.value, answer1Bool] });
    };

    const handleAnswer1Bool = (e) => {
        for (const key in questionInfo) {
            if (questionInfo[key][1] == true || questionInfo[key][1] == "true") {
                questionInfo[key][1] = 'false'
            }
        }
        setAnswer1Bool(true)
        setQuestionInfo({ ...questionInfo, answer1: [answer1, 'true'] });
    };

    const handleAnswer2 = (e) => {
        setAnswer2(e.target.value)
        setQuestionInfo({ ...questionInfo, answer2: [e.target.value, answer2Bool] });
    };

    const handleAnswer2Bool = (e) => {
        for (const key in questionInfo) {
            if (questionInfo[key][1] == true || questionInfo[key][1] == "true") {
                questionInfo[key][1] = 'false'
            }
        }
        setAnswer2Bool(true)
        setQuestionInfo({ ...questionInfo, answer2: [answer2, 'true'] });
    };

    const handleAnswer3 = (e) => {
        setAnswer3(e.target.value)
        setQuestionInfo({ ...questionInfo, answer3: [e.target.value, answer3Bool] });
    };

    const handleAnswer3Bool = (e) => {
        for (const key in questionInfo) {
            if (questionInfo[key][1] == true || questionInfo[key][1] == "true") {
                questionInfo[key][1] = 'false'
            }
        }
        setAnswer3Bool(true)
        setQuestionInfo({ ...questionInfo, answer3: [answer3, 'true'] });
    };

    const handleAnswer4 = (e) => {
        setAnswer4(e.target.value)
        setQuestionInfo({ ...questionInfo, answer4: [e.target.value, answer4Bool] });
    };

    const handleAnswer4Bool = (e) => {
        console.log(e.target.value)
        for (const key in questionInfo) {
            if (questionInfo[key][1] == true || questionInfo[key][1] == "true") {
                questionInfo[key][1] = 'false'
            }
        }
        setAnswer4Bool(true)
        setQuestionInfo({ ...questionInfo, answer4: [answer4, 'true'] });
    };

    function handleDelete(theId) {
        axios.delete(`http://localhost:8080/update/${theId}`)
            .then((res) => {
                console.log("Question deleted" +res.data)
               setQuestionInfo(questionInfo.filter((question)=>question._id!==theId))             
            })
            .catch((err) => {
                console.log(err)
            });
           navigate("/viewAdd") 
    };

    function handleUpdate(e) {
        e.preventDefault()
        const newQuestion = {
            questionNum: questionInfo.questionNum,
            question: questionInfo.question,
            answer1: questionInfo.answer1,
            answer2: questionInfo.answer2,
            answer3: questionInfo.answer3,
            answer4: questionInfo.answer4
        }

        axios
            .put(`http://localhost:8080/update/${id}`, newQuestion)
            .then((res) => {
                console.log(res.data)

                navigate("/viewAdd");
            })

    }


    return (
        <div>
            <h1> Edit this question</h1>
            <div id="questionEdit">

                <li className="questionli" key={questionInfo.questionNum}>
                    <p>Question: {questionInfo.questionNum}</p>
                    <p>Question:<input className="answerli" value={questionInfo.question} onChange={handleQuestion} />

                    </p>

                    <label>Answer1
                        <input className="answerli" value={answer1} onChange={handleAnswer1} />

                        {answer1Bool == "true" || answer1Bool == true ? "✅ " :

                            <label> Update As correct Answer<input type="radio" id="answer1"
                                name={questionInfo.questionNum}
                                value={answer1Bool}
                                checked={answer1Bool == "true" || answer1Bool == true ? "checked" : ""}
                                onChange={handleAnswer1Bool} //work on check box 
                                className="eidtBubble" /></label>}

                    </label>

                    <br /><br />


                    <label>Answer2
                        <input className="answerli" value={answer2} onChange={handleAnswer2} />

                        {answer2Bool == "true" ? "✅ " :
                            <label>Update As correct Answer<input type="radio" id="answer1"
                                name={questionInfo.questionNum}
                                value={answer2Bool}
                                // checked={question.answer2[1] == "true" ? "checked" : ""}
                                onChange={handleAnswer2Bool}
                                className="eidtBubble" /></label>}

                    </label><br /><br />

                    <label>Answer3
                        <input className="answerli" value={answer3} onChange={handleAnswer3} />

                        {answer3Bool == "true" ? "✅ " :
                            <label> Update As correct Answer<input type="radio" id="answer1"
                                name={questionInfo.questionNum}
                                value={answer3Bool}
                                // checked={question.answer3[1] == "true" ? "checked" : ""}
                                onChange={handleAnswer3Bool}
                                className="eidtBubble" />
                            </label>}
                    </label><br /><br />

                    <label>Answer4
                        <input className="answerli" value={answer4} onChange={handleAnswer4} />

                        {answer4Bool == "true" ? "✅ " :

                            <label> Update As correct Answer<input type="radio" id="answer1"
                                name={questionInfo.questionNum}
                                value={answer4Bool}
                                checked={answer4Bool == "true" || answer4Bool == true ? "checked" : ""}
                                onChange={handleAnswer4Bool}
                                className="eidtBubble" /></label>}

                    </label> <br /><br />

                    <button onClick={handleUpdate}>Update</button>
                    <button onClick={()=>handleDelete(questionInfo._id)}>Delete</button>
                </li>

            </div>
        </div>
    )
}
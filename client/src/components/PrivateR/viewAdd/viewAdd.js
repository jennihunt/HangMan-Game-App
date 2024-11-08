import React, { useEffect, useState } from "react";
import axios from "axios";
import "./viewAdd.css"
import { useParams, useNavigate } from "react-router-dom";

export default function ViewAdd() {

    const navigate = useNavigate();
    const [userState, setUserState] = useState([]);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8080/user", {
                withCredentials: true,
            })
            .then((res) => {
                // console.log(res.data)
                setUserState(res.data)//pulls up currently logged in user
            })
            .catch((error) => console.error(error));

        axios
            .get("http://localhost:8080/questions")
            .then((res) => {
                // console.log(res.data)
                setQuestions(res.data)//pulls up currently logged in user
            })
            .catch((error) => console.error(error));
    }, [])


    function handleUpdate(id) {
        navigate(`/edit/${id}`)
    }

    function handleDelete(theId) {
        axios.delete(`http://localhost:8080/update/${theId}`)
            .then((res) => {
                setQuestions(questions.filter((question) => question._id !== theId))
            })
            .catch((err) => {
                console.log(err)
            });
    };
    return (
        <div>
            <h1> Edited info</h1>
            <h1>still here</h1><div id="questionEdit">
                {questions.map(question => (

                    <li className="questionli" key={question.questionNum}>
                        <p>Question: {question.questionNum}</p>
                        <p>Question: {question.question} </p>

                        <label>Answer1
                            <p>{question.answer1[0]}{question.answer1[1] == "true" ? "✅ " : ""} </p>
                        </label>

                        <br /><br />


                        <label>Answer2
                            <p>{question.answer2[0]}{question.answer2[1] == "true" ? "✅ " : ""} </p>
                        </label><br /><br />

                        <label>Answer3
                            <p>  value={question.answer3[0]} {question.answer3[1] == "true" ? "✅ " : ""}</p>
                        </label><br /><br />

                        <label>Answer4
                            <p>{question.answer4[0]}{question.answer4[1] == "true" ? "✅ " : ""}</p>
                        </label> <br /><br />

                        <button onClick={() => handleUpdate(question._id)}>Update</button>
                        <button onClick={() => handleDelete(question._id)}>Delete</button>
                    </li>

                ))}</div>
        </div>
    )
}
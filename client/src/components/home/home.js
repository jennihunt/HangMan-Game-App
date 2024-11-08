import React, { useState, useEffect } from "react";
import axios from "axios";
import LoginForm from "./loginForm";
import "./home.css"

export default function Home(){


    return(
        <>
        <h1 id="homeTitle">Main Page</h1>
        <section id="homeSection">
            <p id="homeP">
                Hangman is a game most have played in one form or another growing up. In this game we are asking Javascript questions and for every wrong answer you will be able to see a body part. When the whole body shows you lose and see the hangman. There is 2 versions of this you can choose from. The multiple choice option allows you to chose one out of 4 options. The fillin the blank is used like the original version where for each wrong guessed letter you gain a body part and when full body is viewable you lose.
            </p>
        </section>
        <LoginForm/>
        
        </>
    )
}
const express = require('express');
const bodyParser = require('body-parser');
const mongoose=require('mongoose');
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8080;
 const User=require("./loginSchema");
const Question=require("./question")
const AllQuestions=require("./Questions/questions.json")
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");



mongoose.connect('mongodb://127.0.0.1:27017/JSQUIZ', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("MongoDB connected")
    })
    .catch((error) => {
        console.log(error)
    });

app.use(bodyParser.json());
app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
})
);
    
app.use(
    session({
        secret: "secretcode",
        resave: true,
        saveUninitialized: true,
    })

);

app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);


app.get("/questions",async (req, res) => {
  try {    
      const question= await Question.find({});
      res.json(question)
      console.log(question)
  } catch (err) {
      console.error(err);
      res.status(500).send("Error fetching data from database")
  }
})

app.post("/questions", (req, res) => {
 
  const newQuestion = new Question({
    questionNum: req.body.questionNum,
      question: req.body.question,
      answer1: req.body.answer1,
      answer2: req.body.answer2,
      answer3:req.body.answer3,
      answer4: req.body.answer4

  });
  newQuestion.save()
  .then(savedQuestion => {
      console.log("checkout saved:", savedQuestion);
      res.json(savedQuestion);
  })
  .catch(error => {
      console.error("Error savng Question:", error);
      res.status(500).json({ error: " An error occured while saving the Question" })
  });

})

app.get("/update/:id",(req,res)=>{
  Question.findById(req.params.id)
  .then((question)=>res.json(question))
  .catch((err)=>res.status(400).json("Error:"+err))
})



app.put("/update/:id",(req,res)=>{
  Question.findByIdAndUpdate(
    req.params.id,
    {
      questionNum: req.body.questionNum,
      question: req.body.question,
      answer1: req.body.answer1,
      answer2: req.body.answer2,
      answer3:req.body.answer3,
      answer4: req.body.answer4
    },
    {new:true}
  )
  .then((data)=>{
console.log("updated : "+data)
    res.json(data)
  })
  .catch((err)=>{
    console.log("error updating question : "+err)
    res.status(500).send("Error updating Checkouts")
  });
});


app.delete("/update/:id",(req,res)=>{
Question.findByIdAndDelete(req.params.id)
.then((data)=>{
  console.log("question deleted: "+data)
  res.send("question deleted")
})
.catch((err)=>{
  console.log("Error deleting question: "+err)
  res.status(500).send("Error deleting question")
})

})



//-------------------------------------------------------

// POST route for login
app.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;
      if (!user) res.send("Login failed No User Exists");
      else {
        req.logIn(user, (err) => {
          if (err) throw err;
          res.send("Successfully Authenticated");
          console.log(req.user);
        });
      }
    })(req, res, next);
  });
  
  
//   // POST route for registering a new user
  app.post("/register", (req, res) => {
    User.findOne({ username: req.body.username })
      .then((doc) => {
        if (doc) {
          res.send("User Already Exists");
        } else {
          bcrypt
            .hash(req.body.password, 10)
            .then((hashedPassword) => {
              const newUser = new User({
                username: req.body.username,
                password: hashedPassword,
              });
              return newUser.save();
            })
            .then(() => {
              res.send("User Created");
            })
            .catch((err) => {
              throw err;
            });
        }
      })
      .catch((err) => {
        throw err;
      });
  });
  
//   // POST route for logout
  app.post("/logout", (req, res) => {
    if (req.user) {
      req.logout((err) => {
        if (err) throw err;
        res.send("Successfully logged out");
      });
    } else {
      res.send("No user to log out");
    }
  });
  
//   // GET route for user info
  app.get("/user", (req, res) => {
    res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
  });
  

// GET route for user status
app.get("/user/check-authentication", (req, res) => {
    console.log("allowed")
    if (req.isAuthenticated()) {
      // User is authenticated
      res.status(200).json({ isAuthenticated: true });
    } else {
      console.log('Not allowed')
      // User is not authenticated
      res.status(401).json({ isAuthenticated: false });
    }
  });


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
import { useEffect, useRef, useState } from "react"
import HTML from "./assets/images/icon-html.svg"
import CSS from "./assets/images/icon-css.svg"
import JS from "./assets/images/icon-js.svg"
import Accesibility from "./assets/images/icon-accessibility.svg"
import MoonDark from "./assets/images/icon-moon-dark.svg"
import MoonLight from "./assets/images/icon-moon-light.svg"
import SunDark from "./assets/images/icon-sun-dark.svg"
import SunLight from "./assets/images/icon-sun-light.svg"
import QuizHTML from "./API/QuizHTML.json"
import QuizCSS from "./API/QuizCSS.json"
import QuizJS from "./API/QuizJS.json"
import QuizACC from "./API/QuizACC.json"
import "./App.css"

const App = () => {

  console.log("component rendered")

  const [firstPage, setfirstPage] = useState(true);

  // quizpage
  const [lockAns, setlockAns] = useState(false); 
  const [quesNo, setquesNo] = useState(0);
  const [score, setscore] = useState(0);
  const [topic, settopic] = useState([]);
  const [logo, setlogo] = useState(HTML);
  const [title, settitle] = useState("HTML");
  // toggle btn
  const [lightMode, setlightMode] = useState(false);
  // toggle btn
  const Option1 = useRef(null);
  const Option2 = useRef(null);
  const Option3 = useRef(null);
  const Option4 = useRef(null);
  const optionArray = [Option1, Option2, Option3, Option4];

  //firtpage
  const quizPage = (e, topic) => {
    setfirstPage(false);
    if (topic=="HTML") {
      settopic(QuizHTML);
      setlogo(HTML);
      settitle("HTML");
    }
    if (topic=="CSS") {
      settopic(QuizCSS);
      setlogo(CSS);
      settitle("CSS");
    }
    if (topic=="JS") {
      settopic(QuizJS);
      setlogo(JS);
      settitle("JavaScript");
    }
    if (topic=="ACC") {
      settopic(QuizACC);
      setlogo(Accesibility);
      settitle("Accesibility");
    }
    document.querySelector(".logo-container").style.visibility="visible"
  }

  // quizpage
  const checkAns= (e, optClicked) => {
    if (lockAns===false) {
      if (optClicked==topic[quesNo].Answer) {
        setscore(score+1);
        e.target.classList.add("right");
        setlockAns(true);
        console.log("good")
      }
      else {
        e.target.classList.add("wrong");
        optionArray[topic[quesNo].Answer-1].current.classList.add("right");
        setlockAns(true);
        console.log("bad")
      }
    }
    optionArray.map((curElem) => {
      curElem.current.classList.add("noliboxshadow");
    })
  }

  // quizpage
  const nextQues = () => {
    if (lockAns===true) {
      setquesNo(quesNo+1);
      setlockAns(false);
      optionArray.map((curElem) => {
        curElem.current.classList.remove("right");
        curElem.current.classList.remove("wrong");
        curElem.current.classList.remove("noliboxshadow")
      })
      document.querySelector(".prog").style.width=`${((quesNo+1)/topic.length)*100}%`;
    }
  }

  // resultspage
  const playAgain = () => {
    setfirstPage(true);
    setlockAns(false);
    setquesNo(0);
    setscore(0);
    settopic([]);
    setlogo(HTML)
    document.querySelector(".logo-container").style.visibility="hidden"
  }

// toggle-btn

  useEffect(() => {
    document.querySelector(".toggle-btn").classList.toggle("toggle-btn-dark")
    document.body.classList.toggle("body-dark");
    const paragraphs = document.body.getElementsByTagName("p");
    for (let i = 0; i < paragraphs.length; i++) {
      paragraphs[i].classList.toggle("p-dark");
    }
    const lists = document.body.getElementsByTagName("li");
    for (let i = 0; i < lists.length; i++) {
      lists[i].classList.toggle("li-dark");
    }
    document.querySelector(".logo-container").classList.toggle("logo-container-dark");
    if (firstPage==false && quesNo==topic.length) {
      document.querySelector(".results-container").classList.toggle("results-container-dark")
    }
  }, [lightMode])
  
  useEffect(() => {
    if (firstPage==false && quesNo==topic.length) {
      if (lightMode==true) {
        document.querySelector(".results-container").classList.remove("results-container-dark")
      }
      if (lightMode==false) {
        document.querySelector(".results-container").classList.add("results-container-dark")
      }
    }
  }, [(quesNo==topic.length)])

  useEffect(() => {
    if ((firstPage===false || quesNo==topic.length) && lightMode===false) {
      const lists = document.body.getElementsByTagName("li");
      for (let i = 0; i < lists.length; i++) {
        lists[i].classList.add("li-dark");
      }
      const paragraphs = document.body.getElementsByTagName("p");
      for (let i = 0; i < paragraphs.length; i++) {
        paragraphs[i].classList.add("p-dark");
      }
    }
  }, [firstPage,(quesNo==topic.length)])

// firstpage
  if (firstPage===true) {
    return (
    <>
    <main>
      <div className="btn-container">
        <div className="logo-container">
        <span>HTML</span><figure className="html-icon"><img src={logo} alt="" /></figure>
        </div>
        <div className="toggle-btn-container">
          <img src={lightMode ? SunDark:SunLight} alt="" />
          <div className="toggle-btn" onClick={() => setlightMode(!lightMode)}></div>
          <img src={lightMode ? MoonDark:MoonLight} alt="" />
        </div>
      </div>
      <div className="main-container">
        <div className="heading-container">
          <h1 className="h1">Welcome to the <span>Frontend Quiz!</span></h1>
          <p>Pick a subject to get started.</p>
        </div>
        <div className="quiz-container">
          <ul>
            <li onClick={(e) => quizPage(e, "HTML")}>
              <figure className="html-icon"><img src={HTML} alt="" /></figure>
              HTML
            </li>
            <li onClick={(e) => quizPage(e, "CSS")}>
              <figure className="css-icon"><img src={CSS} alt="" /></figure>
              CSS
            </li>
            <li onClick={(e) => quizPage(e, "JS")}>
              <figure className="javascript-icon"><img src={JS} alt="" /></figure>
              JavaScript
            </li>
            <li onClick={(e) => quizPage(e, "ACC")}>
              <figure className="accessibility-icon"><img src={Accesibility} alt="" /></figure>
              Accessibility
            </li>
          </ul>
        </div>
      </div>
    </main>
    </>
    )
  }

// quizpage
  if (firstPage===false && !(quesNo==topic.length)) {
    return (
    <>
    <main>
      <div className="btn-container">
        <div className="logo-container">
        <span>{title}</span><figure className={`${title.toLowerCase()}-icon`}><img src={logo} alt="" /></figure>
        </div>
        <div className="toggle-btn-container">
          <img src={lightMode ? SunDark:SunLight} alt="" />
          <div className="toggle-btn" onClick={() => setlightMode(!lightMode)}></div>
          <img src={lightMode ? MoonDark:MoonLight} alt="" />
        </div>
      </div>
      <div className="main-container">
        <div className="heading-pbar-cont">
          <div className="heading-container heading-container-100w">
            <p>Question {quesNo+1} of {topic.length}</p>
            <h2>{topic[quesNo].Question}</h2>
          </div>
          <div className="progress-bar">
              <div className="prog"></div>
          </div>
        </div>
        <div className="quiz-container">
          <ol>
            <li ref={Option1} onClick={(e) => checkAns(e,1)}>{topic[quesNo].Option1}</li>
            <li ref={Option2} onClick={(e) => checkAns(e,2)}>{topic[quesNo].Option2}</li>
            <li ref={Option3} onClick={(e) => checkAns(e,3)}>{topic[quesNo].Option3}</li>
            <li ref={Option4} onClick={(e) => checkAns(e,4)}>{topic[quesNo].Option4}</li>
          </ol>
          <button className="bottom-button" onClick={(e) => nextQues(e)}>Next</button>
        </div>
      </div>
    </main>
    </>
    )
  }

// resultpage
  if (quesNo==topic.length) {
    return (
    <>
    <main>
      <div className="btn-container">
        <div className="logo-container">
        <span>{title}</span><figure className={`${title.toLowerCase()}-icon`}><img src={logo} alt="" /></figure>
        </div>
        <div className="toggle-btn-container">
          <img src={lightMode ? SunDark:SunLight} alt="" />
          <div className="toggle-btn" onClick={() => setlightMode(!lightMode)}></div>
          <img src={lightMode ? MoonDark:MoonLight} alt="" />
        </div>
      </div>
      <div className="main-container">
        <div className="heading-container results-heading">
          <h2>Quiz completed<br /><span>You scored...</span></h2>
        </div>
        <div className="results-and-button-container">
          <div className="results-container">
            <div className="top">
              <figure className="html-icon"><img src={HTML} alt="" /></figure>
              <p>HTML</p>
            </div>
            <p className="score">{score}</p>
            <p>out of {topic.length}</p>
          </div>
          <button className="bottom-button" onClick={() => playAgain()}>Play Again</button>
        </div>
      </div>
    </main>
    </>
    )
  }
}

export default App;



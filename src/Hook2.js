import "./styles.css";
import { render } from "@testing-library/react";
import ReactDOM from 'react-dom';
import React, { useState, useEffect, useRef } from "react";
import c1 from './c1.wav';
import d1 from './d1.wav';
import e1 from './e1.wav';
import f1 from './f1.wav';
import g1 from './g1.wav';
import a1 from './a1.wav';
import b1 from './b1.wav';
import c2 from './c2.wav';
import d2 from './d2.wav';
import e2 from './e2.wav';
import f2 from './f2.wav';
import g2 from './g2.wav';



const oscillatorValues = ["sine", "sawtooth", "square", "triangle"];

const Hook2 = () => {

  let dailyDay = [1,2,3,4,5];
  let dailyDate = ["01062022","02062022","03062022","04062022","05062022","06062022","07062022","08062022","09062022","10062022","11062022","12062022","13062022","14062022","15062022","16062022","17062022","18062022","19062022","20062022","21062022","22062022","23062022","24062022","25062022","26062022","27062022","28062022","29062022","30062022",
"01072022","02072022","03072022","04072022","05072022","06072022","07072022","08072022","09072022","10072022","11072022","12072022","13072022","14072022","15072022","16072022","17072022","18072022","19072022","20072022","21072022","22072022","23072022","24072022","25072022","26072022","27072022","28072022","29072022","30072022","31072022"];

  let dailyNotesEasy = [
    ["E","D","E","G","E"],["G","G","E","D","C"],["D","G","G","C","C"],["F","G","D","D","E"],["D","E","D","D","C"],["C","D","D","C","F"],["D","C","G","D","G"],["E","E","E","G","G"],["G","F","F","E","D"],["C","G","D","F","F"],["D","C","C","C","D"],["D","C","E","D","E"],["G","F","F","F","F"],["E","D","C","G","D"],["F","D","G","F","F"],["C","C","D","G","G"],["E","F","D","F","E"],["F","F","G","D","C"],["G","C","D","F","F"],["C","C","E","E","F"],["C","C","D","F","G"],["G","D","G","C","C"],["C","D","D","D","G"],["E","C","E","D","C"],["D","E","E","G","D"],["F","F","E","E","G"],["D","G","D","D","D"],["D","F","C","D","G"],["G","F","G","G","C"],["G","F","F","C","D"],
    ["E","D","G","G","D"],["E","G","G","G","E"],["F","F","F","G","C"],["F","G","D","E","C"],["F","C","C","C","E"],["E","E","F","G","E"],["G","F","C","F","F"],["F","E","D","D","C"],["G","C","C","E","D"],["E","G","G","G","E"],["C","G","D","E","E"],["D","G","E","C","D"],["D","G","F","C","C"],["G","E","G","E","E"],["F","E","G","C","C"],["E","E","D","F","C"],["E","E","G","D","G"],["E","D","F","D","C"],["F","C","C","F","G"],["D","G","G","G","E"],["F","E","E","F","C"],["E","D","F","E","D"],["C","F","C","F","G"],["C","C","F","E","E"],["C","E","D","C","G"],["G","G","G","F","C"],["F","C","C","D","C"],["F","G","G","G","G"],["E","F","D","C","E"],["E","D","D","F","E"],["F","D","G","D","C"]
  ];

  let dailyNotesHard = [
    ["E","e","e","f","C"],["c","D","g","F","b"],["f","c","F","C","F"],["g","b","d","f","c"],["D","G","F","E","C"],["F","D","F","e","g"],["D","G","c","G","c"],["C","b","d","a","c"],["e","c","D","E","G"],["d","C","D","b","F"],["E","C","G","e","E"],["e","g","G","E","b"],["f","e","G","C","G"],["f","D","c","d","e"],["C","F","d","e","b"],["c","F","g","G","D"],["f","G","D","b","c"],["d","f","d","f","D"],["G","d","b","C","G"],["f","E","G","b","a"],["F","a","b","D","b"],["c","a","E","e","g"],["f","D","b","E","D"],["b","D","c","c","d"],["C","b","F","d","a"],["D","d","F","c","c"],["e","f","D","F","c"],["f","E","b","C","a"],["e","g","e","a","e"],["C","c","a","c","f"],
    ["e","d","C","D","C"],["b","f","C","f","d"],["b","b","e","a","b"],["e","F","d","g","f"],["e","b","F","D","D"],["C","a","f","e","F"],["a","D","F","e","c"],["a","b","b","d","a"],["g","e","g","D","D"],["G","g","F","D","c"],["d","f","b","f","E"],["a","a","C","a","D"],["f","e","a","G","G"],["d","C","f","C","G"],["C","E","b","g","C"],["F","d","b","G","b"],["d","F","g","G","F"],["b","C","D","C","F"],["D","f","G","C","F"],["G","c","e","C","D"],["E","C","b","f","a"],["G","E","E","G","d"],["e","F","E","f","a"],["g","g","f","b","d"],["F","E","C","a","d"],["d","d","E","a","d"],["a","g","d","c","E"],["e","C","E","e","C"],["d","d","F","c","E"],["e","d","F","g","D"],["e","f","C","D","C"]
  ];


  // const finished = localStorage.getItem('finished')==='true' || false;
  const [done, setDone] = useState(false);

  let globalDate = new Date();
  let globalToday = ("0" + globalDate.getDate()).slice(-2) + ("0" + (globalDate.getMonth() + 1)).slice(-2) + globalDate.getFullYear().toString();

  let storageDate = localStorage.getItem('date');

  const [matrix, setMatrix] = useState(Array.from({length: 6},()=> Array.from({length: 5}, () => "")));
  const [correctMatrix, setCorrectMatrix] = useState(Array.from({length: 6},()=> Array.from({length: 5}, () => 0)));

  /*useEffect(() => {
    if (storageDate == null || storageDate !== globalToday) {
      storageDate = globalToday;
      localStorage.setItem("date", storageDate);
      localStorage.setItem("guessMatrix", JSON.stringify(matrix));
      localStorage.setItem("colorMatrix", JSON.stringify(correctMatrix));
    }

    else {
      let storageMatrix = JSON.parse(localStorage.getItem('guessMatrix'));
      setMatrix(storageMatrix)

      let storageColorMatrix = JSON.parse(localStorage.getItem('colorMatrix'));
      setCorrectMatrix(storageColorMatrix)

    }
  }, [])*/



  const [answer, setAnswer] = useState(["", "", "", "", ""]);
  const [notesTune, setNotesTune] = useState([null, null, null, null, null]);
  const [easy, setEasy] = useState(true);
  const [daily, setDaily] = useState(true);

  const [col, setCol] = useState(0);
  const [row, setRow] = useState(0);

  // const [done, setDone] = useState(false);

  const [answerMessage, setAnswerMessage] = useState("");


  const ref = useRef();

  let playing = false;

  let notesArray = [c1, d1, e1, f1, g1, a1, b1, c2, d2, e2, f2, g2];
  let namesArray = ["c", "d", "e", "f", "g", "a", "b", "C", "D", "E", "F", "G"];

  const useModal = () => {
    const [isShowing, setIsShowing] = useState(false);
    function toggle() {
      setIsShowing(!isShowing);
    }
    return {
      isShowing,
      toggle,
    }
  };

  const iPhone = () => {
    if (navigator.userAgent.match(/Mobile/)) {
    document.getElementById('changeMe').innerHTML = 'Services Are everywhere';
    }
  }

  const {isShowing, toggle} = useModal();

  const WinModal = ({ isShowing, hide }) => {
    const [copyClicked, setCopyClicked] = useState(false);
    if (isShowing) {
      return (
        ReactDOM.createPortal(
          <React.Fragment>
            <div className="modal-overlay"/>
            <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
              <div className="modal">
                  <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <center>
                  <p>
                    Congratulations!
                  </p>
                  <p>
                    You did it!
                  </p>
                  <div>
                   <div class="popup">
                      <button onClick={()=> { copyPaste(); setCopyClicked(true);} } className="copy">SHARE</button>
                    </div>
                  </div>
                  <div className="modal-copied">
                  <p>
                  {copyClicked? "Copied to Clipboard" : null}
                  </p>
                  </div>
                  </center>
              </div>
            </div>
          </React.Fragment>, document.body
        )
      );
    }
    else return null;
  }

  const useModal2 = () => {
    const [isShowing2, setIsShowing2] = useState(false);
    function toggle2() {
      setIsShowing2(!isShowing2);
    }
    return {
      isShowing2,
      toggle2,
    }
  };

  const {isShowing2, toggle2} = useModal2();

  const HelpModal = ({ isShowing, hide }) => {
    const [copyClicked, setCopyClicked] = useState(false);
    if (isShowing) {
      return (
        ReactDOM.createPortal(
          <React.Fragment>
            <div className="modal-overlay"/>
            <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
              <div className="modal-help">
                  <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <p>HOW TO PLAY</p>
                  <br></br>
                  <p>Click on Play to hear a sequence of 5 notes</p>
                  <p>You have 6 chances to guess the right sequence</p>
                  <center>
                  <textarea readOnly className="text-helpcor">G</textarea>
                  <textarea readOnly className="text-help">F</textarea>
                  <textarea readOnly className="text-help">C</textarea>
                  <textarea readOnly className="text-help">G</textarea>
                  <textarea readOnly className="text-help">E</textarea>
                  <p>A green square 🟩 means you're right</p>

                  <textarea readOnly className="text-help">G</textarea>
                  <textarea readOnly className="text-help">C</textarea>
                  <textarea readOnly className="text-helpblank">D</textarea>
                  <textarea readOnly className="text-help">F</textarea>
                  <textarea readOnly className="text-help">D</textarea>
                  <p>A grey square ⬜️ means you're incorrect</p>
                  </center>
                  <p>The orange C is middle C</p>

                  <p>Click on "Middle C" to hear middle C as a reference point</p>
                  <p>Use Hard Mode to add a wider range of notes</p>
                  <br></br>
                  <p class="desktop" id="changeMe">GOOD LUCK!</p>
                  <p class="mobile" id="changeMe"></p>
              </div>
            </div>
          </React.Fragment>, document.body
        )
      );
    }
    else return null;
  }

  // useEffect(() => {
  //   setDone(localStorage.getItem("done")==="true");
  //   if (done) {
  //     console.log(correctMatrix);
  //     setCorrectMatrix(JSON.parse(localStorage.getItem("correctMatrix")));
  //   }
  // }, [done]);


  useEffect(() => {


    let rangeNote = 5;
    let baseNote = 7;

    let date = new Date();
    let today = ("0" + date.getDate()).slice(-2) + ("0" + (date.getMonth() + 1)).slice(-2) + date.getFullYear().toString();
    //let today = date.getDate().toString() + date.getMonth().toString() + date.getFullYear().toString();
    // let today = 3;
    console.log("date is " + today);
    let dailyDateIndex = dailyDate.indexOf(today);
    console.log("date index is " + dailyDateIndex);

    if (daily) {
      if (easy) {
        for (let i=0; i<5; i++) {
          answer[i] = dailyNotesEasy[dailyDateIndex][i];
        }
        if (storageDate == null || storageDate !== globalToday) {
          storageDate = globalToday;
          let tempMatrix = Array.from({length: 6},()=> Array.from({length: 5}, () => ""));
          let tempCorrectMatrix = Array.from({length: 6},()=> Array.from({length: 5}, () => 0));
          setMatrix(tempMatrix);
          setCorrectMatrix(tempCorrectMatrix);
          localStorage.setItem("date", storageDate);
          localStorage.setItem("guessMatrix", JSON.stringify(matrix));
          localStorage.setItem("colorMatrix", JSON.stringify(correctMatrix));
          setCol(0);
          setRow(0);
          setDone(false);
          var popup = document.getElementById("myPopup");
          popup.classList.toggle("show",false);
        }
        else {
          let storageMatrix = JSON.parse(localStorage.getItem('guessMatrix'));
          setMatrix(storageMatrix)

          let storageColorMatrix = JSON.parse(localStorage.getItem('colorMatrix'));
          setCorrectMatrix(storageColorMatrix)

          let foundSpot = false;
          for (let i=0; i<6; i++) {
            if (storageColorMatrix[i].join("") == "11111") {
              setRow(i);
              setCol(5);
              setDone(true);
              toggle();
              break;
            }
            else {
                for (let j=0; j<5; j++) {
                  if (storageColorMatrix[i][j] == "") {
                    setRow(i);
                    setCol(j);
                    foundSpot = true;
                  }
                  if (foundSpot) { break };
              }
            }
            if (foundSpot) { break };
          }
        }
      }
      else {
        for (let i=0; i<5; i++) {
          answer[i] = dailyNotesHard[dailyDateIndex][i];
        }
        if (localStorage.getItem("guessHardMatrix") == null) {
          let tempMatrix = Array.from({length: 6},()=> Array.from({length: 5}, () => ""));
          let tempCorrectMatrix = Array.from({length: 6},()=> Array.from({length: 5}, () => 0));
          setMatrix(tempMatrix);
          setCorrectMatrix(tempCorrectMatrix);
          localStorage.setItem("guessHardMatrix", JSON.stringify(tempMatrix));
          localStorage.setItem("colorHardMatrix", JSON.stringify(tempCorrectMatrix));
          setCol(0);
          setRow(0);
          setDone(false);
          var popup = document.getElementById("myPopup");
          popup.classList.toggle("show",false);
        }
        else {
          let storageMatrix = JSON.parse(localStorage.getItem('guessHardMatrix'));
          setMatrix(storageMatrix)

          let storageColorMatrix = JSON.parse(localStorage.getItem('colorHardMatrix'));
          setCorrectMatrix(storageColorMatrix)

          let foundSpot = false;
          for (let i=0; i<6; i++) {
            if (storageColorMatrix[i].join("") == "11111") {
              setRow(i);
              setCol(5);
              setDone(true);
              toggle();
              break;
            }
            else {
                for (let j=0; j<5; j++) {
                  if (storageColorMatrix[i][j] == "") {
                    setRow(i);
                    setCol(j);
                    foundSpot = true;
                  }
                  if (foundSpot) { break };
              }
            }
            if (foundSpot) { break };
          }
        }
      }
      for (let i=0; i<5; i++) {
        let noteIndex = namesArray.indexOf(answer[i]);
        notesTune[i] = new Audio(notesArray[noteIndex]);
      }
    }

    if (!daily) {
      if (!easy) {
        rangeNote = 11;
        baseNote = 0;
      }
      for (let i=0; i<5; i++) {
        let tmp = Math.floor(Math.random() * rangeNote) + baseNote;
        answer[i] = namesArray[tmp];
        notesTune[i] = new Audio(notesArray[tmp]);
      };

      setCol(0);
      setRow(0);
      let matrixCopy = Array.from({length: 6},()=> Array.from({length: 5}, () => ""));
      let correctMatrixCopy = Array.from({length: 6},()=> Array.from({length: 5}, () => 0));
      setMatrix(matrixCopy);
      setCorrectMatrix(correctMatrixCopy);
      setDone(false);
      var popup = document.getElementById("myPopup");
      popup.classList.toggle("show",false);
    }


    let answerString = "Answer: ";
    for (let i=0; i<5; i++) {
      answerString = answerString.concat(answer[i]);
    }
    setAnswerMessage(answerString);
    console.log(answerString);
  }, [easy, daily]);


  const play0 = () => notesTune[0].play();
  const play1 = () => notesTune[1].play();
  const play2 = () => notesTune[2].play();
  const play3 = () => notesTune[3].play();
  const play4 = () => notesTune[4].play();

  const handlePlay = () => {
    if (done && !daily) {
      let rangeNote = 5;
      let baseNote = 7;

      if (!easy) {
        rangeNote = 11;
        baseNote = 0;
      }
      for (let i=0; i<5; i++) {
        let tmp = Math.floor(Math.random() * rangeNote) + baseNote;
        answer[i] = namesArray[tmp];
        notesTune[i] = new Audio(notesArray[tmp]);
      };

      let answerString = "Answer: ";
      for (let i=0; i<5; i++) {
        answerString = answerString.concat(answer[i]);
      }

      setAnswerMessage(answerString);
      setCol(0);
      setRow(0);
      let matrixCopy = Array.from({length: 6},()=> Array.from({length: 5}, () => ""));
      let correctMatrixCopy = Array.from({length: 6},()=> Array.from({length: 5}, () => 0));
      setMatrix(matrixCopy);
      setCorrectMatrix(correctMatrixCopy);
      setDone(false);
      var popup = document.getElementById("myPopup");
      popup.classList.toggle("show",false);
    }

    else {
      if (done && daily) {
        let date = new Date();
        let today = ("0" + date.getDate()).slice(-2) + ("0" + (date.getMonth() + 1)).slice(-2) + date.getFullYear().toString();
        console.log("date is " + today);
        let dailyDateIndex = dailyDate.indexOf(today);
        console.log("date index is " + dailyDateIndex);

        if (easy) {
          setAnswer(dailyNotesEasy[dailyDateIndex]);
        }
        else {
          setAnswer(dailyNotesHard[dailyDateIndex]);
        }
        for (let i=0; i<5; i++) {
          let noteIndex = namesArray.indexOf(answer[i]);
          notesTune[i] = new Audio(notesArray[noteIndex]);
        }
      }
      playing = true;
      const buttonPlay = document.getElementById("play");
      play0();
      notesTune[0].addEventListener('ended', play1);
      notesTune[1].addEventListener('ended', play2);
      notesTune[2].addEventListener('ended', play3);
      notesTune[3].addEventListener('ended', play4);
      notesTune[4].addEventListener('ended', function() {
        playing = false;
        return () => {
          notesTune[0].removeEventListener('ended', play1);
          notesTune[1].removeEventListener('ended', play2);
          notesTune[2].removeEventListener('ended', play3);
          notesTune[3].removeEventListener('ended', play4);
          notesTune[4].removeEventListener('ended', () => playing=false);
        };
      },false);
    }
  }

  const playMiddleC = () => {
    let middleC = new Audio(c2);
    middleC.play();
  }

  function message() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }

  const estVal = (note) => {
    if (col < 5) {
      let matrixcopy = [...matrix];
      matrixcopy[row][col]=note;
      setMatrix(matrixcopy);
      let tmpcol = col + 1;
      setCol(tmpcol);
    }
  };

  const disabler = (note) => {
    let easyNotes = ["C", "D", "E", "F", "G"];
    if (col < 5 && easy && (easyNotes.indexOf(note) > -1)) {
        let matrixcopy = [...matrix];
        matrixcopy[row][col]=note;
        setMatrix(matrixcopy);
        let tmpcol = col + 1;
        setCol(tmpcol);
        }
    else if (col < 5 && !easy) {
      let matrixcopy = [...matrix];
      matrixcopy[row][col]=note;
      setMatrix(matrixcopy);
      let tmpcol = col + 1;
      setCol(tmpcol);
    }
  };

  const del = () => {
    if (col > 0) {
      let tmpcol = col - 1;
      let matrixcopy = [...matrix];
      matrixcopy[row][col-1]="";
      setMatrix(matrixcopy);
      setCol(tmpcol);
    }
  }
  const answerSpace = () => {
    console.log("here");
    let space = "";
    space = space.concat(answer[0]);
    space = space.concat(" ");
    space = space.concat(answer[1]);
    space = space.concat(" ");
    space = space.concat(answer[2]);
    space = space.concat(" ");
    space = space.concat(answer[3]);
    space = space.concat(" ");
    space = space.concat(answer[4]);
    return space;
  }


  function copyPaste() {
    console.log(correctMatrix);
    let iconString = "";
    iconString = iconString.concat("Completed in ");
    iconString = iconString.concat(row+1);
    iconString = iconString.concat("/6");
    if (!easy) iconString = iconString.concat("*");
    iconString = iconString.concat("\n");
    iconString = iconString.concat("\n");
    for (let i = 0; i <= row; i++) {
      for (let g = 0; g <= col; g++) {
        if (correctMatrix[i][g] == 1) {
        iconString = iconString.concat("🟩");
        }
        if (correctMatrix[i][g] == 2) {
          iconString = iconString.concat("⬜️");
        }
      }
      iconString = iconString.concat("\n");
    }
    console.log(iconString);

    const copyToClipboard = (text) => navigator.clipboard?.writeText && navigator.clipboard.writeText(text);

    copyToClipboard(iconString);

    // navigator.clipboard.writeText(iconString).then(() => {
    //     console.log("successfully copied");
    //   })
    //   .catch(err => {
    //     console.log("copy went wrong error:" + err);
    //   });
  }

  const ent = () => {
    if (col > 4) {
      var x = false;
      for (let i = 0; i < answer.length; i++) {
        if (matrix[row][i] == answer[i]) {
          let correctcopy = [...correctMatrix];
          correctcopy[row][i] = 1;
          setCorrectMatrix(correctcopy);
        }
        else {
          let correctcopy = [...correctMatrix];
          correctcopy[row][i] = 2;
          setCorrectMatrix(correctcopy);
        }
      }

      if (easy && daily) {
        localStorage.setItem('guessMatrix', JSON.stringify(matrix));
        localStorage.setItem('colorMatrix', JSON.stringify(correctMatrix));
      }
      else if (!easy && daily) {
        localStorage.setItem('guessHardMatrix', JSON.stringify(matrix));
        localStorage.setItem('colorHardMatrix', JSON.stringify(correctMatrix));
      }

      for (let z = 0; z < answer.length; z++) {
        if (matrix[row][z] == answer[z]) {
          x = true;
        }
        else {
          x = false;
          break;
        }
      }
      if (x == false) {
        if (row == 5) {
          message();
          setDone(true);
        }
        else {
          setCol(0);
          let tmprow = row + 1;
          setRow(tmprow);
        }
      }
      else {
        setDone(true);
        if (easy) {
          localStorage.setItem("guessMatrix", JSON.stringify(matrix));
          localStorage.setItem("colorMatrix", JSON.stringify(correctMatrix));
          // localStorage.setItem("finished", true.toString());
        }
        else {
          localStorage.setItem("guessHardMatrix", JSON.stringify(matrix));
          localStorage.setItem("colorHardMatrix", JSON.stringify(correctMatrix));
          // localStorage.setItem("finished", true.toString());
        }
        toggle();
      }
    }

  }

  return (
    <div>
      <div id="topbox"></div>
      <div id="leftbox" >
        <button className="button-help" color="#ff5c5c" onClick={toggle2}>Help</button>
        <WinModal
          isShowing={isShowing || localStorage.getItem("done")==="true"}
          hide={toggle}
        />
        <HelpModal
          isShowing={isShowing2}
          hide={toggle2}
        />
      </div>
      <div id="middlebox">
        <center>
        <h2 className="header">
          PITCHR
        </h2>
        </center>
      </div>

      <div id="rightbox">
        <label class="switch">
          <input type="checkbox" onClick={()=>{ setEasy(!easy); } }></input>
          <span class="slider round"></span>
        </label>
      </div>
      
      <div id="switchbox">
        <div className="slider-text">
          {easy? "Easy" : "Hard"}
        </div>
      </div>

      <div id="rightunderbox">
        <label class="switch">
          <input type="checkbox" onClick={()=>{ setDaily(!daily); } }></input>
          <span class="slider round"></span>
        </label>
        <br></br>
        <div className="slider-text">
            {daily? "Daily" : "Practice"}
        </div>
      </div>

      <div id="break">
        <center>
          <div class="popup" onClick={message}>
            <span class="popuptext" id="myPopup">{answerMessage}</span>
          </div>
        </center>
      </div>

      <div>
        <center>
          <textarea readOnly className={correctMatrix[0][0] == 0? "text-boxes" : correctMatrix[0][0] == 1? "text-cor" : "text-blank"} value={matrix[0][0]}>
          </textarea>

          <textarea readOnly className={correctMatrix[0][1] == 0? "text-boxes" : correctMatrix[0][1] == 1? "text-cor" : "text-blank"} value={matrix[0][1]}>

          </textarea>

          <textarea readOnly className={correctMatrix[0][2] == 0? "text-boxes" : correctMatrix[0][2] == 1? "text-cor" : "text-blank"} value={matrix[0][2]}>

          </textarea>

          <textarea readOnly className={correctMatrix[0][3] == 0? "text-boxes" : correctMatrix[0][3] == 1? "text-cor" : "text-blank"} value={matrix[0][3]}>

          </textarea>

          <textarea readOnly className={correctMatrix[0][4] == 0? "text-boxes" : correctMatrix[0][4] == 1? "text-cor" : "text-blank"} value={matrix[0][4]}>

          </textarea>
        </center>
      </div>

      <div>
      <center>
          <textarea readOnly className={correctMatrix[1][0] == 0? "text-boxes" : correctMatrix[1][0] == 1? "text-cor" : "text-blank"} value={matrix[1][0]}>

          </textarea>

          <textarea readOnly className={correctMatrix[1][1] == 0? "text-boxes" : correctMatrix[1][1] == 1? "text-cor" : "text-blank"} value={matrix[1][1]}>

          </textarea>

          <textarea readOnly className={correctMatrix[1][2] == 0? "text-boxes" : correctMatrix[1][2] == 1? "text-cor" : "text-blank"} value={matrix[1][2]}>

          </textarea>

          <textarea readOnly className={correctMatrix[1][3] == 0? "text-boxes" : correctMatrix[1][3] == 1? "text-cor" : "text-blank"} value={matrix[1][3]}>

          </textarea>

          <textarea readOnly className={correctMatrix[1][4] == 0? "text-boxes" : correctMatrix[1][4] == 1? "text-cor" : "text-blank"} value={matrix[1][4]}>

          </textarea>
        </center>
      </div>

      <div>
      <center>
      <textarea readOnly className={correctMatrix[2][0] == 0? "text-boxes" : correctMatrix[2][0] == 1? "text-cor" : "text-blank"} value={matrix[2][0]}>

      </textarea>

      <textarea readOnly className={correctMatrix[2][1] == 0? "text-boxes" : correctMatrix[2][1] == 1? "text-cor" : "text-blank"} value={matrix[2][1]}>

      </textarea>

      <textarea readOnly className={correctMatrix[2][2] == 0? "text-boxes" : correctMatrix[2][2] == 1? "text-cor" : "text-blank"} value={matrix[2][2]}>

      </textarea>

      <textarea readOnly className={correctMatrix[2][3] == 0? "text-boxes" : correctMatrix[2][3] == 1? "text-cor" : "text-blank"} value={matrix[2][3]}>

      </textarea>

      <textarea readOnly className={correctMatrix[2][4] == 0? "text-boxes" : correctMatrix[2][4] == 1? "text-cor" : "text-blank"} value={matrix[2][4]}>

      </textarea>
        </center>
      </div>

      <div>
        <center>
        <textarea readOnly className={correctMatrix[3][0] == 0? "text-boxes" : correctMatrix[3][0] == 1? "text-cor" : "text-blank"} value={matrix[3][0]}>

        </textarea>

        <textarea readOnly className={correctMatrix[3][1] == 0? "text-boxes" : correctMatrix[3][1] == 1? "text-cor" : "text-blank"} value={matrix[3][1]}>

        </textarea>

        <textarea readOnly className={correctMatrix[3][2] == 0? "text-boxes" : correctMatrix[3][2] == 1? "text-cor" : "text-blank"} value={matrix[3][2]}>

        </textarea>

        <textarea readOnly className={correctMatrix[3][3] == 0? "text-boxes" : correctMatrix[3][3] == 1? "text-cor" : "text-blank"} value={matrix[3][3]}>

        </textarea>

        <textarea readOnly className={correctMatrix[3][4] == 0? "text-boxes" : correctMatrix[3][4] == 1? "text-cor" : "text-blank"} value={matrix[3][4]}>

        </textarea>
        </center>
      </div>

      <div>
      <center>
      <textarea readOnly className={correctMatrix[4][0] == 0? "text-boxes" : correctMatrix[4][0] == 1? "text-cor" : "text-blank"} value={matrix[4][0]}>

      </textarea>

      <textarea readOnly className={correctMatrix[4][1] == 0? "text-boxes" : correctMatrix[4][1] == 1? "text-cor" : "text-blank"} value={matrix[4][1]}>

      </textarea>

      <textarea readOnly className={correctMatrix[4][2] == 0? "text-boxes" : correctMatrix[4][2] == 1? "text-cor" : "text-blank"} value={matrix[4][2]}>

      </textarea>

      <textarea readOnly className={correctMatrix[4][3] == 0? "text-boxes" : correctMatrix[4][3] == 1? "text-cor" : "text-blank"} value={matrix[4][3]}>

      </textarea>

      <textarea readOnly className={correctMatrix[4][4] == 0? "text-boxes" : correctMatrix[4][4] == 1? "text-cor" : "text-blank"} value={matrix[4][4]}>

      </textarea>
        </center>
      </div>

      <div className="border">
      <center>
      <textarea readOnly className={correctMatrix[5][0] == 0? "text-boxes" : correctMatrix[5][0] == 1? "text-cor" : "text-blank"} value={matrix[5][0]}>

      </textarea>

      <textarea readOnly className={correctMatrix[5][1] == 0? "text-boxes" : correctMatrix[5][1] == 1? "text-cor" : "text-blank"} value={matrix[5][1]}>

      </textarea>

      <textarea readOnly className={correctMatrix[5][2] == 0? "text-boxes" : correctMatrix[5][2] == 1? "text-cor" : "text-blank"} value={matrix[5][2]}>

      </textarea>

      <textarea readOnly className={correctMatrix[5][3] == 0? "text-boxes" : correctMatrix[5][3] == 1? "text-cor" : "text-blank"} value={matrix[5][3]}>

      </textarea>

      <textarea readOnly className={correctMatrix[5][4] == 0? "text-boxes" : correctMatrix[5][4] == 1? "text-cor" : "text-blank"} value={matrix[5][4]}>

      </textarea>
        </center>
      </div>
      <br></br>
      {easy? (
        <div id="what">
          <center>
          <button className={"keys-MiddleC"} onClick={ ()=>{ estVal("C"); } }>C</button>
          <button className={"keys"} onClick={ ()=>{ estVal("D"); } }>D</button>
          <button className={"keys"} onClick={ ()=>{ estVal("E"); } }>E</button>
          <button className={"keys"} onClick={ ()=>{ estVal("F"); } }>F</button>
          <button className={"keys"} onClick={ ()=>{ estVal("G"); } }>G</button>
          </center>
        </div>
      ) : (
        <div id="what">
          <center>
          <button className={"keys"} onClick={ ()=>{ disabler("c"); }}>c</button>
          <button className={"keys"} onClick={ ()=>{ disabler("d"); } }>d</button>
          <button className={"keys"} onClick={ ()=>{ disabler("e"); } }>e</button>
          <button className={"keys"} onClick={ ()=>{ disabler("f"); } }>f</button>
          <button className={"keys"} onClick={ ()=>{ disabler("g"); } }>g</button>
          <button className={"keys"} onClick={ ()=>{ disabler("a"); } }>a</button>
          <button className={"keys"} onClick={ ()=>{ disabler("b"); } }>b</button>
          <button className={"keys-MiddleC"} onClick={ ()=>{ estVal("C"); } }>C</button>
          <button className={"keys"} onClick={ ()=>{ estVal("D"); } }>D</button>
          <button className={"keys"} onClick={ ()=>{ estVal("E"); } }>E</button>
          <button className={"keys"} onClick={ ()=>{ estVal("F"); } }>F</button>
          <button className={"keys"} onClick={ ()=>{ estVal("G"); } }>G</button>
          </center>
        </div>
      )}
      <br></br>
      <div className="parentElement" id="backspace">
        <button className="delete" onClick={del}>
          Delete
        </button>
      </div>
      <div className="parentElement" id="play">
        <button className={(done && !daily)? "again" : "play"} onClick={handlePlay}>
          {(done && !daily)? "Again?" : "Play"}
        </button>
      </div>
      <div className="parentElement" id="enter">
        <button className="enter" onClick={ent}>
          Enter
        </button>
      </div>
      <div id="underbox">
      <center>
        <button className="playC" onClick={playMiddleC}>
          Middle C
        </button>
        </center>
      </div>
  </div>
  );

}

export default Hook2;

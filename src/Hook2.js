import "./styles.css";
import { render } from "@testing-library/react";
// import Flippy, { FrontSide, BackSide } from 'react-flippy';
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
import useModal from "./useModal";
import Modal from "./Modal";

const oscillatorValues = ["sine", "sawtooth", "square", "triangle"];

const Hook2 = () => {

  const [matrix, setMatrix] = useState(Array.from({length: 6},()=> Array.from({length: 5}, () => "")));
  const [correctMatrix, setCorrectMatrix] = useState(Array.from({length: 6},()=> Array.from({length: 5}, () => 0)));
  const [answer, setAnswer] = useState(["", "", "", "", ""]);
  const [notesTune, setNotesTune] = useState([null, null, null, null, null]);
  const [easy, setEasy] = useState(true);
  
  const {isShowing, flip} = useModal();

  const [col, setCol] = useState(0);
  const [row, setRow] = useState(0);

  const [done, setDone] = useState(false);



  // let matrix = Array.from({length: 6},()=> Array.from({length: 5}, () => null));
  // let correctMatrix = Array.from({length: 6},()=> Array.from({length: 5}, () => 0));

  const ref = useRef();
  // const [answer, setAnswer] = useState(["", "", "", "", ""]);

  let playing = false;

  let notesArray = [c1, d1, e1, f1, g1, a1, b1, c2, d2, e2, f2, g2];
  let namesArray = ["c", "d", "e", "f", "g", "a", "b", "C", "D", "E", "F", "G"];

  // let notesTune = [null, null, null, null, null];
  // let answer = ["", "", "", "", ""];
  const randNum = () => {
    let num = 4;
    if (easy) {
      num = 4;
      return num;
    }
    else if (!easy) {
      num = 11;
      return num;
    }
  };

  useEffect(() => {
    let rangeNote = 4;
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
  }, [easy]);

  const play0 = () => notesTune[0].play();
  const play1 = () => notesTune[1].play();
  const play2 = () => notesTune[2].play();
  const play3 = () => notesTune[3].play();
  const play4 = () => notesTune[4].play();

  const handlePlay = () => {
    if (done) {
      window.location.reload(false);
    }
    else {
      playing = true;
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
      console.log("final list is " + answer);
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

  function myFunction() {
    var popup = document.getElementById("display");
    popup.classList.toggle("show");
    console.log("Hello");
  }

  function answerMessage() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }
  
  function message2() {
    var display = document.getElementById("thisDisplay");
    display.classList.toggle("show");
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

  const click = () => {
    message2();
  }

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
  function copyPaste() {
    let iconString = "";
    iconString = iconString.concat("Completed in ");
    iconString = iconString.concat(row+1);
    iconString = iconString.concat("/6");
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
    navigator.clipboard.writeText(iconString);
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
        setCol(0);
        let tmprow = row + 1;
        setRow(tmprow);
      }
      else {
        setDone(true);
        message();
      }
    }
    
  }

  return (
    <div>
      <div id="topbox"></div>
        <div id="leftbox">
          <button className={playing ? "bg" : "bgWhite"} onClick={playMiddleC} className="playC">
            Middle C
          </button>
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

      <div id="break"></div>
      <center>
      <div id="break2">
        <div class="popup" onclick="message">
          <center></center>
          <span class="popuptext" id="myPopup">You got it!</span>
        </div>
      </div>
      </center>

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
      <div>
        <center>
        <button className={easy? "keysDisable" : "keys"} onClick={ ()=>{ disabler("c"); } }>c</button>
        <button className={easy? "keysDisable" : "keys"} onClick={ ()=>{ disabler("d"); } }>d</button>
        <button className={easy? "keysDisable" : "keys"} onClick={ ()=>{ disabler("e"); } }>e</button>
        <button className={easy? "keysDisable" : "keys"} onClick={ ()=>{ disabler("f"); } }>f</button>
        <button className={easy? "keysDisable" : "keys"} onClick={ ()=>{ disabler("g"); } }>g</button>
        <button className={easy? "keysDisable" : "keys"} onClick={ ()=>{ disabler("a"); } }>a</button>
        <button className={easy? "keysDisable" : "keys"} onClick={ ()=>{ disabler("b"); } }>b</button>
        <button className={easy? "keys-MiddleCEasy" : "keys-MiddleC"} onClick={ ()=>{ estVal("C"); } }>C</button>
        <button className={easy? "keysEasy": "keys"} onClick={ ()=>{ estVal("D"); } }>D</button>
        <button className={easy? "keysEasy": "keys"} onClick={ ()=>{ estVal("E"); } }>E</button>
        <button className={easy? "keysEasy": "keys"} onClick={ ()=>{ estVal("F"); } }>F</button>
        <button className={easy? "keysEasy": "keys"} onClick={ ()=>{ estVal("G"); } }>G</button>
        </center>
      </div>
      <br></br>
      <div className="parentElement" id="backspace">
        <button className="delete" onClick={del}>
          Delete
        </button>
      </div>
      <div className="parentElement" id="play">
        <button className="play" onClick={handlePlay}>
          {done? "Again?" : "Play"}
        </button>
      </div>
      <div className="parentElement" id="enter">
        <button className="enter" onClick={ent}>
          Enter
        </button>
      </div>
      {/* <div className="header">{isShowing?"true":"false"}</div>
      <div>
      <button className="button-default" onClick={flip}>Show Modal</button>
      <Modal
        isShowing={isShowing}
        hide={flip}
      />
    </div> */}
      <div>
        <button onClick={copyPaste()} className="copy">SHARE</button>
      </div>
  </div>
  );

}

export default Hook2;
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

  const [matrix, setMatrix] = useState(Array.from({length: 6},()=> Array.from({length: 5}, () => "")));
  const [correctMatrix, setCorrectMatrix] = useState(Array.from({length: 6},()=> Array.from({length: 5}, () => 0)));
  const [answer, setAnswer] = useState(["", "", "", "", ""]);
  const [notesTune, setNotesTune] = useState([null, null, null, null, null]);
  const [easy, setEasy] = useState(true);

  const [col, setCol] = useState(0);
  const [row, setRow] = useState(0);

  const [done, setDone] = useState(false);


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
                   <div class="popup" onclick="message">
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
                  <p>A green square 🟩 means you're right</p>
                  <p>A grey square ⬜️ means you're incorrect</p>
                  <br></br>
                  <p>The orange C is middle C</p>
                  <p>Click on "Middle C" to hear middle C as a reference point</p>
                  <p>Use Hard Mode to add a wider range of notes</p>
                  <br></br>
                  <p>GOOD LUCK!</p>
              </div>
            </div>
          </React.Fragment>, document.body
        )
      );
    }
    else return null;
  }


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
    }
  }

  const playMiddleC = () => {
    let middleC = new Audio(c2);
    middleC.play();
  }

  function myFunction() {
    document.getElementById("mainFrameOne").style.display="none";
    document.getElementById("mainFrameTwo").style.display="block";
  }

  function funcname(){
    document.write("<br/>  <br/> <br/> some text");
  }

  function message() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }

  function myFunction() {
    var popup = document.getElementById("display");
    popup.classList.toggle("show");
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

  function hide() {
    var div = document.getElementyById('what');
    div.style.display = 'none';

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
        toggle();
        // message();
      }
    }

  }

  return (
    <div>
      <div id="topbox"></div>
      <div id="leftbox" >
        <button className="button-help" color="#ff5c5c" onClick={toggle2}>Help</button>
        <WinModal
          isShowing={isShowing}
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
      {easy? "Easy Mode" : "Hard Mode"}
      </div>
      </div>

      <div id="break"></div>

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
        <button className="play" onClick={handlePlay}>
          {done? "Again?" : "Play"}
        </button>
      </div>
      <div className="parentElement" id="enter">
        <button className="enter" onClick={ent}>
          Enter
        </button>
      </div>
      <div id="underbox">
      <center>
        <button className={playing ? "bg" : "bgWhite"} onClick={playMiddleC} className="playC">
          Middle C
        </button>
        </center>
      </div>
  </div>
  );

}

export default Hook2;

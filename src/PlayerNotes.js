import React, { useState, useEffect } from "react";
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

const Player = () => {
  let playing = false;
  // const [playing, setPlaying] = useState(false);

  let notesArray = [c1, d1, e1, f1, g1, a1, b1, c2, d2, e2, f2, g2];
  let namesArray = ["c1", "d1", "e1", "f1", "g1", "a1", "b1", "c2", "d2", "e2", "f2", "g2"];

  let namesTune = ["", "", "", "", ""];
  let notesTune = [null, null, null, null, null];

  useEffect( () => {
    for (let i=0; i<5; i++) {
      let tmp = Math.floor(Math.random() * 11);
      namesTune[i] = namesArray[tmp];
      notesTune[i] = new Audio(notesArray[tmp]);
    }

  }, []);

  // for (let i=0; i<5; i++) {
  //   let tmp = Math.floor(Math.random() * 11);
  //   namesTune[i] = namesArray[tmp];
  //   notesTune[i] = new Audio(notesArray[tmp]);
  // }
  //
  const play0 = () => notesTune[0].play();
  const play1 = () => notesTune[1].play();
  const play2 = () => notesTune[2].play();
  const play3 = () => notesTune[3].play();
  const play4 = () => notesTune[4].play();

  const handlePlay = () => {
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
    console.log("final list is " + namesTune);
  }

  const playMiddleC = () => {
    let middleC = new Audio(c2);
    middleC.play();
  }

  return (
    <div>
      <button onClick={ playing? null : handlePlay }>{playing ? "Playing" : "Play"}</button>
      {namesTune}
      <button onClick={ playMiddleC }>Middle C</button>
    </div>
  );
};

export default Player;

  // useEffect(() => {
  //     audio1.play();
  //     audio1.addEventListener('ended', () => audio2.play());
  //     audio2.addEventListener('ended', () => audio3.play());
  //     audio3.addEventListener('ended', function() {
  //       setPlaying(false);
  //       return () => {
  //         audio1.removeEventListener('ended', () => audio2.play());
  //         audio2.removeEventListener('ended', () => audio3.play());
  //         audio3.removeEventListener('ended', () => setPlaying(false));
  //       };
  //     },false);
  //   }
  // );

  // useEffect(() => {
  //       playing ? audio.play() : audio.pause();
  //     },
  //     [playing]
  //   );

  // useEffect(() => {
  //     if (playing && count<10) {
  //       audio.play();
  //       let tmp = count;
  //       tmp++;
  //       setCount(tmp);
  //       let tmpcount = (count)%3;
  //       setAudio(new Audio(tunes[tmpcount]));
  //       console.log(count + " " + tunes[tmpcount]);
  //       setPlaying(false);
  //     }
  //     else {
  //       audio.pause();
  //     }
  //   },
  //   [playing]
  // );

  // useEffect(() => {
  //   audio.addEventListener('ended', () => setPlaying(false));
  //   return () => {
  //     audio.removeEventListener('ended', () => setPlaying(false));
  //   };
  // }, []);

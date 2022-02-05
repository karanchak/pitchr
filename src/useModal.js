import { useState } from 'react';

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  function flip() {
    console.log("showing is" + isShowing);
    setIsShowing(!isShowing);
    console.log("after set showing is" + isShowing);
    console.log("flip was activated");
  }

  return {
    isShowing,
    flip,
  }
};

export default useModal;
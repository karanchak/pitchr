import { useState } from 'react';

const useModal = () => {
  const [visible, setVisible] = useState(false);
  function toggle() {
      console.log('it is pressed');
    setVisible(!visible);    
  }
  return {toggle, visible}
};

export default useModal;
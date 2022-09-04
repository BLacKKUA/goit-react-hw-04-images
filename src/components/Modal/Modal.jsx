import { useEffect } from 'react';
import { Overlay, Modalist } from './Modal.styled';

const Modal = ({ onClose, Url, Tags }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(
    () => () => {
      window.removeEventListener('keydown', handleKeyDown);
    },
    []
  );

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const backDropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };
  return (
    <Overlay onClick={backDropClick}>
      <Modalist>
        <img src={Url} alt={Tags} />
      </Modalist>
    </Overlay>
  );
};
export default Modal;

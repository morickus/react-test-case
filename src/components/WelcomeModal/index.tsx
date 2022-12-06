import React, { FC, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { setUserName } from "../../store/userSlice";
import { useAppDispatch } from "../../hook";

interface IWelcomeModal {
  show: boolean
}

const WelcomeModal: FC<IWelcomeModal> = (props) => {
  const { show } = props;
  const [name, setName] = useState('');
  const dispatch = useAppDispatch();

  const handlerSave = () => {
    dispatch(setUserName(name));
  }

  return (
    <Modal show={show}>
      <Modal.Body>
        <Form>
          <Form.Label>Введите ваше имя:</Form.Label>
          <Form.Control
            type="input"
            placeholder="Имя"
            autoFocus
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button disabled={!name} variant="primary" onClick={handlerSave}>
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WelcomeModal;
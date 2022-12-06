import React, { FC, useEffect, useState } from 'react';
import styles from "../Column/styles.module.scss";
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import { useAppDispatch, useAppSelector } from "../../hook";
import {
  Card as CardType,
  setDescriptionCard,
  setTitleCard,
  deleteCard,
  addCommentCard
} from "../../store/cardSlice";
import Comment from "../Comment";

interface ICard {
  titleColumn: string
}

const Card: FC<ICard & CardType> = (props) => {
  const { id, title, author, comments, description, titleColumn } = props;
  const dispatch = useAppDispatch();
  const [modal, setModal] = useState(false);
  const [cardDescription, setCardDescription] = useState(description);
  const [textComment, setTextComment] = useState('');

  const userName = useAppSelector(state => state.user.item.name);

  const [editTitle, setEditTitle] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  useEffect(() => {
    setCardDescription(description)
  }, [description])

  const onBlurTitle = () => {
    dispatch(setTitleCard({id, title: newTitle}))
    setEditTitle(false);
  }

  const saveDescription = () => {
    dispatch(setDescriptionCard({ id, description: cardDescription }))
    setCardDescription(description);
  }

  const newComment = () => {
    dispatch(addCommentCard({ idCard: id, text: textComment, author: userName }))
    setTextComment('')
  }

  return (
    <>
      <div className={styles.card} onClick={() => setModal(true)}>
        <p>{title}</p>
        <hr/>
        <span>автор: {author}</span><br/>
        <span>комментарий: {comments.length}</span>
      </div>

      <Modal show={modal} onHide={() => setModal(false)} className={styles.modal}>
        <Modal.Header closeButton />
        <Modal.Body>
          {editTitle ? (
            <input
              className={styles['input-title']}
              defaultValue={title}
              onChange={e => setNewTitle(e.target.value)}
              autoFocus={true}
              onBlur={onBlurTitle}
            />
          ) : (
            <p className={styles.title} onClick={() => setEditTitle(true)}>{title}</p>
          )}
          <div>
            <span>в колонке: {titleColumn}</span>
            <p>автор: {author}</p>
            <p><u className={styles.pointer} onClick={() => dispatch(deleteCard(id))}>удалить карточку</u></p>
          </div>
          <Form>
            <Form.Group className="mb-4">
              <Form.Label><b>Описание</b></Form.Label>
              <Form.Control
                as="textarea"
                className="mb-2"
                placeholder="Добавить более подробное описание…"
                value={cardDescription}
                onChange={e => setCardDescription(e.target.value)}
              />
              <Button variant="primary" disabled={cardDescription === description} onClick={saveDescription}>
                Сохранить
              </Button>
            </Form.Group>
            <Form.Group>
              <Form.Label><b>Комментарии</b></Form.Label>
              <Form.Control
                as="textarea"
                rows={1}
                className="mb-2"
                placeholder="Напишите комментарий…"
                value={textComment}
                onChange={e => setTextComment(e.target.value)}
              />
              <Button variant="primary" disabled={!textComment} onClick={newComment}>
                Сохранить
              </Button>
            </Form.Group>
          </Form>
          {!!comments.length && (
            <>
              <hr/>
              {comments.map(i => <Comment key={i.id} idCard={id} {...i} />)}
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Card;
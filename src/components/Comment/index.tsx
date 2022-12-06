import React, { FC, useState } from 'react';
import styles from "../Column/styles.module.scss";
import Form from "react-bootstrap/Form";
import { Comment as CommentType } from "../../store/cardSlice";
import { editCommentCard, deleteCommentCard } from "../../store/cardSlice";
import { useAppDispatch } from "../../hook";

interface IComment {
  idCard: number
}

const Comment: FC<IComment & CommentType> = (props) => {
  const { idCard, id, text, author } = props;
  const dispatch = useAppDispatch();

  const [editComment, setEditComment] = useState(false);
  const [newText, setNewText] = useState(text);

  const onBlurText = () => {
    dispatch(editCommentCard({id, idCard: idCard, text: newText}))
    setEditComment(false);
  }

  return (
    <div className={styles.comment}>
      {editComment ? (
        <Form.Control
          autoFocus
          as="textarea"
          value={newText}
          className="mb-2"
          onBlur={onBlurText}
          onChange={e => setNewText(e.target.value)}
        />
      ) : (
        <p onClick={() => setEditComment(true)}>{text}</p>
      )}
      <hr/>
      <span>автор: <b>{author}</b></span><br/>
      <u className={styles.pointer} onClick={() => dispatch(deleteCommentCard({id, idCard: idCard}))}>удалить</u>
    </div>
  );
};

export default Comment;
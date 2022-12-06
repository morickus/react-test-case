import React, {FC, useState} from 'react';
import styles from './styles.module.scss';
import { useAppDispatch, useAppSelector } from "../../hook";
import { renameColumn } from "../../store/boardSlice";
import { addCard } from "../../store/cardSlice";
import CloseButton from 'react-bootstrap/CloseButton';
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import Card from "../Card";

interface IColumn {
  id: number
  title: string
}

const Column: FC<IColumn> = (props) => {
  const { id, title } = props;
  const dispatch = useAppDispatch();
  const userName = useAppSelector(state => state.user.item.name);
  const cards = useAppSelector(state => state.card.list.filter(i => i.idColumn === id));

  const [editTitle, setEditTitle] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const [isNewCard, setIsNewCard] = useState(false);
  const [titleNewCard, setTitleNewCard] = useState('');

  const clearCard = () => {
    setIsNewCard(false);
    setTitleNewCard('');
  }

  const onBlurTitle = () => {
    dispatch(renameColumn({id, title: newTitle}))
    setEditTitle(false);
  }

  const onBlurCard = () => {
    titleNewCard ? addNewCard() : clearCard();
  }

  const addNewCard = () => {
    dispatch(addCard({idColumn: id, title: titleNewCard, author: userName }));
    clearCard();
  }

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        {editTitle ? (
          <input defaultValue={title} onChange={e => setNewTitle(e.target.value)} autoFocus={true} onBlur={onBlurTitle} />
        ) : (
          <span className={styles.title} onClick={() => setEditTitle(true)}>{title}</span>
        )}
      </div>
      <div className={styles.body}>
        {cards && cards.map(i => <Card key={i.id} {...i} titleColumn={title} />)}
        {isNewCard ? (
          <div className={styles['new-card']}>
            <Form className="mb-2">
              <Form.Control
                as="textarea"
                placeholder="Ввести заголовок для этой карточки"
                rows={2}
                autoFocus
                value={titleNewCard}
                onBlur={onBlurCard}
                onChange={e => setTitleNewCard(e.target.value)}
              />
            </Form>
            <div className={styles['new-card__footer']}>
              <Button variant="primary" size="sm" disabled={!titleNewCard} onClick={addNewCard}>
                Добавить карточку
              </Button>
              <CloseButton onClick={clearCard} />
            </div>
          </div>
        ) : (
          <div className={styles['btn-add']} onClick={() => setIsNewCard(true)}>
            + Добавить карточку
          </div>
        )}
      </div>
    </div>
  );
};

export default Column;
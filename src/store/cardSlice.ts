import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Comment = {
  id: number
  author: string
  text: string
}

export type Card = {
  id: number
  idColumn: number
  author: string
  title: string
  description: string
  comments: Comment[]
}

type CardState = {
  list: Card[];
}

const initialState: CardState = {
  list: [],
}

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    addCard(state, action: PayloadAction<{idColumn: number, title: string, author: string}>) {
      state.list.push({
        id: Date.now(),
        idColumn: action.payload.idColumn,
        author: action.payload.author,
        title: action.payload.title,
        description: '',
        comments: [],
      })
    },
    setDescriptionCard(state, action: PayloadAction<{id: number, description: string}>) {
      const card = state.list.find(i => i.id === action.payload.id);
      if (card) {
        card.description = action.payload.description;
      }
    },
    setTitleCard(state, action: PayloadAction<{id: number, title: string}>) {
      const card = state.list.find(i => i.id === action.payload.id);
      if (card) {
        card.title = action.payload.title;
      }
    },
    deleteCard(state, action: PayloadAction<number>) {
      state.list = state.list.filter(i => i.id !== action.payload);
    },
    addCommentCard(state, action: PayloadAction<{idCard: number, text: string, author: string}>) {
      const card = state.list.find(i => i.id === action.payload.idCard);
      if (card) {
        card.comments.push({
          id: Date.now(),
          author: action.payload.author,
          text: action.payload.text,
        })
      }
    },
    editCommentCard(state, action: PayloadAction<{id: number, idCard: number, text: string}>) {
      const card = state.list.find(i => i.id === action.payload.idCard);
      if (card) {
        const comment = card.comments.find(i => i.id === action.payload.id);
        if (comment) {
          comment.text = action.payload.text;
        }
      }
    },
    deleteCommentCard(state, action: PayloadAction<{id: number, idCard: number}>) {
      const card = state.list.find(i => i.id === action.payload.idCard);
      if (card) {
        const comment = card.comments.find(i => i.id === action.payload.id);
        if (comment) {
          card.comments = card.comments.filter(i => i.id !== action.payload.id);
        }
      }
    },
  }
});

export const {
  addCard,
  setDescriptionCard,
  setTitleCard,
  deleteCard,
  addCommentCard,
  editCommentCard,
  deleteCommentCard,
} = cardSlice.actions

export default cardSlice.reducer
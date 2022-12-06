import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type BoardColumn = {
  id: number
  title: string
}

type BoardState = {
  list: BoardColumn[];
}

const initialState: BoardState = {
  list: [
    {id: 1, title: 'TODO'},
    {id: 2, title: 'In Progress'},
    {id: 3, title: 'Testing'},
    {id: 4, title: 'Done'},
  ],
}

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    renameColumn(state, action: PayloadAction<{id: number, title: string}>) {
      const renamedColumn = state.list.find(column => column.id === action.payload.id);
      if (renamedColumn && action.payload.title && renamedColumn.title !== action.payload.title) {
        renamedColumn.title = action.payload.title;
      }
    },
  }
});

export const { renameColumn } = boardSlice.actions

export default boardSlice.reducer
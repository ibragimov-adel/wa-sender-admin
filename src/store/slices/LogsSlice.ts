import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const logsSlice = createSlice({
  name: 'logs',
  initialState: [] as string[],
  reducers: {
    addLog(state, action: PayloadAction<string>) {
      if (state.length >= 300) {
        state.shift();
      }

      state.push(action.payload);
      localStorage.setItem('logs', JSON.stringify(state));
    },
    setLogs(state, action: PayloadAction<string[]>) {
      return action.payload;
    },
  },
});

export const logsActions = logsSlice.actions;

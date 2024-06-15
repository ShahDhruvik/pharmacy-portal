// Definition of the user state that is to be used
import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import { Todo } from '../../../utils/types/todo';

export const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        todos: {
            loading: false,
            current: 0,
            from: 0,
            pages: 0,
            records: [] as Todo[],
            to: 0,
            total: 0,
            adminUsers: 0,
            activeUsers: 0,
        },
    },
    reducers: {
        todoSetState: (state, { payload }) => {
            if (Array.isArray(payload)) {
                for (const obj of payload) {
                    _.set(state, obj.key, obj.value);
                }
            } else {
                _.set(state, payload.key, payload.value);
            }
        },
    },
});

export const { todoSetState } = todoSlice.actions;

export default todoSlice.reducer;

// Definition of the user state that is to be used
import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import { CacheType } from '../../../types/common';



export const todoSlice = createSlice({
    name: 'cache',
    initialState: {
        cache: {
            cacheData: { post: [], user: [], todo1: undefined },
            cacheExpDate: { post: undefined, user: undefined, todo1: undefined }
        } as CacheType
    },
    reducers: {
        cacheSetState: (state, { payload }) => {
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

export const { cacheSetState } = todoSlice.actions;

export default todoSlice.reducer;

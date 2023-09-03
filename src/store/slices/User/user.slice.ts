import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: {
            loading: false,
            current: 0,
            from: 0,
            pages: 0,
            records: [] as any[],
            to: 0,
            total: 0,
            adminUsers: 0,
            activeUsers: 0,
        },
    },
    reducers: {
        userSetState: (state, { payload }) => {
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

export const { userSetState } = userSlice.actions;

export default userSlice.reducer;

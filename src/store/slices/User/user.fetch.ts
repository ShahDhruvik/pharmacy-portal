// Data regarding the store are fetched through an API and state is set for further usage
// Other manipulation can be performed too.
// A slice is created for individual entity.
import { userSetState } from './user.slice';
export const fetchUsers = () => async (dispatch: (arg0: { payload: any; type: "user/userSetState"; }) => void) => {
    try {
        dispatch(userSetState([{ key: 'users.loading', value: true }]));
        const res = await fetch('/api/users', {
            cache: 'no-store',
        });
        const { data } = await res.json();
        dispatch(
            userSetState([
                { key: 'users.loading', value: false },
                { key: 'users.current', value: data?.length },
                { key: 'users.from', value: data?.length },
                { key: 'users.pages', value: data?.length },
                { key: 'users.records', value: data },
                { key: 'users.to', value: data?.length },
                { key: 'users.total', value: data?.length },
                { key: 'users.adminUsers', value: data?.length },
                { key: 'users.activeUsers', value: data?.length },
            ]),
        );
    } catch (error) {
        console.log(error);
    }
};

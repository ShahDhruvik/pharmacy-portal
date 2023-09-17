// Data regarding the store are fetched through an API and state is set for further usage
// Other manipulation can be performed too.
// A slice is created for individual entity.
import { todoSetState } from './todo.slice';
export const fetchTodos = () => async (dispatch: (arg0: { payload: any; type: "user/todoSetState"; }) => void) => {
    try {
        dispatch(todoSetState([{ key: 'todos.loading', value: true }]));
        const res = await fetch('https://jsonplaceholder.typicode.com/todos',);
        const data = await res.json()
        dispatch(
            todoSetState([
                { key: 'todos.loading', value: false },
                { key: 'todos.current', value: data?.length },
                { key: 'todos.from', value: data?.length },
                { key: 'todos.pages', value: data?.length },
                { key: 'todos.records', value: data },
                { key: 'todos.to', value: data?.length },
                { key: 'todos.total', value: data?.length },
                { key: 'todos.adminUsers', value: data?.length },
                { key: 'todos.activeUsers', value: data?.length },
            ]),
        );
    } catch (error) {
        console.log(error, 'error');
    }
};

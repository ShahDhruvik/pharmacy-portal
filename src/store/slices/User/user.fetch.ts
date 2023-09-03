// // import { COMMON_MESSAGE } from '@/backend-utils/messages';
// import { userSetState } from './user.slice';
// // import { UserModel, UserReqBody } from '@/types/user';

// export const createUser =
//   (values: UserReqBody, navigate: (arg0: string) => void) => async (dispatch: any) => {
//     try {
//       const res = await fetch('/api/users', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Accept: 'application/json',
//         },
//         body: JSON.stringify(values),
//       });
//       const user = await res.json();
//       if (user.success) {
//         alert(COMMON_MESSAGE.Success);
//         navigate('/users');
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

// export const fetchUsers = () => async (dispatch: (arg0: { payload: any; type: "user/userSetState"; }) => void) => {
//   try {
//     dispatch(userSetState([{ key: 'users.loading', value: true }]));
//     const res = await fetch('/api/users', {
//       cache: 'no-store',
//     });
//     const { data } = await res.json();
//     dispatch(
//       userSetState([
//         { key: 'users.loading', value: false },
//         { key: 'users.current', value: data?.length },
//         { key: 'users.from', value: data?.length },
//         { key: 'users.pages', value: data?.length },
//         { key: 'users.records', value: data },
//         { key: 'users.to', value: data?.length },
//         { key: 'users.total', value: data?.length },
//         { key: 'users.adminUsers', value: data?.length },
//         { key: 'users.activeUsers', value: data?.length },
//       ]),
//     );
//   } catch (error) {
//     console.log(error);
//   }
// };

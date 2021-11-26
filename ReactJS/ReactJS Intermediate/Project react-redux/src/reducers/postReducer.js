import { ADD_POST, DELETE_POST } from '../actions/types';
import uuidv4 from 'uuid/v4';

let posts = [
  {
    id: uuidv4(),
    title: 'first title'
  },
]

export default function postReducer(state = posts, action) {
  console.log(`Fourth: reducer sẽ bắt được và dùng state ${state} và action ${action} để tạo ra state mới `);
    console.log(state); console.log(action);
  switch (action.type) {
    case ADD_POST:
      console.log("ADD_POST");
      console.log([...state, action.payload])
      return [...state, action.payload];
    case DELETE_POST:
      console.log("DELETE_POST");
      console.log(state.filter(post => post.id !== action.payload.id));
      return state.filter(post => post.id !== action.payload.id);
    default:
      console.log("DEFAULT");
      console.log(state);
      return state;
  }
}
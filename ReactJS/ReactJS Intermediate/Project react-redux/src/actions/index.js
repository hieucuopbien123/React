import uuidv4 from 'uuid/v4';
import { ADD_POST, DELETE_POST } from './types';

export const createPost = title => ({
  type: ADD_POST,
  payload: {
    id: uuidv4(),
    title
  }
});

export const deletePost = id => {
  console.log(`addNumber lấy đối số ${id} và trả ra 1 object action`)
  console.log(id);
  return {
    type: DELETE_POST,
    payload: {
      id
    }
  }
};
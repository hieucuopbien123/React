import { ADD_POST, REMOVE_POST } from "./const.js";

export var addPost = (text) => {
    return {
        text: text,
        type: ADD_POST
    }
}

export var deletePost = (id) => {
    return {
        type: REMOVE_POST,
        id: id
    }
}
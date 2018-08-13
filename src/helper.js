import data from "./model";

const validateId = (id) => data.find(que => que.id === id);

const validPost = (input) => {
  if (typeof input === "string" && input.length > 10) return true
}

export {validateId , validPost}
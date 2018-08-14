import data from "./model";

const validateId = (id) => data.find(que => que.id === id);

export default  validateId 
import axios from 'axios';


export const getItems = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/item/');
    const items = response.data;
    return items;
  } catch (error) {
    throw new Error(error.data.response);
  }
}


export const getItem = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3001/api/item/${id}`);
    const item = response.data;
    return item;
  } catch (error) {
    throw new Error(error.data.response);
  }
}


export const addItem = async (item) => {
  try {
    const response = await axios.post(
      'http://localhost:3001/api/item/',
      item,
    );
    const addedItem = response.data;
    return addedItem;
  } catch (error) {
    throw new Error(error.data.response);
  }
} 


export const updateItem = async (item) => {

  const id = item._id;

  try {
    const response = await axios.put(
      `http://localhost:3001/api/item/${id}`,
      item,
    );
    const updatedItem = response.data;
    return updatedItem;
  } catch (error) {
    throw new Error(error.data.response);
  }
} 


export const deleteItem = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:3001/api/item/${id}`);
    const deletedId = response.data.id;
    return (`Deleted ${deletedId}`);
  } catch (error) {
    throw new Error(error.data.response);
  }
}

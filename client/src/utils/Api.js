import axios from 'axios';

export const getItem = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3001/api/item/${id}`);
    const item = response.data;
    return item;
  } catch (error) {
    throw new Error(error);
  }
}


export const addItem = async (item) => {
  try {
    const response = await axios.post(
      'http://localhost:3001/api/item',
      {
        label: item.label,
        description: item.description,
        date: item.date,
        userId: 1,
        status: item.status,
        folder: item.folder
      }
    );
    const addedItem = response.data;
    return addedItem;
  } catch (error) {
    throw new Error(error);
  }
} 


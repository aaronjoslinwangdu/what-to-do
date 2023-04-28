import axios from 'axios';

const BASE_URI = process.env.REACT_APP_BASE_URI;


// ITEMS

export const getItems = async () => {
  try {
    const response = await axios.get(BASE_URI + '/api/item/');
    const items = response.data;
    return items;
  } catch (error) {
    throw new Error(error.data.response);
  }
}


export const getItem = async (id) => {
  try {
    const response = await axios.get(BASE_URI + `/api/item/${id}`);
    const item = response.data;
    return item;
  } catch (error) {
    throw new Error(error.data.response);
  }
}


export const addItem = async (item) => {
  try {
    const response = await axios.post(
      BASE_URI + '/api/item/',
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
      BASE_URI + `/api/item/${id}`,
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
    const response = await axios.delete(BASE_URI + `/api/item/${id}`);
    const deletedId = response.data.id;
    return deletedId;
  } catch (error) {
    throw new Error(error.data.response);
  }
}


// AUTH

export const login = async (email, password) => {
  try {
    const response = await axios.post(
      BASE_URI + '/auth/login',
      { email: email, password: password }
    );
    const accessToken = response.data;
    return accessToken;
  } catch (error) {
    throw new Error(error.data.response);
  }
}


export const register = async (username, email, password) => {
  try {
    const response = await axios.post(
      BASE_URI + '/auth/register',
      { username: username, email: email, password: password }
    );
    const accessToken = response.data;
    return accessToken;
  } catch (error) {
    throw new Error(error.data.response);
  }
}


export const logout = async () => {
  try {
    await axios.get(BASE_URI + '/auth/logout');
  } catch (error) {
    throw new Error(error.data.response);
  }
}


// USERS

export const getUser = async (id) => {
  try {
    const response = await axios.get(BASE_URI + `/user/${id}`);
    const user = response.data;
    return user;
  } catch (error) {
    throw new Error(error.data.response);
  }
}


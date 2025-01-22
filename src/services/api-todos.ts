/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from "axios";

const url = process.env.NEXT_PUBLIC_LOCAL;

export const getAllTodos = async (): Promise<AxiosResponse<any>> => {
  try {
    return axios.get(`${url}/todo`);
  } catch (error) {
    console.error('Error get todos:', error);
    throw error; // Rethrow the error to handle it in the component
  }
}

export const getTodo = async (id: string): Promise<any> => {
  try {
    return axios.post(`${url}/todo/${id}`, { withCredentials: true })
      .then((response) => {
        return response.data;
      });
  } catch (error) {
    console.error('Error get todo:' + id, error);
    throw error; // Rethrow the error to handle it in the component
  }
}

export const UpdateTodo = async (todoId: string, data: any): Promise<any> => {
  try {
    const response = await axios.put(`${url}/todo/${todoId}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error; // Rethrow the error to handle it in the component
  }
};

/**
 * 
 * @param {string} id
 * delete obj by id from the local server 
 */
export const deleteTodo = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${url}/todo/${id}`);
    console.log("Successfully deleted todo with id:", id);
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error; // Rethrow the error to handle it in the calling component
  }
};

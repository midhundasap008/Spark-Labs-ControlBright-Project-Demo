// src/api.ts
import axios from 'axios';
import { FormValueType } from './Feature/types';

export const fetchFeaturs = async () => {
  const response = await axios.get(`/features`);
  return response.data;
};

export const addFeature = async (newTodo: FormValueType) => {
  const response = await axios.post('/features', newTodo);
  return response.data;
};

export const updateFeature = async (updatedTodo: FormValueType) => {
  const response = await axios.put(`/feature/${updatedTodo.id}`, updatedTodo);
  return response.data;
};

export const deleteFeature = async (id: number) => {
  const response = await axios.delete(`/feature/${id}`);
  return response.data;
};
import {StateStorage} from 'zustand/middleware';
import {storage} from '@/services/storage/asyncStorage';

export const persistStorage: StateStorage = {
  getItem: name => storage.getString(name),
  setItem: (name, value) => storage.set(name, value),
  removeItem: name => storage.delete(name),
};

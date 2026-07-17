import {StateStorage} from 'zustand/middleware';
import {storage} from '@/services/storage/mmkv';

export const mmkvStorage: StateStorage = {
  getItem: name => storage.getString(name) ?? null,
  setItem: (name, value) => storage.set(name, value),
  removeItem: name => storage.delete(name),
};

export enum LocalStorageKeys {
    TOKEN = 'TOKEN'
}

export const saveValueToLocalStorage = (key: string, value: string) => {
  window.localStorage.setItem(key, value);
};

export const getValueFromLocalStorage = (key: string) => window.localStorage.getItem(key);

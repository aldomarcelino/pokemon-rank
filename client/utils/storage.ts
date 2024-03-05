export const setLocalStorage = (key: string, value: any) => {
  if (typeof window !== 'undefined') localStorage.setItem(key, JSON.stringify(value));
};
export const getLocalStorage = (key: string) => {
  if (typeof window !== 'undefined') return localStorage.getItem(key);
};

export const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

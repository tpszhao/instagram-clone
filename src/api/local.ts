const localGet = (key: string, alternative: any = []) => {
  const storedString = localStorage.getItem(key);

  if (storedString === null) return alternative;

  return JSON.parse(storedString);
};

const localSet = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export { localGet, localSet };

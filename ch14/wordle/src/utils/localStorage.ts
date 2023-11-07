const CACHE_KEY = "JobReadyReact--Wordle";

export function getData<T>(): T | null {
  const data = localStorage.getItem(CACHE_KEY);
  if (data) {
    return JSON.parse(data) as T;
  }
  return null;
}

export function saveData<T>(data: T) {
  localStorage.setItem(CACHE_KEY, JSON.stringify(data));
}


import { writable } from "svelte/store";

function createThemeStore() {
  const { subscribe, update } = writable('');

  return {
    subscribe,
    setTheme: (theme: string) => update(() => {
      window.localStorage.setItem('theme', theme);
      return theme;
    })
  }
}

export const theme = createThemeStore();
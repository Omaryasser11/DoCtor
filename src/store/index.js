
import { atom, selector } from 'recoil';
export const $Current_Width = atom({
  key: "$Current_Width",
  default: window.innerWidth,
});


export const isFlippedState = atom({
  key: 'isFlippedState',
  default: false,
});


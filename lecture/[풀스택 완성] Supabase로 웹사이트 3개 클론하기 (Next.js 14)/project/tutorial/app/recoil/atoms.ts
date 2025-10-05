import { atom } from 'recoil';

type User = {
  name: string;
  email: string;
}

export const userState = atom<User>({
  key: "userState", // unique ID (with respect to other atoms/selectors)
  default: {
    name: "",
    email: ""
  }, // default value (aka initial value)
});

export interface UserState {
  uid: string | null;
  name: string | null;
  email: string | null;     // ← исправлено
  photoURL?: string | null;
}

export const initialState:UserState = {
    uid: "",
    name: "",
    email: "",
    photoURL: undefined
};
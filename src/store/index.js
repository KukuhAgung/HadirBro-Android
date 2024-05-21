import { create } from "zustand";

export const useData = create((set) => ({
  data: "",
  setData: (Isdata) => set(() => ({ data: Isdata })),
}));

export const useStudent = create((set) => ({
  student: {},
  setStudent: (Isstudent) => set(() => ({ student: Isstudent })),
}));

export const useCheck = create((set) => ({
  isCheck: false,
  setIsCheck: (IsCheck) => set(() => ({ isCheck: IsCheck })),
}));

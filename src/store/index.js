import { create } from "zustand";

export const useData = create((set) => ({
  data: "",
  setData: (Isdata) => set(() => ({ data: Isdata })),
}));

export const usePrevData = create((set) => ({
  prevData: "",
  setPrevData: (data) => set(() => ({ prevData: data })),
}));

export const useStudent = create((set) => ({
  student: {},
  setStudent: (Isstudent) => set(() => ({ student: Isstudent })),
}));

export const useCheck = create((set) => ({
  isCheck: false,
  setIsCheck: (IsCheck) => set(() => ({ isCheck: IsCheck })),
}));

export const useDelete = create((set) => ({
  isDelete: false,
  setIsDelete: (IsDelete) => set(() => ({ isDelete: IsDelete })),
}));

export const useEdit = create((set) => ({
  isEdit: false,
  setIsEdit: (IsEdit) => set(() => ({ isEdit: IsEdit })),
}));

export const useId = create((set) => ({
  isId: false,
  setId: (id) => set(() => ({ isId: id })),
}));


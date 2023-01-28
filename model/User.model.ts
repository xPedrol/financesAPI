import { IExpense } from "./Expense.model";
import { Dayjs } from "dayjs";

export interface ILoginUser {
  email: string;
  password: string;
}

export interface IRegisterUser {
  email: string;
  password: string;
  name: string;
}
export interface IUser {
  id: string;
  email: string;
  name: string;
  createdAt: Dayjs;
  expenses: IExpense[];
  picture?: string;
}

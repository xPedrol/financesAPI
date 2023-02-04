import { Dayjs } from "dayjs";

export interface INote {
  noteGroupId?: string;
  id?: string;
  title: string;
  description?: string;
  createdAt: Dayjs;
  date?: Dayjs;
  color?: string;
  fixed?: boolean;
}

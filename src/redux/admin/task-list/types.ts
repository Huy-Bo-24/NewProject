import { IPageOption } from '~/redux/types';
import { IBase } from '~/types';
import { IBoard } from '../board';

export type CreateTaskListRequest = {
  name: string;
  description?: string;
  boardId?: string;
};
export type UpdateTaskListRequest = {
  id: string;
} & Partial<CreateTaskListRequest>;

export interface ITaskList extends IBase {
  name: string;
  description?: string;
  board?: IBoard;
}

export interface GetTaskListRequest extends IPageOption {}

import { object, string } from 'yup';
import { Option } from '~/types';

export const tasklistSchema = object().shape({
  name: string().required('Name is required'),
  description: string().optional(),
  boardOption: object()
    .shape({
      label: string().required(),
      value: string().required(),
    })
    .optional(),
});

export type TaskListSchemaType = {
  name: string;
  description?: string;
  boardOption?: Option;
};

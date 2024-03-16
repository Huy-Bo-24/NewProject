import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { TaskListAutocomplete } from '~/components';

import { TaskListSchemaType, tasklistSchema } from '~/helpers';

type TaskListFormConditionProps =
  | {
      type: 'create';
      data?: never;
    }
  | {
      type: 'edit';
      data: TaskListSchemaType;
    };

interface TaskListFormProps {
  onSubmit: (data: TaskListSchemaType) => void;
  onClose?: () => void;
  isLoading?: boolean;
}
const TaskListForm = ({
  type,
  data,
  isLoading = false,
  onSubmit,
  onClose,
}: TaskListFormProps & TaskListFormConditionProps) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TaskListSchemaType>({
    resolver: yupResolver<TaskListSchemaType>(tasklistSchema),
    values: data,
    mode: 'onChange',
  });

  const submitBtnLabel = type === 'create' ? 'Create' : 'Save';
  return (
    <Form onSubmit={handleSubmit(onSubmit)} id='task-list-form'>
      <Form.Group className='mb-3'>
        <Form.Label>Name</Form.Label>
        <Form.Control type='text' {...register('name')} />
        {errors.name?.message && (
          <Form.Control.Feedback type='invalid' className='d-block'>
            {errors.name?.message}
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Description</Form.Label>
        <Form.Control as='textarea' rows={3} {...register('description')} />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Board</Form.Label>
        <Controller
          control={control}
          name='boardOption'
          render={({ field: { onChange, onBlur, value } }) => (
            <TaskListAutocomplete<false> isMulti={false} onChange={onChange} onBlur={onBlur} value={value} />
          )}
        />
      </Form.Group>
      <Form.Group className='mb-3 d-flex justify-content-end gap-2'>
        <Button type='submit' form='task-list-form' variant='primary' disabled={isLoading || !isValid}>
          {submitBtnLabel}
        </Button>
        <Button variant='secondary' onClick={onClose}>
          Close
        </Button>
      </Form.Group>
    </Form>
  );
};

export default TaskListForm;

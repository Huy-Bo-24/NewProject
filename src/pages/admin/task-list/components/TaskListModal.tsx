import { useEffect } from 'react';
import { Modal, ModalProps } from 'react-bootstrap';
import { isEmpty } from 'lodash';

import { TaskListSchemaType } from '~/helpers/formSchema';
import { useToast } from '~/hooks';
import { ITaskList, useCreateTaskListMutation, useUpdateTaskListMutation } from '~/redux/admin/task-list';
import TaskListForm from './TaskListForm';
import { convertBoardToOption } from '~/utils';

interface TaskListModalProps extends ModalProps {
  tab?: string;
  tasklist?: ITaskList;
}

const TaskListModal = ({ tasklist, tab, ...props }: TaskListModalProps) => {
  const toast = useToast();
  const [createTaskList, { isLoading: isCreating, isSuccess: isCreatedSuccess }] = useCreateTaskListMutation();
  const [updateTaskList, { isLoading: isUpdating, isSuccess: isEditedSuccess }] = useUpdateTaskListMutation();

  const isLoading = isCreating || isUpdating;

  const title = tab === 'create' ? 'Create new task list' : 'Edit task list';

  const onSubmit = (data: TaskListSchemaType) => {
    if (tab === 'create') {
      createTaskList({ ...data, boardId: data.boardOption?.value });
    }
    if (tasklist && tab === 'edit') {
      updateTaskList({ ...tasklist, ...data, boardId: data.boardOption?.value });
    }
  };

  useEffect(() => {
    if (isCreatedSuccess) {
      props.onHide?.();
      if (tab === 'create') {
        toast('Create taskList successfully');
      }
    }
  }, [isCreatedSuccess]);

  useEffect(() => {
    if (isEditedSuccess) {
      props.onHide?.();
      if (tab === 'edit') {
        toast('Update project successfully');
      }
    }
  }, [isEditedSuccess]);
  return (
    <Modal {...props} size='sm' aria-labelledby='contained-modal-title-vcenter' centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {tab === 'create' && (
          <TaskListForm onSubmit={onSubmit} type='create' onClose={props.onHide} isLoading={isLoading} />
        )}
        {tab === 'edit' && !isEmpty(tasklist) && (
          <TaskListForm
            onSubmit={onSubmit}
            type='edit'
            onClose={props.onHide}
            data={{
              ...tasklist,
              boardOption: convertBoardToOption(tasklist.board),
            }}
            isLoading={isLoading}
          />
        )}
      </Modal.Body>
    </Modal>
  );
};

export { TaskListModal };

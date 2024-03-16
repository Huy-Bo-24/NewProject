import { useEffect } from 'react';
import { Button, Modal, ModalProps, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { useToast } from '~/hooks';
import { useDeleteTaskListMutation, useGetTaskListsQuery } from '~/redux/admin/task-list';

const DeleteTaskListModal = (props: ModalProps) => {
  const toast = useToast();
  const { id } = useParams();

  const [deleteTaskList, { isLoading, isSuccess }] = useDeleteTaskListMutation();
  const { taskList } = useGetTaskListsQuery(
    {},
    {
      selectFromResult: ({ data }) => ({
        taskList: data?.data.find((p) => p.id === id),
      }),
    }
  );

  const onDelete = () => {
    if (id) {
      deleteTaskList(id);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      props.onHide?.();
      toast('Delete task List successfully');
    }
  }, [isSuccess]);

  return (
    <Modal {...props} size='sm' aria-labelledby='contained-modal-title-vcenter' centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>Delete task list</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className='text-center mb-4'>
          <i className='fa-regular fa-triangle-exclamation fs-1 text-warning'></i>
        </Row>
        <Row>
          <p className='fs-4'>
            Are you sure? Delete task List <b>{taskList?.name}</b>
          </p>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={props.onHide}>
          Close
        </Button>
        <Button form='task-list-form' variant='danger' onClick={onDelete} disabled={isLoading}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export { DeleteTaskListModal };

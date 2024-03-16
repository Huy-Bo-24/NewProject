import { CellContext, ColumnDef, PaginationState } from '@tanstack/react-table';
import { useState } from 'react';

import { ITaskList, useGetTaskListsQuery } from '~/redux/admin/task-list';
import { DeleteTaskListModal, TaskListModal, Toolbar } from './components';
import { Table, TableActions } from '~/components';
import { useToggleCRUD } from '~/hooks';

const TaskList = () => {
  const { id, tab, isOpenCreateOrEdit, onClose, onOpen, onOpenCreate } = useToggleCRUD('/admin/task-list');
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data: resData, tasklist } = useGetTaskListsQuery(
    {
      take: pageSize,
      page: pageIndex + 1,
    },
    {
      selectFromResult: (res) => ({ ...res, tasklist: res.data?.data.find((p) => p.id === id) }),
    }
  );
  const renderAction = ({ row: { original } }: CellContext<ITaskList, unknown>) => (
    <TableActions onDelete={() => onOpen('delete', original.id)} onEdit={() => onOpen('edit', original.id)} />
  );
  const tasklists = resData?.data ?? [];
  const columns: ColumnDef<ITaskList>[] = [
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Description',
      accessorKey: 'description',
    },
    {
      header: 'Board',
      accessorKey: 'board.name',
    },
    {
      header: 'Action',
      cell: renderAction,
    },
  ];

  return (
    <div className='p-4'>
      <Toolbar onClickNew={onOpenCreate} />
      <Table
        columns={columns}
        data={tasklists}
        manualPagination
        pagination={{ pageIndex, pageSize }}
        pageCount={resData?.meta.pageCount}
        onPaginationChange={setPagination}
      />
      <TaskListModal show={isOpenCreateOrEdit} onHide={onClose} tab={tab} tasklist={tasklist} />
      <DeleteTaskListModal show={tab === 'delete'} onHide={onClose} />
    </div>
  );
};
export default TaskList;

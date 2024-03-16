import debounce from 'debounce-promise';
import { GroupBase } from 'react-select';
import AsyncSelect, { AsyncProps } from 'react-select/async';
import { ITaskList, useLazyGetTaskListsQuery } from '~/redux/admin/task-list';

import { Option } from '~/types';
import { convertTaskListsToOptions } from '~/utils';

interface TaskListAutocompleteProps<M extends boolean> extends AsyncProps<Option, M, GroupBase<Option>> {
  defaultTaskList?: ITaskList[];
}

const TaskListAutocomplete = <M extends boolean = false>({
  defaultTaskList = [],
  ...props
}: TaskListAutocompleteProps<M>) => {
  const defaultOptions = convertTaskListsToOptions(defaultTaskList);
  const [getTaskLists] = useLazyGetTaskListsQuery();
  const loadOptions = debounce(async (q: string) => {
    const result = await getTaskLists({ q }).unwrap();
    return convertTaskListsToOptions(result.data);
  }, 200);

  return (
    <AsyncSelect<Option, M, GroupBase<Option>>
      cacheOptions
      loadOptions={loadOptions}
      defaultOptions={defaultOptions}
      {...props}
    />
  );
};

export { TaskListAutocomplete };

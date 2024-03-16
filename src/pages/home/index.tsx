import { ColumnDef } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { Table } from '~/components';

interface IProduct {
  id: number;
  title: string;
  branch: string;
  category: string;
  description: string;
}

const Home = () => {
  const [data, setData] = useState<IProduct[]>([]);
  const columns: ColumnDef<IProduct>[] = [
    {
      header: 'ID',
      accessorKey: 'id',
    },
    {
      header: 'Title',
      accessorKey: 'title',
    },
    {
      header: 'Branch',
      accessorKey: 'branch',
    },
    {
      header: 'Category',
      accessorKey: 'category',
    },
    {
      header: 'Description',
      accessorKey: 'description',
    },
  ];

  useEffect(() => {
    fetch('https://653a6a152e42fd0d54d3d74c.mockapi.io/api/v1/products', {
      method: 'GET',
    }).then(async (res) => {
      const resData = await res.json();
      setData(resData);
    });
  }, []);

  return (
    <div className='p-4'>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default Home;

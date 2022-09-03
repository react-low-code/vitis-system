import { useEffect } from 'react';
import { useRequest, config } from 'ice';
import { Table } from 'antd';
import styles from './index.module.css';

export default function Home() {
  const { data: dataSource, error, loading, request: fetchRepos } = useRequest({ url: '/user/get' });

  useEffect(() => {
    (async function () {
      await fetchRepos();
    }());
  }, []);

  return (
    <div className={styles.container}>
      <h2>Home page</h2>
      {
        error ? (
          <div>request error: {error.message}</div>
        ) : (
          <Table
            loading={loading}
            dataSource={dataSource}
            rowKey="id"
          >
            <Table.Column title="ID" dataIndex="id" key="id" />
            <Table.Column title="名称" dataIndex="name" key="name" />
            <Table.Column title="描述" dataIndex="description" key="description" />
          </Table>
        )
      }
    </div>
  );
}

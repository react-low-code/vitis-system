import { useEffect, useState } from 'react';
import { useRequest, useHistory } from 'ice';
import { Table, Button } from 'antd';
import { getAllComponents, Component } from '@/services/market';

export default function () {
  const { data = { total: 0, data: [] }, error, loading, request } = useRequest(getAllComponents);
  const history = useHistory();
  const [page, setPage] = useState<number>(1);
  useEffect(() => {
    request(page, 15);
  }, [page]);

  const gotoDetail = (packageName: string) => () => {
    history.push('/market/detail?packageName=' + packageName);
  };

  const onChange = (valPage: number) => {
    setPage(valPage);
  }

  return (
    <div>
      {error ?
        <div>request error: {error.message}</div> :
        <>
          <Table
            loading={loading}
            dataSource={data.data}
            rowKey="packageName"
            pagination={{ onChange, current: page, total: data.total }}

          >
            <Table.Column title="包名" dataIndex="packageName" key="packageName" width={300} />
            <Table.Column title="最新版本" dataIndex="latest" key="latest" width={100} />
            <Table.Column title="描述" dataIndex="description" key="description" />
            <Table.Column
              title="操作"
              key="action"
              width={100}
              render={(_: any, record: Component) => (<>
                <Button type="link" size="small" onClick={gotoDetail(record.packageName)}>详情</Button>
              </>)}
            />
          </Table>
        </>
      }
    </div>
  )
}
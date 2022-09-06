import { useEffect, useState } from 'react';
import { useRequest } from 'ice';
import { Table, Button } from 'antd';
import { getAllUsers, User, delUser, FormUser, addUser, updateUser } from '@/services/user';
import AddUsrModel from './addUserModel';
import UpdateUserModel from './updateUserModel';

import styles from './index.module.css';

export default function () {
  const { data = [], error, loading, request } = useRequest(getAllUsers);
  const [isAddUser, setIsAddUser] = useState<Boolean>(false);
  const [isUpdateUser, setIsUpdateUser] = useState<Boolean>(false);
  const [current, setCurrent] = useState<User>();
  useEffect(() => {
    request();
  }, []);
  const onDel = (account: string) => async () => {
    await delUser(account);
    request();
  };

  const onConfirmAdd = async (user: FormUser) => {
    await addUser(user);
    request();
    setIsAddUser(false);
  };

  const onConfirmUpdate = async (user: Pick<User, 'editable' | 'releasable' | 'account'>) => {
    await updateUser(user);
    request();
    setIsUpdateUser(false);
  };

  const onWillUpdate = (user: User) => () => {
    setIsUpdateUser(true);
    setCurrent(user);
  };

  return (
    <div>
      {error ?
        <div>request error: {error.message}</div> :
        <>
          <div className={styles.header}>
            <Button type="primary" onClick={() => setIsAddUser(true)}>新增</Button>
          </div>
          <Table
            loading={loading}
            dataSource={data}
            rowKey="account"
            pagination={false}
          >
            <Table.Column title="账号" dataIndex="account" key="account" />
            <Table.Column title="可编辑应用" dataIndex="editable" key="editable" render={(value) => (value ? '是' : '否')} />
            <Table.Column title="可发布应用" dataIndex="releasable" key="releasable" render={(value) => (value ? '是' : '否')} />
            <Table.Column
              title="操作"
              key="action"
              render={(_: any, record: User) => (<>
                <Button type="link" size="small" onClick={onDel(record.account)}>删除</Button>
                <Button type="link" size="small" onClick={onWillUpdate(record)}>编辑</Button>
              </>)}
            />
          </Table>
        </>
      }
      {isAddUser && <AddUsrModel onOk={onConfirmAdd} onClose={() => setIsAddUser(false)} />}
      {isUpdateUser && current && <UpdateUserModel onClose={() => setIsUpdateUser(false)} user={current} onOk={onConfirmUpdate} />}
    </div>
  )
}
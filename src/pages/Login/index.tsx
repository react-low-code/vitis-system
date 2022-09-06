import style from './index.module.css';
import { Form, Input, Button } from 'antd';
import { useHistory } from 'ice';
import { useState } from 'react';
import { FormUser, login } from '@/services/user';

export default function () {
  const [disabled, setDisabled] = useState<boolean>(false);
  const history = useHistory();

  const onFinish = async (values: Pick<FormUser, 'account'|'password'>) => {
    setDisabled(true);
    await login(values);
    setDisabled(false);
    history.replace('/user');
  };

  return (
    <div className={style.login}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="账号"
          name="account"
          rules={[{ required: true, message: '请输入账号' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" block disabled={disabled}>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

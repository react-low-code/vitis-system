import { Modal, Input, Radio, RadioChangeEvent, Button } from 'antd';
import cryptoRandomString from 'crypto-random-string';
import { FormUser } from '@/services/user';
import React, { useState } from 'react';
import styles from './index.module.css';

interface Props {
  onOk: (data: FormUser) => void;
  onClose: () => void;
}

export default function (props: Props) {
  const [account, setAccount] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [editable, setEditable] = useState<boolean>(false);
  const [releasable, setReleasable] = useState<boolean>(false);

  const onOk = () => {
    props.onOk({
      account,
      password,
      editable,
      releasable,
    });
  };
  const onChangeAccount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccount(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onChangeEditable = (e: RadioChangeEvent) => {
    setEditable(e.target.value);
  };

  const onChangeReleasable = (e: RadioChangeEvent) => {
    setReleasable(e.target.value);
  };

  const onGenPW = () => {
    setPassword(cryptoRandomString({ length: 6 }));
  };

  return (
    <Modal title="添加用户" visible onCancel={props.onClose} onOk={onOk}>
      <Input value={account} onChange={onChangeAccount} prefix="账号:" className={styles.row} />
      <Input
        value={password}
        onChange={onChangePassword}
        prefix="密码:"
        className={styles.row}
        suffix={<Button type="dashed" onClick={onGenPW} size="small" >随机密码</Button>}
      />
      <div className={styles.row}>
        <span className={styles.col}>是否能编辑应用:</span>
        <Radio.Group onChange={onChangeEditable} value={editable} >
          <Radio value>是</Radio>
          <Radio value={false}>否</Radio>
        </Radio.Group>
      </div>
      <div className={styles.row}>
        <span className={styles.col}>是否能发布应用:</span>
        <Radio.Group onChange={onChangeReleasable} value={releasable} >
          <Radio value>是</Radio>
          <Radio value={false}>否</Radio>
        </Radio.Group>
      </div>
    </Modal>
  )
}
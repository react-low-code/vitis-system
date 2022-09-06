import { Modal, Input, Radio, RadioChangeEvent } from 'antd';
import { User } from '@/services/user';
import { useState } from 'react';
import styles from './index.module.css';

interface Props {
  user: User;
  onOk: (data: Pick<User, 'editable'|'releasable'|'account'>) => void;
  onClose: () => void;
}

export default function (props: Props) {
  const [editable, setEditable] = useState<boolean>(props.user.editable);
  const [releasable, setReleasable] = useState<boolean>(props.user.releasable);

  const onOk = () => {
    props.onOk({
      editable,
      releasable,
      account: props.user.account,
    });
  };

  const onChangeEditable = (e: RadioChangeEvent) => {
    setEditable(e.target.value);
  };

  const onChangeReleasable = (e: RadioChangeEvent) => {
    setReleasable(e.target.value);
  };

  return (
    <Modal title="更新用户" visible onCancel={props.onClose} onOk={onOk}>
      <Input prefix="账号:" className={styles.row} disabled defaultValue={props.user.account} />
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
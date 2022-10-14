import { useState } from 'react';
import { Modal, Input, message } from 'antd';
import { useHistory } from 'ice';

interface Props {
  onClose: () => void;
  BUName: string;
  open: boolean;
}

export default function (props: Props) {
  const [appName, setAppName] = useState<string>();
  const history = useHistory();
  const [inputStatus, setInputStatus] = useState<'error' | 'warning'>();

  const onChangeAppName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAppName(e.target.value);
    setInputStatus(undefined);
  };
  const onOk = () => {
    if (appName) {
      history.push('/app/edit');
    } else {
      message.warning('输入应用名');
      setInputStatus('error');
    }
  };

  return (
    <Modal
      visible={props.open}
      title="新建应用"
      onCancel={props.onClose}
      onOk={onOk}
      closable={false}
    >
      <Input value={appName} onChange={onChangeAppName} placeholder="请输入" addonBefore="应用名" status={inputStatus} />
    </Modal>
  );
}

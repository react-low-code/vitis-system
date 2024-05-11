import { useState, useEffect } from 'react';
import { Modal, Input, message } from 'antd';
import { useHistory } from 'ice';
import { observer } from 'mobx-react';

import rootStore from '@/stores';

interface Props {
  onClose: () => void;
  BUName: string;
  open: boolean;
}

export default observer((props: Props) => {
  const [inputStatus, setInputStatus] = useState<'error' | 'warning'>();
  const history = useHistory()
  useEffect(() => {
    rootStore.app.changeAppName(undefined);
    rootStore.app.changeAppId(undefined);
    rootStore.app.changeBUName(undefined);
  }, []);

  const onChangeAppName = (e: React.ChangeEvent<HTMLInputElement>) => {
    rootStore.app.changeAppName(e.target.value)
    setInputStatus(undefined);
  };
  const onOk = () => {
    if (rootStore.app.appName) {
      rootStore.app.changeBUName(props.BUName);
      history.push('/app/edit')
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
      <Input value={rootStore.app.appName} onChange={onChangeAppName} placeholder="请输入" addonBefore="应用名" status={inputStatus} />
    </Modal>
  );
});

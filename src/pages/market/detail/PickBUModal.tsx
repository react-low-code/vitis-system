import { Modal, message } from 'antd'
import { useState } from 'react'
import BUList from '@/components/BUList'

interface Props {
  visible: boolean;
  onClose: () => void;
  onOk: (BUName: string) => void;
}

export default function (props: Props) {
  const [BUName, setBUName] = useState<string>();
  const onSelect = (val: string) => {
    setBUName(val);
  };

  const onOk = () => {
    if (!BUName) {
      message.warning('请选择业务单元');
    } else {
      props.onOk(BUName);
    }
  };

  return (
    <Modal
      visible={props.visible}
      title="选取到业务单元"
      onCancel={props.onClose}
      onOk={onOk}
    >
      <BUList onSelect={onSelect} BUName={BUName} />
    </Modal>
  )
}
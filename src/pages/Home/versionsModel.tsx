import { Modal, Select, message } from 'antd';
import { useEffect, useState } from 'react';
import { getComponentVersion, ComponentBaseInfo } from '@/services/market'
import { updateComponent } from '@/services/businessUnit'

const { Option } = Select;

interface Props {
  onClose: () => void;
  onFresh: () => void;
  defaultVersion: string;
  BUName: string;
  component: ComponentBaseInfo;
}

export default function (props: Props) {
  const [versions, setVersions] = useState<string[]>([]);
  const [version, setVersion] = useState<string>(props.defaultVersion);
  useEffect(() => {
    getComponentVersion(props.component.packageName).then((resData) => {
      setVersions(resData);
    });
  },[]);
  const onChangeVersion = (val: string) => {
    setVersion(val);
  };
  const onOk = async () => {
    await updateComponent({
      BUName: props.BUName,
      ...props.component,
      version,
    });
    message.success('升级成功');
    props.onFresh();
  };

  return (
    <Modal visible title="升级组件" onCancel={props.onClose} onOk={onOk}>
      <div>业务单元：{props.BUName}</div>
      <div>组件包名：{props.component.packageName}</div>
      <div>组件版本：
        <Select value={version} onChange={onChangeVersion} size="small" style={{width: '200px'}}>
          {versions.map(i => <Option key={i} value={i}>{i}</Option>)}
        </Select>
      </div>
    </Modal>
  )
}


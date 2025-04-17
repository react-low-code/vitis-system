import { useState, useEffect } from 'react';
import { getAllBU, BusinessUnitInfo, addBu } from '@/services/businessUnit'
import cn from 'classnames'
import { Button, Modal, Input, message } from 'antd';
import styles from './index.module.css';


interface Props {
  onSelect: (BUName: string) => void;
  BUName?: string;
  autoSelect?: boolean;
}

export default function (props: Props) {
  const [list, setList] = useState<BusinessUnitInfo[]>([]);
  const [addBuVisible, setAddBuVisible] = useState<boolean>(false);
  const [newBUName, setNewBUName] = useState<string>('');
  const [desc, setDesc] = useState<string>('');

  const getList = () => {
    getAllBU().then((resData) => {
      if (!props.BUName && props.autoSelect) {
        onSelect(resData[0]?.name)();
      }
      setList(resData);
    });
  }

  useEffect(() => {
    getList();
  }, []);

  const onSelect = (BUName: string) => () => {
    props.onSelect(BUName);
  };

  const onClose = () => {
    setAddBuVisible(false);
    setNewBUName('');
    setDesc('');
  }

  const onOpenAddBU = () => {
    setAddBuVisible(true);
  };

  const onOk = async () => {
    try {
      await addBu({
        desc,
        BUName: newBUName,
      });
      getList();
    } catch (error) {
      message.error('出错了');
    }
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewBUName(e.target.value);
  };

  const onChangeDesc = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(e.target.value);
  };

  return (
    <div style={{padding: '10px'}}>
      <Button
        type="primary"
        onClick={onOpenAddBU}
      >
        新建业务单元
      </Button>
      <div>
        {list.map(item => (
          <div
            className={cn({
              [styles.buItem]: true,
              [styles.active]: item.name === props.BUName,
            })}
            key={item.name}
            onClick={onSelect(item.name)}
          >
            {item.name}
          </div>))}
        {list.length === 0 ? <div>暂无业务单元</div>: null}
      </div>
      <Modal
        visible={addBuVisible}
        title="新建业务单元"
        onCancel={onClose}
        onOk={onOk}
        closable={false}
      >
        <Input
          value={newBUName}
          onChange={onChangeName}
          placeholder="请输入"
          addonBefore="业务单元名称"
        />
        <Input
          value={desc}
          onChange={onChangeDesc}
          placeholder="请输入"
          addonBefore="描述"
          style={{marginTop: '10px'}}
        />
      </Modal>
    </div>
  )
}
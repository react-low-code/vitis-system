import { useState, useEffect } from 'react';
import { getAllBU, BusinessUnitInfo } from '@/services/businessUnit'
import cn from 'classnames'
import styles from './index.module.css';


interface Props {
  onSelect: (BUName: string) => void;
  BUName?: string;
  autoSelect?: boolean;
}

export default function (props: Props) {
  const [list, setList] = useState<BusinessUnitInfo[]>([]);

  useEffect(() => {
    getAllBU().then((resData) => {
      if (!props.BUName && props.autoSelect) {
        onSelect(resData[0]?.name)();
      }
      setList(resData);
    });
  }, []);

  const onSelect = (BUName: string) => () => {
    props.onSelect(BUName);
  };

  return (
    <div>
      {list.map(item => (<div
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
  )
}
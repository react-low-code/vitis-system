import { useEffect, useState, useRef } from 'react'
import { useLocation, useRequest } from 'ice';
import { Select, Button, message } from 'antd'
import { getComponentDetail, Component } from '@/services/market';
import { pickComponent, updateComponent } from '@/services/businessUnit'
import PickBUModal from './PickBUModal'

import qs from 'qs';
import styles from './index.module.css';
import cn from 'classnames';

const { Option } = Select;

export default function () {
  const { error, request } = useRequest(getComponentDetail);
  const [data, setData] = useState<Component>();
  const [loading, setLoading] = useState<boolean>(false);
  const [version, setVersion] = useState<string>();
  const [open, setOpen] = useState<boolean>(false);
  const [BUName, setBUName] = useState<string>();
  const location = useLocation();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    const params = qs.parse(location.search.slice(1)) as any;
    setBUName(params.BUName || '');
    (async () => {
      setLoading(true);
      const result = await request(params.packageName);
      setData(result);
      setVersion(params.version || result.latest);
    })();
  }, [location.search]);

  const onLoad = () => {
    setLoading(false);
  };

  const onChange = (value: string) => {
    setVersion(value);
  };

  const onWillPick = async () => {
    if (!BUName) {
      setOpen(true);
    } else {
      if (!data) return;

      await updateComponent({
        ...data,
        version: version!,
        BUName: BUName!,
      });
      message.success('更新成功');
    }
  };

  const onClose = () => {
    setOpen(false);
  };

  const onOk = async (name: string) => {
    if (data) {
      await pickComponent({
        ...data,
        version: version!,
        BUName: name,
      });
      onClose();
      message.success(`选取到${name}成功`);
    }
  };

  const docUrl = `https://unpkg.com/${data?.packageName}@${version}/docs/index.html`;
  return (
    <div>
      {error ?
        <div>request error: {error.message}</div> :
        <div>
          <div className={styles.picker}>
            <Select value={version} onChange={onChange}>
              {data?.versions.map((item) => <Option value={item}>{item}</Option>)}
            </Select>
            <Button type="primary" style={{marginLeft: '20px'}} onClick={onWillPick}>{BUName ? '更新到' + BUName : '选取到'}</Button>
          </div>
          <iframe
            src={docUrl}
            ref={iframeRef}
            onLoad={onLoad}
            className={cn({
              [styles.docIframe]: true,
              [styles.hidden]: loading,
          })} />
        </div>
      }
      <PickBUModal visible={open} onClose={onClose} onOk={onOk} />
    </div>
  )
}
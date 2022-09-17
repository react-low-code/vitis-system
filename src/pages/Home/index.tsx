import { useEffect, useState } from 'react';
import { useRequest, useHistory } from 'ice';
import { Button, Table, Tabs } from 'antd';
import BUList from '@/components/BUList';
import { getApplications } from '@/services/applications';
import { getComponents } from '@/services/businessUnit';
import { ComponentBaseInfo } from '@/services/market';
import VersionsModel from './versionsModel'

import styles from './index.module.css';

export default function Home() {
  const { data = { total: 0, data: [] }, loading, request: fetchRepos } = useRequest(getApplications);
  const { data: components = [], request: fetchComponents } = useRequest(getComponents);
  const history = useHistory();

  const [BUName, setBUName] = useState<string>();
  const [openVersion, setOpenVersion] = useState<boolean>(false);
  const [currentCompon, setCurrentCompon] = useState<ComponentBaseInfo>();

  useEffect(() => {
    if (BUName) {
      fetchRepos(BUName);
      fetchComponents(BUName);
    }
  }, [BUName]);
  const onSelectBUName = (name: string) => {
    setBUName(name);
  };
  const onGotoComponentDetail = (packageName: string, version: string) => {
    history.push('/market/detail?packageName=' + packageName + '&version=' + version + '&BUName=' + BUName);
  };
  const onOpenVersion = (Compon: ComponentBaseInfo) => {
    setOpenVersion(true);
    setCurrentCompon(Compon);
  };

  const openCloseVersion = () => {
    setOpenVersion(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <BUList BUName={BUName} onSelect={onSelectBUName} autoSelect />
      </div>
      <Button type="primary" style={{right: '10px', top: '10px', position: 'absolute'}}>新建应用</Button>
      <div className={styles.main}>
        <Tabs>
          <Tabs.TabPane tab="应用" key="app">
            <Table dataSource={data.data} loading={loading} rowKey="_id" pagination={false} >
              <Table.Column title="应用" dataIndex="name" key="name" />
              <Table.Column title="已发布" dataIndex="released" key="released" render={(val: any) => (val ? '是' : '否')} />
              <Table.Column title="发布时间" dataIndex="releasedTime" key="releasedTime" render={(val: any) => ( val || '-')} />
              <Table.Column
                title="已发布的 commit hash"
                dataIndex="releasedSchemaCommitId"
                key="releasedSchemaCommitId"
                render={(val: any) => (val || '-')}
              />
              <Table.Column
                title="操作"
                key="action"
                render={() => (
                  <>
                    <Button type="link" size="small">版本记录</Button>
                  </>
                )}
              />
            </Table>
          </Tabs.TabPane>
          <Tabs.TabPane tab="组件" key="components">
            <Table dataSource={components} rowKey="packageName" pagination={false} >
              <Table.Column title="包名" dataIndex="packageName" key="packageName" />
              <Table.Column title="版本" dataIndex="version" key="version" />
              <Table.Column title="描述" dataIndex="description" key="description" />
              <Table.Column
                title="操作"
                key="action"
                render={(_, record: ComponentBaseInfo) => (
                  <>
                    <Button type="link" size="small" onClick={() => onOpenVersion(record)}>升级</Button>
                    <Button type="link" size="small" onClick={() => onGotoComponentDetail(record.packageName, record.version)}>详情</Button>
                  </>
                )}
              />
            </Table>
          </Tabs.TabPane>
        </Tabs>
      </div>
      {openVersion && BUName && currentCompon &&
      <VersionsModel
        onClose={openCloseVersion}
        onFresh={() => fetchComponents(BUName)}
        component={currentCompon}
        defaultVersion={currentCompon.version}
        BUName={BUName}
      />}
    </div>
  );
}

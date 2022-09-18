import { useState, useEffect } from 'react'
import { Modal, Table, Button } from 'antd'
import { TagOutlined } from '@ant-design/icons';
import { getHistory, History } from '@/services/applications'

interface Props {
    onClose: () => void;
    appId: string;
    commitHash?: string | null;
}

export default function (props: Props) {
  const [histories, setHistories] = useState<History[]>([]);
  useEffect(() => {
    getHistory(props.appId).then((res => {
      setHistories(res)
    }))
  },[])
  return (
    <Modal
      visible
      title="历史版本"
      onCancel={props.onClose}
      width="1200px"
      footer={[
        <Button type="ghost" onClick={props.onClose}>关闭</Button>
      ]}
    >
      <div style={{maxHeight: '400px', overflow: 'auto'}} >
        <Table dataSource={histories} key="commitId" pagination={false}>
          <Table.Column
            title="commit hash"
            dataIndex="commitId"
            key="commitId"
            width="140px"
            render={(val: string) => <span>{val} {val === props.commitHash ? <TagOutlined /> : null}</span>}
          />
          <Table.Column title="创建时间" dataIndex="time" key="time" width="200px" />
          <Table.Column title="描述" dataIndex="description" key="description" />
          <Table.Column title="创建者" dataIndex="user" key="user" width="150px" />
          <Table.Column
            title="操作"
            dataIndex="user"
            key="user"
            width="200px"
            render={(_, record: History) => <>
                <Button type="link" size='small'>预览</Button>
                <Button type="link" size='small'>编辑</Button>
                {record.commitId !== props.commitHash && <Button type="link" size='small'>发布</Button>}
            </>}
          />
        </Table>
      </div>
    </Modal>
  )
}
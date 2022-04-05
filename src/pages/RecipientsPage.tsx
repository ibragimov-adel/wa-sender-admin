import React, { useState } from 'react';
import { Button, Col, Collapse, Input, Layout, Row, Space } from 'antd';
import {
  useCreateRecipientMutation,
  useDeleteRecipientByIdMutation,
  useGetAllRecipientsQuery,
  useUpdateRecipientByIdMutation,
} from '../api/api';
import RecipientsTable from '../components/recipients/RecipientsTable';
import IRecipient from '../models/IRecipient';
import RecipientsForm from '../components/recipients/RecipientsForm';
import { useSearch } from '../hooks/useSearch';
import UploadFile from '../components/recipients/UploadFile';
import { DownloadOutlined } from '@ant-design/icons';

const { Sider, Content } = Layout;

const RecipientsPage: React.FC<{}> = () => {
  const { data, isLoading, isFetching } = useGetAllRecipientsQuery();
  const [createRecipient] = useCreateRecipientMutation();
  const [updateRecipient] = useUpdateRecipientByIdMutation();
  const [deleteRecipient] = useDeleteRecipientByIdMutation();

  const [searchText, setSearchText] = useState<string>('');
  const [editableRecipient, setEditableRecipient] = useState<IRecipient>();

  const { searchedData } = useSearch(data, searchText, [
    'firstName',
    'secondName',
    'lastName',
    'phone',
  ]);

  const onDelete = (recipient: IRecipient) => {
    deleteRecipient(recipient);
  };

  const onUpdate = (recipient: IRecipient) => {
    setEditableRecipient(recipient);
  };

  const onCreate = () => {
    setEditableRecipient(undefined);
  };

  const onDownloadXlsx = () => {
    window.open(`http://${window.location.host}/api/recipients/xlsx`);
  };

  return (
    <Layout>
      <Sider theme={'light'} width={'25%'}>
        <Collapse
          activeKey={!editableRecipient ? 1 : 0}
          expandIconPosition={'right'}
        >
          <Collapse.Panel key={0} header={'Изменить получателя'}>
            <RecipientsForm
              onSubmit={updateRecipient}
              mode={'edit'}
              recipient={editableRecipient!}
              cancelEditing={() => setEditableRecipient(undefined)}
            />
          </Collapse.Panel>
          <Collapse.Panel key={1} header={'Добавить получателя'}>
            <RecipientsForm mode={'create'} onSubmit={createRecipient} />
          </Collapse.Panel>
        </Collapse>
      </Sider>
      <Layout>
        <Content style={{ margin: '20px' }}>
          <Space
            direction={'vertical'}
            size={'large'}
            style={{ width: '100%' }}
          >
            <div>
              <Row gutter={[10, 10]}>
                <Col span={14}>
                  <Input
                    style={{ display: 'block', width: '100%' }}
                    size={'middle'}
                    placeholder={'Поиск'}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setSearchText(e.target.value)
                    }
                  />
                </Col>
                <Col offset={2} span={4}>
                  <Button
                    type={'primary'}
                    className={'w-100'}
                    onClick={onCreate}
                  >
                    Добавить
                  </Button>
                </Col>
                <Col span={4}>
                  <UploadFile />
                </Col>
                <Col span={4} offset={20}>
                  <Button
                    block
                    icon={<DownloadOutlined />}
                    onClick={onDownloadXlsx}
                  >
                    Скачать xlsx
                  </Button>
                </Col>
              </Row>
            </div>
            <div className={'wrapper'}>
              <RecipientsTable
                recipients={searchedData}
                isLoading={isLoading || isFetching}
                onDelete={onDelete}
                onUpdate={onUpdate}
              />
            </div>
          </Space>
        </Content>
      </Layout>
    </Layout>
  );
};

export default RecipientsPage;

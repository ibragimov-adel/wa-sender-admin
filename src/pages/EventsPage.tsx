import React, { useState } from 'react';
import { Button, Col, Collapse, Input, Layout, Row, Space } from 'antd';
import {
  useCreateEventMutation,
  useDeleteEventByIdMutation,
  useGetAllEventsQuery,
  useUpdateEventByIdMutation,
} from '../api/api';
import EventsTable from '../components/events/EventsTable';
import IEvent from '../models/IEvent';
import { useSearch } from '../hooks/useSearch';
import EventsForm from '../components/events/EventsForm';

const { Sider, Content } = Layout;

const EventsPage: React.FC<{}> = () => {
  const { data, isLoading, isFetching } = useGetAllEventsQuery();
  const [createEvent, { error: createEventError }] = useCreateEventMutation();
  const [updateEvent] = useUpdateEventByIdMutation();
  const [deleteEvent] = useDeleteEventByIdMutation();

  const [searchText, setSearchText] = useState<string>('');
  const [editableEvent, setEditableEvent] = useState<IEvent>();

  const { searchedData } = useSearch(data, searchText, ['name']);

  const onDelete = (event: IEvent) => {
    deleteEvent(event);
  };

  const onUpdate = (event: IEvent) => {
    setEditableEvent(event);
  };

  const onCreate = () => {
    setEditableEvent(undefined);
  };

  return (
    <Layout>
      <Sider theme={'light'} width={'25%'}>
        <Collapse
          activeKey={!editableEvent ? 1 : 0}
          expandIconPosition={'right'}
        >
          <Collapse.Panel key={0} header={'Изменить событие'}>
            <EventsForm
              onSubmit={updateEvent}
              mode={'edit'}
              event={editableEvent!}
              cancelEditing={() => setEditableEvent(undefined)}
            />
          </Collapse.Panel>
          <Collapse.Panel key={1} header={'Добавить событие'}>
            <EventsForm onSubmit={createEvent} mode={'create'} />
            {createEventError ? (
              <div style={{ color: 'red' }}>
                Событие с таким названием уже есть
              </div>
            ) : null}
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
              <Row gutter={10}>
                <Col span={20}>
                  <Input
                    style={{ display: 'block', width: '100%' }}
                    size={'middle'}
                    placeholder={'Поиск'}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setSearchText(e.target.value)
                    }
                  />
                </Col>
                <Col span={4}>
                  <Button
                    type={'primary'}
                    style={{ width: '100%' }}
                    onClick={onCreate}
                  >
                    Добавить
                  </Button>
                </Col>
              </Row>
            </div>
            <div className={'wrapper'}>
              <EventsTable
                events={searchedData}
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

export default EventsPage;

import React from 'react';
import { Button, Modal, Space, Table } from 'antd';
import IEvent from '../../models/IEvent';
import { formatNumber } from '../../utils/utils';

interface Props {
  events: IEvent[] | undefined;
  isLoading: boolean;
  onDelete: (event: IEvent) => void;
  onUpdate: (event: IEvent) => void;
}

const EventsTable: React.FC<Props> = ({
  events,
  isLoading,
  onDelete,
  onUpdate,
}) => {
  const columns = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
      width: '70%',
    },
    {
      title: 'Дата',
      key: 'date',
      width: '10%',
      render: (_: unknown, record: IEvent) =>
        `${formatNumber(record.date)}.${formatNumber(record.month)}`,
    },
    {
      key: 'actions',
      width: '20%',
      render: (_: unknown, record: IEvent) =>
        record.month > 0 && record.date > 0 ? (
          <Space size={'middle'}>
            <Button onClick={() => onUpdate(record)}>Изменить</Button>
            <Button
              type={'primary'}
              danger
              onClick={() => onDeleteClick(record)}
            >
              Удалить
            </Button>
          </Space>
        ) : null,
    },
  ];
  const onDeleteClick = (event: IEvent) => {
    Modal.confirm({
      title: 'Вы уверены, что хотите удалить событие?',
      okType: 'danger',
      okText: 'Удалить',
      cancelText: 'Отмена',
      onOk: () => onDelete(event),
    });
  };

  return (
    <Table
      columns={columns}
      dataSource={events}
      loading={isLoading}
      pagination={false}
      rowKey={'id'}
    />
  );
};

export default EventsTable;

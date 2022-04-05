import React from 'react';
import { Button, Modal, Space, Table, Tag } from 'antd';
import IRecipient from '../../models/IRecipient';
import { formatNumber } from '../../utils/utils';
import IEvent from '../../models/IEvent';

interface Props {
  recipients: IRecipient[] | undefined;
  isLoading: boolean;
  onDelete: (recipient: IRecipient) => void;
  onUpdate: (recipient: IRecipient) => void;
}

export const renderValueOrNotSpecified = (value: any) => {
  return value === null ? <i>Не указано</i> : value;
};

const RecipientsTable: React.FC<Props> = ({
  recipients,
  isLoading,
  onUpdate,
  onDelete,
}) => {
  const columns = [
    {
      title: 'Имя',
      dataIndex: 'firstName',
      key: 'firstName',
      width: '12%',
      render: (text: string) => renderValueOrNotSpecified(text),
    },
    {
      title: 'Фамилия',
      dataIndex: 'secondName',
      key: 'secondName',
      width: '12%',
      render: (text: string) => renderValueOrNotSpecified(text),
    },
    {
      title: 'Отчество',
      dataIndex: 'lastName',
      key: 'lastName',
      width: '12%',
      render: (text: string) => renderValueOrNotSpecified(text),
    },
    {
      title: 'Номер телефона',
      dataIndex: 'phone',
      key: 'phone',
      width: '15%',
      render: (text: string) => renderValueOrNotSpecified(text),
    },
    {
      title: 'День рождения',
      dataIndex: 'birthDate',
      key: 'date',
      width: '14%',
      render: (_: string, record: IRecipient) =>
        record.birthDate && record.birthMonth ? (
          `${formatNumber(record.birthDate)}.${formatNumber(record.birthMonth)}`
        ) : (
          <i>Не указано</i>
        ),
    },
    {
      title: 'События',
      dataIndex: 'events',
      key: 'events',
      width: '15%',
      render: (events: IEvent[]) => (
        <Space wrap size={'small'}>
          {events.map((event) => (
            <Tag key={event.id} color={'blue'}>
              {event.name}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      key: 'actions',
      width: '20%',
      render: (_: any, record: IRecipient) => (
        <Space size='middle' wrap>
          <Button onClick={() => onUpdate(record)}>Изменить</Button>
          <Button type={'primary'} danger onClick={() => onDeleteClick(record)}>Удалить</Button>
        </Space>
      ),
    },
  ];

  const onDeleteClick = (recipient: IRecipient) => {
    Modal.confirm({
      title: 'Вы уверены, что хотите удалить получателя?',
      okType: 'danger',
      okText: 'Удалить',
      cancelText: 'Отмена',
      onOk: () => onDelete(recipient),
    });
  };

  return (
    <Table
      columns={columns}
      dataSource={recipients}
      loading={isLoading}
      pagination={false}
      rowKey={'id'}
      bordered
    />
  );
};

export default RecipientsTable;

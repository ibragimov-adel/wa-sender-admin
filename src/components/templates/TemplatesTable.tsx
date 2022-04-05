import React from 'react';
import { Button, Modal, Space, Table, Tag } from 'antd';
import ITemplate from '../../models/ITemplate';
import IEvent from '../../models/IEvent';

interface Props {
  templates: ITemplate[] | undefined;
  isLoading: boolean;
  onDelete: (template: ITemplate) => void;
  onUpdate: (template: ITemplate) => void;
}

const TemplatesTable: React.FC<Props> = ({
  templates,
  onDelete,
  isLoading,
  onUpdate,
}) => {
  const columns = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
    },
    {
      title: 'Событие',
      dataIndex: 'event',
      key: 'event',
      width: '10%',
      render: (event: IEvent) => <Tag>{event.name}</Tag>,
    },
    {
      title: 'Текст',
      dataIndex: 'text',
      key: 'text',
      width: '50%',
      render: (text: string) =>
        text.split('\n').map((p, index) => <p key={index}>{p}</p>),
    },
    {
      key: 'actions',
      width: '20%',
      render: (_: unknown, record: ITemplate) => (
        <Space size={'middle'}>
          <Button onClick={() => onUpdate(record)}>Изменить</Button>
          <Button type={'primary'} danger onClick={() => onDeleteClick(record)}>
            Удалить
          </Button>
        </Space>
      ),
    },
  ];

  const onDeleteClick = (template: ITemplate) => {
    Modal.confirm({
      title: 'Вы уверены, что хотите удалить шаблон?',
      okType: 'danger',
      okText: 'Удалить',
      cancelText: 'Отмена',
      onOk: () => onDelete(template),
    });
  };

  return (
    <Table
      columns={columns}
      dataSource={templates}
      loading={isLoading}
      pagination={false}
      rowKey={'id'}
    />
  );
};

export default TemplatesTable;

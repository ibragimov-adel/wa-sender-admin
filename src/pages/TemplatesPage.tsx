import React, { useState } from 'react';
import {
  useCreateTemplateMutation,
  useDeleteTemplateByIdMutation,
  useGetAllTemplatesQuery,
  useUpdateTemplateByIdMutation,
} from '../api/api';
import TemplatesTable from '../components/templates/TemplatesTable';
import { Button, Col, Collapse, Input, Layout, Row, Space } from 'antd';
import ITemplate from '../models/ITemplate';
import { useSearch } from '../hooks/useSearch';
import TemplatesForm from '../components/templates/TemplatesForm';

const { Sider, Content } = Layout;

const TemplatesPage: React.FC<{}> = () => {
  const { data, isLoading, isFetching } = useGetAllTemplatesQuery();
  const [createTemplate] = useCreateTemplateMutation();
  const [updateTemplate] = useUpdateTemplateByIdMutation();
  const [deleteTemplate] = useDeleteTemplateByIdMutation();

  const [searchText, setSearchText] = useState<string>('');
  const [editableTemplate, setEditableTemplate] = useState<ITemplate>();

  const { searchedData } = useSearch(data, searchText, ['name']);

  const onDelete = (template: ITemplate) => {
    deleteTemplate(template);
  };

  const onUpdate = (template: ITemplate) => {
    setEditableTemplate(template);
  };

  const onCreate = () => {
    setEditableTemplate(undefined);
  };

  return (
    <Layout>
      <Sider theme={'light'} width={'25%'}>
        <Collapse
          activeKey={!editableTemplate ? 1 : 0}
          expandIconPosition={'right'}
        >
          <Collapse.Panel key={0} header={'Изменить шаблон'}>
            <TemplatesForm
              onSubmit={updateTemplate}
              mode={'edit'}
              template={editableTemplate!}
              cancelEditing={() => setEditableTemplate(undefined)}
            />
          </Collapse.Panel>
          <Collapse.Panel key={1} header={'Добавить шаблон'}>
            <TemplatesForm onSubmit={createTemplate} mode={'create'} />
          </Collapse.Panel>
        </Collapse>
        <div>
          <ul>
            <li>
              <b>{'{#FIRST_NAME#}'}</b> - имя
            </li>
            <li>
              <b>{'{#SECOND_NAME#}'}</b> - фамилия
            </li>
            <li>
              <b>{'{#LAST_NAME#}'}</b> - отчество
            </li>
          </ul>
        </div>
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
              <TemplatesTable
                templates={searchedData}
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

export default TemplatesPage;

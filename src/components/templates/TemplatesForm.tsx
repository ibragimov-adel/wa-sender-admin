import React, { useEffect } from 'react';
import ITemplate from '../../models/ITemplate';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import { useGetAllEventsQuery } from '../../api/api';

interface CommonProps {
  onSubmit: (template: ITemplate) => void;
}

interface CreateProps {
  mode: 'create';
  template?: never;
  cancelEditing?: never;
}

interface EditProps {
  mode: 'edit';
  template: ITemplate;
  cancelEditing: () => void;
}

type Props = CommonProps & (CreateProps | EditProps);

const TemplatesForm: React.FC<Props> = ({
  template,
  onSubmit,
  mode,
  cancelEditing,
}) => {
  const [form] = Form.useForm();
  const { data, isLoading, isFetching } = useGetAllEventsQuery();

  const onFinish = (values: any) => {
    const newTemplate = { ...values };

    if (template) {
      newTemplate.id = template.id;
    }

    onSubmit(newTemplate);

    if (mode === 'create') {
      form.resetFields();
    }

    if (cancelEditing) {
      cancelEditing();
    }
  };

  useEffect(() => {
    if (template) {
      form.setFieldsValue({ ...template, event: template.event.id });
    }
  }, [form, template]);

  return (
    <Form
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      form={form}
      onFinish={onFinish}
    >
      <Form.Item
        label={'Название'}
        name={'name'}
        rules={[
          {
            required: true,
            message: 'Имя не может быть пустым',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={'Текст'}
        name={'text'}
        rules={[
          {
            required: true,
            message: 'Текст не может быть пустым',
          },
        ]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item
        label={'Событие'}
        name={'event'}
        rules={[{ required: true, message: 'Выберите событие' }]}
      >
        <Select
          loading={isLoading || isFetching}
          options={
            data
              ? data.map((el) => ({
                  label: el.name,
                  value: el.id,
                }))
              : []
          }
        />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 24 }}>
        <Row justify={'end'}>
          {mode === 'edit' && (
            <Col span={11}>
              <Button block onClick={cancelEditing}>
                Отменить
              </Button>
            </Col>
          )}
          <Col offset={2} span={11}>
            <Button block type={'primary'} htmlType={'submit'}>
              Сохранить
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default TemplatesForm;

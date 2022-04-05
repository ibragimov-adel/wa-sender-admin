import React, { useEffect } from 'react';
import IEvent from '../../models/IEvent';
import { Button, Col, Form, Input, InputNumber, Row, Select } from 'antd';
import { months } from '../../constants/months';

interface CommonProps {
  onSubmit: (event: IEvent) => void;
}

interface CreateProps {
  mode: 'create';
  event?: never;
  cancelEditing?: never;
}

interface EditProps {
  mode: 'edit';
  event: IEvent;
  cancelEditing: () => void;
}

type Props = CommonProps & (CreateProps | EditProps);

const EventsForm: React.FC<Props> = ({
  mode,
  event,
  cancelEditing,
  onSubmit,
}) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const newEvent = { ...values };

    if (event) {
      newEvent.id = event.id;
    }

    onSubmit(newEvent);

    if (mode === 'create') {
      form.resetFields();
    }

    if (cancelEditing) {
      cancelEditing();
    }
  };

  useEffect(() => {
    if (event) {
      form.resetFields();
      form.setFieldsValue({ ...event });
    }
  }, [event, form]);

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
      <Form.Item className={'m-0'} label={'Дата'}>
        <Input.Group>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                name={'month'}
                rules={[
                  {
                    required: true,
                    message: 'Месяц не может быть пустым',
                  },
                ]}
              >
                <Select className={'w-100'} placeholder={'Месяц'}>
                  {months.map(
                    (m) =>
                      m.value !== 0 && (
                        <Select.Option key={m.value} value={m.value}>
                          {m.name}
                        </Select.Option>
                      )
                  )}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                rules={[
                  {
                    type: 'number',
                    message: 'Некорректное число',
                    required: true,
                  },
                ]}
                name={'date'}
              >
                <InputNumber
                  className={'w-100'}
                  min={1}
                  max={31}
                  placeholder={'Число'}
                />
              </Form.Item>
            </Col>
          </Row>
        </Input.Group>
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

export default EventsForm;

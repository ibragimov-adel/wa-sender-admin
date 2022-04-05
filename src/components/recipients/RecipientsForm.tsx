import React, { useEffect } from 'react';
import IRecipient from '../../models/IRecipient';
import { Button, Col, Form, Input, InputNumber, Row, Select } from 'antd';
import { months } from '../../constants/months';
import { useGetAllEventsQuery } from '../../api/api';

interface CommonProps {
  onSubmit: (recipient: IRecipient) => void;
}

interface CreateProps {
  mode: 'create';
  recipient?: never;
  cancelEditing?: never;
}

interface EditProps {
  mode: 'edit';
  recipient: IRecipient;
  cancelEditing: () => void;
}

type Props = CommonProps & (CreateProps | EditProps);

const RecipientsForm: React.FC<Props> = ({
  mode,
  onSubmit,
  recipient,
  cancelEditing,
}) => {
  const [form] = Form.useForm();
  const { data, isLoading, isFetching } = useGetAllEventsQuery();

  const onFinish = (values: any) => {
    const newRecipient = {
      ...values,
      secondName: values.secondName?.length ? values.secondName : null,
      lastName: values.lastName?.length ? values.lastName : null,
      phone: `+7${values.phone}`,
      events: values.events ? values.events.map((id: number) => ({ id })) : [],
    };

    if (!newRecipient.birthMonth || !newRecipient.birthDate) {
      newRecipient.birthMonth = null;
      newRecipient.birthDate = null;
    }

    if (recipient) {
      newRecipient.id = recipient.id;
    }

    onSubmit(newRecipient);

    if (mode === 'create') {
      form.resetFields();
    }

    if (cancelEditing) {
      cancelEditing();
    }
  };

  useEffect(() => {
    if (recipient) {
      form.setFieldsValue({
        ...recipient,
        phone: recipient.phone.slice(2),
        events: recipient.events.map((ev) => ev.id),
      });
    }
  }, [recipient, form]);

  return (
    <Form
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      form={form}
      onFinish={onFinish}
    >
      <Form.Item
        label={'Имя'}
        name={'firstName'}
        rules={[
          {
            required: true,
            message: 'Имя не может быть пустым',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label={'Фамилия'} name={'secondName'}>
        <Input />
      </Form.Item>
      <Form.Item label={'Отчество'} name={'lastName'}>
        <Input />
      </Form.Item>
      <Form.Item className={'m-0'} label={'День рождения'}>
        <Input.Group>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item name={'birthMonth'}>
                <Select className={'w-100'} placeholder={'Месяц'}>
                  {months.map((m) => (
                    <Select.Option key={m.value} value={m.value}>
                      {m.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                rules={[
                  {
                    type: 'number',
                    message: 'Некорректное число',
                  },
                ]}
                name={'birthDate'}
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
      <Form.Item
        label={'Телефон'}
        name={'phone'}
        rules={[
          {
            required: true,
            len: 10,
            message: 'Некорректный номер телефона',
          },
        ]}
      >
        <Input addonBefore={'+7'} />
      </Form.Item>
      <Form.Item label={'События'} name={'events'}>
        <Select
          mode={'multiple'}
          showArrow={true}
          options={
            data
              ? data.map((el) => ({
                  label: el.name,
                  value: el.id,
                }))
              : []
          }
          loading={isLoading || isFetching}
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

export default RecipientsForm;

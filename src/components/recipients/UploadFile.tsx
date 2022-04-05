import React from 'react';
import { Button, message, Upload, UploadProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useUploadFileMutation } from '../../api/api';

const UploadFile: React.FC<{}> = () => {
  const [uploadFile, { isLoading }] = useUploadFileMutation();

  const uploadConfig: UploadProps = {
    name: 'file',
    accept:
      '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    customRequest: ({ file, onSuccess, onError }) => {
      const formData = new FormData();
      formData.append('file', file);

      uploadFile(formData)
        .then((response) => {
          if (onSuccess) {
            onSuccess(response);
          }
        })
        .catch((error) => {
          if (onError) {
            onError(error);
          }
        });
    },
    onChange: (info) => {
      if (info.file.status === 'done') {
        message.success('Загрузка успешно завершена');
      }

      if (info.file.status === 'error') {
        message.error('Произошла ошибка при загрузке');
      }
    },
  };

  return (
    <Upload className={'w-100'} {...uploadConfig} disabled={isLoading} showUploadList={false}>
      <Button
        block
        icon={<UploadOutlined />}
        type={'primary'}
        loading={isLoading}
      >
        Загрузить
      </Button>
    </Upload>
  );
};

export default UploadFile;

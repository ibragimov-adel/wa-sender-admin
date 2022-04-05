import React from 'react';
import { useAppSelector } from '../hooks/redux';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { logsActions } from '../store/slices/LogsSlice';

const LoggerPage: React.FC<{}> = () => {
  const logs = useAppSelector((state) => state.logs);
  const dispatch = useDispatch();

  const clearLogs = () => {
    localStorage.setItem('logs', JSON.stringify([]));
    dispatch(logsActions.setLogs([]));
  };

  return (
    <div
      style={{
        margin: '20px',
      }}
    >
      <Button
        type={'primary'}
        style={{ marginBottom: '20px' }}
        onClick={() => clearLogs()}
      >
        Очистить
      </Button>
      <div
        style={{
          padding: '20px',
          backgroundColor: '#DDD',
          height: '80vh',
          overflow: 'auto',
        }}
      >
        {logs.map((log, index) => (
          <p key={index} style={{ marginBottom: '5px' }}>
            {log}
          </p>
        ))}
      </div>
    </div>
  );
};

export default LoggerPage;

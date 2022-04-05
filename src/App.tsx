import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  DatabaseOutlined,
  FileTextOutlined,
  ThunderboltOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Link,
  Navigate,
  Route,
  Routes as SwitchRoutes,
  useLocation,
} from 'react-router-dom';
import RecipientsPage from './pages/RecipientsPage';
import EventsPage from './pages/EventsPage';
import TemplatesPage from './pages/TemplatesPage';
import LoggerPage from './pages/LoggerPage';
import { io } from 'socket.io-client';
import { useAppDispatch } from './hooks/redux';
import { logsActions } from './store/slices/LogsSlice';
import Qr from './components/qr/Qr';

const { Sider } = Layout;

enum Routes {
  RECIPIENTS = '/recipients',
  EVENTS = '/events',
  TEMPLATES = '/templates',
  LOGGER = '/logger',
}

const menu = [
  {
    icon: <UserOutlined />,
    label: 'Получатели',
    route: Routes.RECIPIENTS,
  },
  {
    icon: <ThunderboltOutlined />,
    label: 'События',
    route: Routes.EVENTS,
  },
  {
    icon: <FileTextOutlined />,
    label: 'Шаблоны',
    route: Routes.TEMPLATES,
  },
  {
    icon: <DatabaseOutlined />,
    label: 'Логи',
    route: Routes.LOGGER,
  },
];

const WS_ENDPOINT =
  window.location.hostname === 'localhost'
    ? 'localhost:5000'
    : window.location.host;

const App: React.FC<{}> = () => {
  const location = useLocation();
  const selectedKey =
    menu.find((m) => m.route === location.pathname)?.route || Routes.RECIPIENTS;
  const dispatch = useAppDispatch();
  const [qr, setQr] = useState<string | null>(null);

  useEffect(() => {
    const logs = JSON.parse(localStorage.getItem('logs') || '[]');
    dispatch(logsActions.setLogs(logs));

    const socket = io(WS_ENDPOINT);

    socket.on('connect', () => {
      socket.on('log', (log: string) => {
        dispatch(logsActions.addLog(log));
      });

      socket.on('qr', (data: string) => {
        setQr(data);
      });

      socket.on('authenticated', () => {
        setQr(null);
      });
    });
  }, []);

  return (
    <>
      {qr && <Qr data={qr} />}
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible>
          <Menu selectedKeys={[selectedKey]} theme={'dark'}>
            {menu.map((m) => (
              <Menu.Item key={m.route} icon={m.icon}>
                <Link to={m.route}>{m.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout>
          <SwitchRoutes>
            <Route path={Routes.RECIPIENTS} element={<RecipientsPage />} />
            <Route path={Routes.EVENTS} element={<EventsPage />} />
            <Route path={Routes.TEMPLATES} element={<TemplatesPage />} />
            <Route path={Routes.LOGGER} element={<LoggerPage />} />
            <Route path={'*'} element={<Navigate to={Routes.RECIPIENTS} />} />
          </SwitchRoutes>
        </Layout>
      </Layout>
    </>
  );
};

export default App;

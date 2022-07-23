import { createElement } from 'react';
import ProLayout from '@ant-design/pro-layout';
import { Link } from 'ice';
import { asideMenuConfig } from './menuConfig';

const loopMenuItem = (menus) =>
  menus.map(({ icon, children, ...item }) => ({
    ...item,
    icon: createElement(icon),
    children: children && loopMenuItem(children),
  }));

export default function BasicLayout({ children, location }) {
  return (
    <ProLayout
      title="vitis 低代码系统"
      logo={false}
      style={{
        minHeight: '100vh',
      }}
      location={{
        pathname: location.pathname,
      }}
      menuDataRender={() => loopMenuItem(asideMenuConfig)}
      menuItemRender={(item, defaultDom) => {
        if (!item.path) {
          return defaultDom;
        }
        return <Link to={item.path}>{defaultDom}</Link>;
      }}
    >
      <div style={{ minHeight: '60vh' }}>{children}</div>
    </ProLayout>
  );
}

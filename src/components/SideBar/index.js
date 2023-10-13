import React from 'react';
import { Layout } from 'antd';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter as Router } from 'react-router-dom';

import Constanst from '../../helpers/constants';
import Logo from '../../assets/images/SideMenu/logo_cimb.png';
import { ReactComponent as IconLeft } from '../../assets/icons/linear-red/chevron-left.svg';
import { ReactComponent as IconRight } from '../../assets/icons/linear-red/chevron-right.svg';

import SideBarMenu from './SideBarMenu';

const { Sider } = Layout;

const SideBar = (props) => {
  return (
    <Sider
      id="side-menu"
      data-test-id="sidebar-menu"
      width={250}
      style={{
        position: 'fixed',
        height: '100vh',
        left: 0,
        backgroundColor: Constanst.color.white,
        overflowY: 'auto',
        zIndex: 1100,
      }}
      // collapsible
      collapsed={props.collapsed}
      onCollapse={props.onCollapse}
    >
      <div
        style={{
          marginTop: 20,
          marginLeft: props.collapsed ? 30 : 20,
          backgroundColor: 'white',
        }}
        onClick={props.onCollapse}
      >
        {props.collapsed ? <IconRight /> : <IconLeft />}
      </div>

        <SideBarMenu collapsed={props.collapsed} />
    </Sider>
  );
};

export default SideBar;

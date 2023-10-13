import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Proptypes from 'prop-types';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

export const TabItem = (props) => {
  const { children } = props;
  return <TabPane {...props}>{children}</TabPane>;
};

TabItem.propTypes = {
  children: Proptypes.element.isRequired,
};

export const TabsContainer = ({ children }) => {
  return (
    <div className="Tabs">
      <Tabs className="Tabs">{children}</Tabs>;
    </div>
  );
};

TabsContainer.propTypes = {
  children: Proptypes.element.isRequired,
};

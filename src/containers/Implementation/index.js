import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Overview from './Overview';

const index = () => {
  return (
    <Switch>
      <Route exact path="/implementation" component={Overview} />
    </Switch>
  );
};

export default index;
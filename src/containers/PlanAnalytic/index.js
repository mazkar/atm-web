import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PlanAnalytic from './PlanAnalytic';
import AnalyzeRbb from './AnalyzeRbb';
import AnalyzeTargetDetail from './AnalyzeTargetDetail';
import AnalyzeTransaksi from './AnalyzeTransaksi';
import AnalyzePopulasi from './AnalyzePopulasi';

const index = () => {
  return (
    <Switch>
      <Route exact path="/plan-analytic" component={PlanAnalytic} />
      <Route exact path="/plan-analytic/analyze-rbb" component={AnalyzeRbb} />
      <Route exact path="/plan-analytic/target/detail/:id" component={AnalyzeTargetDetail} />
      <Route exact path="/plan-analytic/analyze-transaksi" component={AnalyzeTransaksi} />
      <Route exact path="/plan-analytic/analyze-populasi" component={AnalyzePopulasi} />
    </Switch>
  );
};

export default index;


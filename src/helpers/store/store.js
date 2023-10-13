import { init } from "@rematch/core";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";

import financial from "./models/financial";
import financialTable from "./models/financialTable";
import userManagement from "./models/userManagement";
import implementation from "./models/implementation/implementation";
import implementationTable from "./models/implementation/implementationTable";
import transformApiError from "./middlewares/transformApiError";

export const history = createBrowserHistory({
  basename: `/${process.env.REACT_APP_MICROSITENAME}`,
});

const middleware = routerMiddleware(history);

const store = init({
  models: {
    financial,
    financialTable,
    userManagement,
    implementation,
    implementationTable,
  },
  redux: {
    reducers: {
      router: connectRouter(history),
    },
    middlewares: [middleware, transformApiError],
  },
});

export default store;

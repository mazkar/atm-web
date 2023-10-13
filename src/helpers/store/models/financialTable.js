import FinancialTableServiceAPI from "../../../services/financialTable";

export default {
    // ini state global buat financial
    state: {
        data: {},
        fetching: false,
        fetched: false,
        error: null
    },
    // ini reducer financial buat ngubah value state globalnya
    reducers: {
        financialTable_Request(state) {
            return {
                ...state,
                fetching: true,
                fetched: false,
                error: null
            };
        },
        financialTable_Success(state, payload) {
            return {
                ...state,
                data: payload,
                fetching: false,
                fetched: true,
                error: null
            };
        },
        financialTable_Failure(state, payload) {
            return {
                ...state,
                fetching: false,
                fetched: true,
                error: payload
            };
        }
    },
    // ini effects semacam action yang bakal dipake di reducer
    effects: {
        async detailBudgetOpex(data) {
            try {
                let response = {}
                await this.financialTable_Request()
                response = await FinancialTableServiceAPI.DetailBudgetOpex()
                await this.financialTable_Success(response)
            } catch (error) {
                await this.financialTable_Failure(error)
            }
        },

        async detailBudgetCapex(data) {
            try {
                let response = {}
                await this.financialTable_Request()
                response = await FinancialTableServiceAPI.DetailBudgetCapex()
                await this.financialTable_Success(response)
            } catch (error) {
                await this.financialTable_Failure(error)
            }
        },

        async listMemoPembayaran(data) {
            try {
                let response = {}
                await this.financialTable_Request()
                response = await FinancialTableServiceAPI.ListMemoPembayaran()
                await this.financialTable_Success(response)
            } catch (error) {
                await this.financialTable_Failure(error)
            }
        },

        async listApprovalNPB(data) {
            try {
                let response = {};

                await this.financialTable_Success({});

                await this.financialTable_Request();

                response = await FinancialTableServiceAPI.ListApprovalNPB(data);

                await this.financialTable_Success(response);
            } catch (error) {
                await this.financialTable_Failure(error);
            }
        },

        async listFinancialStatus(data) {
            try {
                let response = {}
                await this.financialTable_Success({})
                await this.financialTable_Request()
                response = await FinancialTableServiceAPI.ListFinancialStatus()
                await this.financialTable_Success(response)
            } catch (error) {
                await this.financialTable_Failure(error)
            }
        },

        async searchBudgetTracking(data) {
            try {
                let response = {};

                await this.financialTable_Success({});

                await this.financialTable_Request();

                response = await FinancialTableServiceAPI.SearchBudgetTracking(data)

                await this.financialTable_Success(response);
            } catch (error) {
                await this.financialTable_Failure(error);
            }
        },

        async searchBudgetBesaran(data) {
            try {
                let response = {}
                await this.financialTable_Success({})
                await this.financialTable_Request()
                response = await FinancialTableServiceAPI.SearchBudgetBesaran(data)
                await this.financialTable_Success(response)
            } catch (error) {
                await this.financialTable_Failure(error)
            }
        }
    }
};

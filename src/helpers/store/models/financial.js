import FinancialServiceAPI from "../../../services/financial";

export default {
    state: {
        data: {},
        fetching: false,
        fetched: false,
        error: null
    },
    reducers: {
        financial_Request(state) {
            return {
                ...state,
                fetching: true,
                fetched: false,
                error: null
            };
        },
        financial_Success(state, payload) {
            return {
                ...state,
                data: payload,
                fetching: false,
                fetched: true,
                error: null
            };
        },
        financial_Failure(state, payload) {
            return {
                ...state,
                fetching: false,
                fetched: true,
                error: payload
            };
        }
    },
    effects: {
        async budgetSummaryInfoByMP(data) {
            try {
                let response = {};

                await this.financial_Success({});

                await this.financial_Request();

                response = await FinancialServiceAPI.BudgetSummaryInfoByMP();

                await this.financial_Success(response);
            } catch (error) {
                await this.financial_Failure(error);
            }
        },

        async budgetSummaryInfoByNPB(data) {
            try {
                let response = {};

                await this.financial_Success({});

                await this.financial_Request();

                response = await FinancialServiceAPI.BudgetSummaryInfoByNPB();

                await this.financial_Success(response);
            } catch (error) {
                await this.financial_Failure(error);
            }
        },

        async budgetSummaryInfo(data) {
            try {
                let response = {};

                await this.financial_Success({});

                await this.financial_Request();

                response = await FinancialServiceAPI.BudgetSummaryInfo();

                await this.financial_Success(response);
            } catch (error) {
                await this.financial_Failure(error);
            }
        },

        async summaryFinancialStatus(data) {
            try {
                let response = {}
                await this.financial_Success({})
                await this.financial_Request()
                response = await FinancialServiceAPI.SummaryFinancialStatus()
                await this.financial_Success(response)
            } catch (error) {
                await this.financial_Failure(error)
            }
        },

        async generateNPBCode(data) {
            try {
                let response = {};

                await this.financial_Success({});

                await this.financial_Request();

                response = await FinancialServiceAPI.GenerateNPBCode()

                await this.financial_Success(response);
            } catch (error) {
                await this.financial_Failure(error);
            }
        },

        async submitNpb(data) {
            try {
                let response = {};

                await this.financial_Success({});

                await this.financial_Request();

                response = await FinancialServiceAPI.SubmitNPB(data)

                await this.financial_Success(response);
            } catch (error) {
                await this.financial_Failure(error);
            }
        },

        async adjustmentBudgetBesaran(data) {
            try {
                let response = {}

                await this.financial_Success({});

                await this.financial_Request();

                response = await FinancialServiceAPI.AdjustmentBudgetBesaran(data)

                await this.financial_Success(response);
            } catch (error) {
                await this.financial_Failure(error);
            }
        },

        async budgetSummary(data) {
            try {
                let response = {}
                await this.financial_Success({})
                await this.financial_Request()
                response = await FinancialServiceAPI.BudgetSummary()
                await this.financial_Success(response)
            } catch (error) {
                await this.financial_Failure(error)
            }
        },

        async updateStatusTransaction(data) {
            try {
                let response = {}
                await this.financial_Success({})
                await this.financial_Request()
                response = await FinancialServiceAPI.UpdateStatusTransaction(data)
                alert('Sukses update status.')
                await this.financial_Success(response)
            } catch (error) {
                alert('Gagal update status.')
                await this.financial_Failure(error)
            }
        },

        async listBudgetBesaran(data) {
            try {
                let response = {}
                await this.financial_Success({})
                await this.financial_Request()
                response = await FinancialServiceAPI.ListBudgetBesaran()
                await this.financial_Success(response)
            } catch (error) {
                await this.financial_Failure(error)
            }
        },

        async listBudgetNpb(data) {
            try {
                let response = {}
                await this.financial_Success({})
                await this.financial_Request()
                response = await FinancialServiceAPI.ListBudgetNpb()
                await this.financial_Success(response)
            } catch (error) {
                await this.financial_Failure(error)
            }
        }
    }
};

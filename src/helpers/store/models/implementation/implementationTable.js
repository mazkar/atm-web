import ImplementationTableServiceAPI from '../../../../services/implementation/implementationTable';

export default {
    state: {
        data: {},
        fetching: false,
        fetched: false,
        error: null
    },
    reducers: {
        implementation_Request(state) {
            return {
                ...state,
                fetching: true,
                fetched: false,
                error: null
            };
        },
        implementation_Success(state, payload) {
            return {
                ...state,
                data: payload,
                fetching: false,
                fetched: true,
                error: null
            };
        },
        implementation_Failure(state, payload) {
            return {
                ...state,
                fetching: false,
                fetched: true,
                error: payload
            };
        }
    },
    effects: {
        async getListImplementationNew(data) {
            try {
                let response = {};
                await this.implementation_Success({});
                await this.implementation_Request();
                response = await ImplementationTableServiceAPI.GetListImplementationNew(data);
                await this.implementation_Success(response);
            } catch (error) {
                await this.implementation_Failure(error);
            }
        },
        async getListImplementationTermin(data) {
            try {
                let response = {};
                await this.implementation_Success({});
                await this.implementation_Request();
                response = await ImplementationTableServiceAPI.GetListImplementationTermin(data);
                await this.implementation_Success(response);
            } catch (error) {
                await this.implementation_Failure(error);
            }
        },
        async getListImplementationReplace(data) {
            try {
                let response = {};
                await this.implementation_Success({});
                await this.implementation_Request();
                response = await ImplementationTableServiceAPI.GetListImplementationReplace(data);
                await this.implementation_Success(response);
            } catch (error) {
                await this.implementation_Failure(error);
            }
        },
        async getListImplementationMigrasi(data) {
            try {
                let response = {};
                await this.implementation_Success({});
                await this.implementation_Request();
                response = await ImplementationTableServiceAPI.GetListImplementationMigrasi(data);
                await this.implementation_Success(response);
            } catch (error) {
                await this.implementation_Failure(error);
            }
        },
    }
}
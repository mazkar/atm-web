import ImplementationServiceAPI from '../../../../services/implementation/implementation';

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
        async getImplementationSummary() {
            try {
                let response = {};

                await this.implementation_Success({});

                await this.implementation_Request();

                response = await ImplementationServiceAPI.GetImplementationSummary();

                await this.implementation_Success(response);
            } catch (error) {
                await this.implementation_Failure(error);
            }
        }
    }
}
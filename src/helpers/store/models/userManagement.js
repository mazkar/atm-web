import UserManagementServiceAPI from "../../../services/userManagement";

export default {
    state: {
        data: {},
        fetching: false,
        fetched: false,
        error: null
    },
    reducers: {
        userManagement_Request(state) {
            return {
                ...state,
                fetching: true,
                fetched: false,
                error: null
            };
        },
        userManagement_Success(state, payload) {
            return {
                ...state,
                data: payload,
                fetching: false,
                fetched: true,
                error: null
            };
        },
        userManagement_Failure(state, payload) {
            return {
                ...state,
                fetching: false,
                fetched: true,
                error: payload
            };
        }
    },
    effects: {
        async vendorManagement(data) {
            try {
                let response = {};

                await this.userManagement_Success({});

                await this.userManagement_Request();

                response = await UserManagementServiceAPI.VendorManagement(data);

                await this.userManagement_Success(response);
            } catch (error) {
                await this.userManagement_Failure(error);
            }
        },

        async vendorManagementEdit(data) {
            try {
                let response = {};

                await this.userManagement_Success({});

                await this.userManagement_Request();

                response = await UserManagementServiceAPI.VendorManagementEdit(data);

                await this.userManagement_Success(response);
            } catch (error) {
                await this.userManagement_Failure(error);
            }
        },

        async vendorManagementSaveEdit(reqData) {
            try {
                let response = {};

                await this.userManagement_Success({});

                await this.userManagement_Request();

                response = await UserManagementServiceAPI.VendorManagementSaveEdit(reqData);

                window.location.assign('/user-vendor')

                await this.userManagement_Success(response);
            } catch (error) {
                await this.userManagement_Failure(error);
            }
        },

        async vendorManagementDelete(id) {
            try {
                let response = {};

                await this.userManagement_Success({});

                await this.userManagement_Request();

                response = await UserManagementServiceAPI.VendorManagementDelete(id);

                await this.userManagement_Success(response);
            } catch (error) {
                await this.userManagement_Failure(error);
            }
        },

        async vendorManagementCreate(reqData) {
            try {
                let response = {};

                await this.userManagement_Success({});

                await this.userManagement_Request();

                response = await UserManagementServiceAPI.VendorManagementCreate(reqData);

                window.location.assign('/user-vendor')

                await this.userManagement_Success(response);
            } catch (error) {
                await this.userManagement_Failure(error);
            }
        }
    }
};
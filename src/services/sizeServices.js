import apiClient from "./services";

export default {
    getSizes() {
        return apiClient.get("sizes/");
    }
};
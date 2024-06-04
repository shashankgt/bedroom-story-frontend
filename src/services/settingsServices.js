import apiClient from "./services";

export default {
    getSettings() {
        return apiClient.get("settings/");
    },
    getSetting(id) {
        return apiClient.get("settings/" + id);
    },
    addSettings(settings) {
        return apiClient.post("settings/", settings);
    },
    updateSettings(settings) {
        return apiClient.put("settings/" + settings.id, settings);
    },
    deleteSettings(settingsId) {
        return apiClient.delete("settings/" + settingsId);
    }
};
import apiClient from "./services";

export default {
    getThemes() {
        return apiClient.get("themes/");
    },
    getTheme(id) {
        return apiClient.get("themes/" + id);
    },
    addTheme(theme) {
        return apiClient.post("themes", theme);
    },
    updateTheme(theme) {
        return apiClient.put("themes/" + theme.themeId, theme);
    },
    deleteTheme(themeId) {
        return apiClient.delete("themes/" + themeId);
    }
};
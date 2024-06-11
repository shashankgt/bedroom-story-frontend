import apiClient from "./services";

export default {
    getRoles() {
        return apiClient.get("roles/");
    },
    getRole(id) {
        return apiClient.get("roles/" + id);
    },
    addRole(role) {
        return apiClient.post("roles/", role);
    },
    updateRole(role) {
        return apiClient.put("roles/" + role.roleId, role);
    },
    deleteRole(roleId) {
        return apiClient.delete("roles/" + roleId);
    }
};
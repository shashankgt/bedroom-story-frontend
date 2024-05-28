import apiClient from "./services";

export default {
  getUser(id) {
    return apiClient.get("members/"+id)
  },
  addUser(user) {
    return apiClient.post("members", user);
  },
  updateUser(user) {
    return apiClient.put("members/" + user.id, user);
  },
  loginUser(user) {
    console.log("user:",user.email)
    return apiClient.post("login", user, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        crossDomain: true,
        Authorization:
          "Basic " + btoa(user.email + ":" + user.password),
      },
    });
  },
  logoutUser() {
    return apiClient.post("logout");
  },
  deleteUser(userId) {
    return apiClient.delete("members/" + userId);
  }
};

import apiClient from "./services";

export default {
    getStories() {
        return apiClient.get("stories/");
    },
    getStoryById(id) {
        return apiClient.get("stories/" + id);
    },
    getStoryByMemberId(id) {
        return apiClient.get("stories/" + id);
    },
    addStory(story) {
        return apiClient.post("stories/", story);
    }
};
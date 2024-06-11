import apiClient from "./services";

export default {
    getStories() {
        return apiClient.get("stories/");
    },
    getStoryById(id) {
        return apiClient.get("stories/" + id);
    },
    getStoriesByMemberId(memberId) {
        return apiClient.get("stories/member/" + memberId);
    },
    addStory(story) {
        return apiClient.post("stories/", story);
    },
    updateStory(story) {
        return apiClient.put("stories/" + story.storyId, story);
    },
    deleteStory(storyId) {
        return apiClient.delete("stories/" + storyId);
    }
};
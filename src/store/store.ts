import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            preLocationName: '',
            locationName: '',
            preLocation: [116, 40],
            location: [116, 40],
            content: ''
            // message: ''
        };
    },
    mutations: {
        updateContent(state, data) {
            const { content, location, locationName } = data;
            state.content = content;
            state.preLocation = state.location
            state.location = location;
            state.preLocationName = state.locationName
            state.locationName = locationName
        }
    }
});

export default store;
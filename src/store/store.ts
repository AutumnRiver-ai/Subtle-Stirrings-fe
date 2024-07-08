import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            preLocation: [116, 40],
            location: [116, 40],
            content: ''
            // message: ''
        };
    },
    mutations: {
        updateContent(state, data) {
            const { content, location } = data;
            state.content = content;
            state.preLocation = state.location
            state.location = location;
        }
    }
});

export default store;
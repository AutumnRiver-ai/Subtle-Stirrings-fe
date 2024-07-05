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
        // updateMessage(state, newMessage) {
        //     state.message = newMessage;
        // },
        updateLocation(state, location) {
            state.preLocation = state.location
            state.location = location;
        },
        updateContent(state, content) {
            state.content = content;
        }
    }
});

export default store;
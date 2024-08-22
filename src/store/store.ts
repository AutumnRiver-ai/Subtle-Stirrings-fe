import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            preLocation: [116, 40],
            location: [116, 40],
            content: '',
            showCard: true
            // message: ''
        };
    },
    mutations: {
        updateContent(state, data) {
            const { content, location } = data;
            state.content = content;
            state.preLocation = state.location
            state.location = location;
        }, 
        showCard(state, data) {
            state.showCard = true
        },
        hideCard(state) {
            state.showCard = false;
        }
    }
});

export default store;
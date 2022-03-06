import { createStore } from "vuex";

const Store = createStore({
    state: {
        title: false,
        start: false,
        paused: false,
        end: false,
    },
    mutations: {
        Title: (state) => {
            state.title = true;
            state.start = false;
            state.paused = false;
            state.end = false;
        },
        Play: (state) => {
            state.title = false;
            state.start = true;
            state.paused = false;
            state.end = false;
        },
        Pause: (state) => {
            state.title = false;
            state.start = false;
            state.paused = true;
            state.end = false;
        },
        End: (state) => {
            state.title = false;
            state.start = false;
            state.paused = false;
            state.end = true;
        },
    },
});
export default Store;
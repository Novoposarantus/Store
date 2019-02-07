import { createApp } from './main.js';

const { app,router,store } = createApp()

// this assumes App.vue template root element has `id="app"`
if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(()=>{
    app.$mount('#app')
})
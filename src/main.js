import App from './App.svelte';
import store from '@/store/state';
const app = new App({
	target: document.body,
	data: {
		name: 'Rowtogether'
	},
	store,
});

export default app;
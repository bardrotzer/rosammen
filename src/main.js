import App from './App.svelte';
import dotenv from 'dotenv';
// load the dotenv lib
dotenv.config();

const app = new App({
	target: document.body,
	data: {
		name: 'Rowtogether'
	}
});

export default app;
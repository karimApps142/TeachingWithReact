import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { Provider } from 'react-redux';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import store from '../js/store'

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<Provider store={store}>
            <App {...props} />
        </Provider>);
    },
    progress: {
        color: '#4B5563',
    },
});

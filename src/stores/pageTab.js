import { defineStore } from 'pinia';
import { homeRoute } from '@/router/routes';

const exclude = ['login', 'changePassword', '404', '401', '403', '500'];

const usePageTabStore = defineStore({
    id: 'pageTab',
    state: () => ({
        tabs: [homeRoute],
        active: 'home',
    }),
    actions: {
        addTab(tab) {
            const isExist = this.tabs.some((item) => item.name === tab.name);
            if (!isExist && !exclude.includes(tab.name)) {
                this.tabs.push(tab);
            }
        },
        removeTab(name) {
            const index = this.tabs.findIndex((item) => item.name === name);
            if (index > -1) {
                this.tabs.splice(index, 1);
            }
        },
        setActive(name) {
            this.active = name;
        },
    },
});

export default usePageTabStore;

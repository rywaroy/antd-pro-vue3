import { defineStore } from 'pinia';
import { isEqual } from 'lodash-es';
import { homeRoute } from '@/router/routes';

const exclude = ['login', 'changePassword', '404', '401', '403', '500'];

const usePageTabStore = defineStore({
    id: 'pageTab',
    state: () => ({
        tabs: [homeRoute],
        active: 1,
    }),
    actions: {
        setTabs(tabs) {
            if (tabs.length > 0 && tabs[0].name === homeRoute.name) {
                this.tabs = tabs;
            } else {
                this.tabs = [homeRoute, ...tabs];
            }
        },
        addTab(tab) {
            let isExist = false;
            for (let i = 0; i < this.tabs.length; i++) {
                const item = this.tabs[i];
                if (
                    item.name === tab.name
                    && (item.params ? isEqual(item.params, tab.params) : true)
                    && (item.query ? isEqual(item.query, tab.query) : true)
                ) {
                    isExist = true;
                    this.setActive(item.key);
                    break;
                }
            }
            if (!isExist && !exclude.includes(tab.name)) {
                this.tabs.push(tab);
                this.setActive(tab.key);
            }
        },
        removeTab(key) {
            const index = this.tabs.findIndex((item) => item.key === key);
            if (index > -1) {
                this.tabs.splice(index, 1);
            }
        },
        setActive(key) {
            this.active = key;
        },
    },
});

export default usePageTabStore;

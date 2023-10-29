import { defineStore } from 'pinia';

const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        name: '',
        permissions: [],
    }),
    actions: {
        setUserInfo(userInfo) {
            const { username, roles } = userInfo;
            this.name = username;
            this.permissions = roles;
        },
        logout() {
            this.name = '';
            this.permissions = [];
        },
    },
});

export default useUserStore;

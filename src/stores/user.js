import { defineStore } from 'pinia';

const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        name: '',
        permission: '',
    }),
    actions: {
        setUserInfo(userInfo) {
            const { name, permission } = userInfo;
            this.name = name;
            this.permission = permission;
        },
        logout() {
            this.name = '';
            this.permission = '';
        },
    },
});

export default useUserStore;

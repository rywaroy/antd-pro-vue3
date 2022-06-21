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
    },
});

export default useUserStore;

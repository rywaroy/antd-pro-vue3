import useUserStore from '@/stores/user';

export default function usePermission() {
    const user = useUserStore();

    const { permissions: userPermissions } = user;

    const hasPermission = (permissions) => {
        if (typeof permissions === 'string') {
            return userPermissions.includes(permissions);
        }
        if (permissions && permissions.length) {
            const hasPermission = userPermissions.some((permission) => permissions.includes(permission));
            return hasPermission;
        }
    };

    return {
        hasPermission,
    };
}

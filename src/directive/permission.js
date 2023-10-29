import useUserStore from '@/stores/user';
import usePermission from '@/hooks/usePermission';

const permission = {
    mounted(el, binding) {
        if (binding.value === undefined) return;
        const code = binding.value;
        const { hasPermission } = usePermission();
        if (!hasPermission(code)) {
            el.remove();
        }
    },
};

export default permission;

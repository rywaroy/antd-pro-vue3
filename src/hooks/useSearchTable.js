import { ref, reactive } from 'vue';

export default function useSearchTable(service, {
    defaultQueryParam,
}) {
    const queryParam = ref(defaultQueryParam);
    const advanced = ref(false);

    const toggleAdvanced = () => {
        advanced.value = !advanced.value;
    };

    const search = () => {
        console.log({ ...queryParam.value });
    };

    return {
        queryParam,
        advanced,
        toggleAdvanced,
        search,
    };
}

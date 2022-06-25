import { ref, reactive } from 'vue';

export default function useSearchTable(service, {
    defaultQueryParam = {},
    formatQueryParam = (queryParam) => queryParam,
    formatReturnData = (res) => res.data,
}) {
    const queryParam = ref(defaultQueryParam);
    const advanced = ref(false);
    const dataSource = ref([]);
    const pagination = reactive({
        hideOnSinglePage: true,
        pageSize: 10,
        total: 0,
        current: 1,
    });

    const toggleAdvanced = () => {
        advanced.value = !advanced.value;
    };

    const getDataList = () => {
        service(formatQueryParam({
            ...queryParam.value,
            current: pagination.current,
            pageSize: pagination.pageSize,
        })).then((res) => {
            const { list, total } = formatReturnData(res);
            dataSource.value = list;
            pagination.total = total;
        });
    };

    const search = () => {
        pagination.current = 1;
        getDataList();
    };

    const reset = () => {
        queryParam.value = defaultQueryParam;
        pagination.current = 1;
        getDataList();
    };

    return {
        queryParam,
        advanced,
        toggleAdvanced,
        search,
        getDataList,
    };
}

import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';

export default function useStoreTable(service, useStore, {
    defaultQueryParam = {},
    formatQueryParam = (queryParam) => queryParam,
    formatReturnData = (res) => res.data,
    params = ref({}),
    manual = false,
}) {
    const store = useStore();

    const { queryParam, dataSource, pagination } = storeToRefs(store);
    const advanced = ref(false);
    const loading = ref(false);

    const toggleAdvanced = () => {
        advanced.value = !advanced.value;
    };

    const getDataList = () => {
        loading.value = true;
        service(formatQueryParam({
            ...queryParam.value,
            current: pagination.current,
            pageSize: pagination.pageSize,
            ...params.value,
        })).then((res) => {
            const { list, total } = formatReturnData(res);
            store.setData(list);
            store.setTotal(total);
            loading.value = false;
        }).catch(() => {
            loading.value = false;
        });
    };

    const search = () => {
        store.setCurrent(1);
        getDataList();
    };

    const reset = () => {
        store.setQueryParam({ ...defaultQueryParam });
        store.setCurrent(1);
        getDataList();
    };

    const handleTableChange = (page) => {
        store.setCurrent(page.current);
        store.setPageSize(page.pageSize);
        getDataList();
    };

    onMounted(() => {
        if (!manual) {
            getDataList();
        }
    });

    return {
        queryParam,
        advanced,
        dataSource,
        pagination,
        loading,
        toggleAdvanced,
        search,
        reset,
        getDataList,
        handleTableChange,
    };
}

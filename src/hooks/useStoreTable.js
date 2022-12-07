import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';

/**
 *
 * @param {*} service - 搜索方法
 * @param {*} useStore - store
 * @param {*} params - 搜索参数
 * defaultQueryParam - 默认搜索参数
 * formatQueryParam - 格式化搜索参数
 * formatReturnData - 格式化返回数据
 * params - 外部传入的搜索参数
 * manual - 是否手动搜索
 *
 *
 * @returns
 * queryParam - 搜索参数
 * advanced - 搜索展开开关
 * dataSource - 数据列表
 * pagination - 分页对象
 * loading - 加载状态
 * toggleAdvanced - 搜索展开开关方法
 * search - 搜索方法
 * reset - 重置方法
 * getDataList - 获取数据列表方法
 * handleTableChange - 切换分页方法
 */

export default function useStoreTable(service, useStore, config = {}) {
    const {
        defaultQueryParam = {},
        formatQueryParam = (queryParam) => queryParam,
        formatReturnData = (res) => res.data,
        params = ref({}),
        manual = false,
    } = config;
    const store = useStore();

    const { queryParam, dataSource, pagination, advanced } = storeToRefs(store);
    const loading = ref(false);

    const toggleAdvanced = () => {
        store.setAdvanced(!advanced.value);
    };

    const getDataList = () => {
        loading.value = true;
        service(formatQueryParam({
            ...queryParam.value,
            current: pagination.value.current,
            pageSize: pagination.value.pageSize,
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

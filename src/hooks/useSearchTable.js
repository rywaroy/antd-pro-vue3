import { ref, reactive, onMounted } from 'vue';

/**
 *
 * @param {*} service - 搜索方法
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

export default function useSearchTable(service, config = {}) {
    const {
        defaultQueryParam = {},
        formatQueryParam = (queryParam) => queryParam,
        formatReturnData = (res) => res.data,
        params = ref({}),
        manual = false,
    } = config;
    const queryParam = ref({ ...defaultQueryParam });
    const advanced = ref(false);
    const dataSource = ref([]);
    const loading = ref(false);
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
        loading.value = true;
        service(formatQueryParam({
            ...queryParam.value,
            current: pagination.current,
            pageSize: pagination.pageSize,
            ...params.value,
        })).then((res) => {
            const { list, total } = formatReturnData(res);
            dataSource.value = list;
            pagination.total = total;
            loading.value = false;
        }).catch(() => {
            loading.value = false;
        });
    };

    const search = () => {
        pagination.current = 1;
        getDataList();
    };

    const reset = () => {
        queryParam.value = { ...defaultQueryParam };
        pagination.current = 1;
        getDataList();
    };

    const handleTableChange = (page) => {
        pagination.current = page.current;
        pagination.pageSize = page.pageSize;
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

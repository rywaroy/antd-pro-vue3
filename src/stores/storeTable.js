import { defineStore } from 'pinia';

const useTableStore = defineStore({
    id: 'storeTable',
    state: () => ({
        queryParam: {},
        dataSource: [],
        pagination: {
            hideOnSinglePage: true,
            pageSize: 10,
            total: 0,
            current: 1,
        },
        advanced: false,
    }),
    actions: {
        setData(data) {
            this.dataSource = data;
        },
        setTotal(total) {
            this.pagination.total = total;
        },
        setCurrent(current) {
            this.pagination.current = current;
        },
        setPageSize(pageSize) {
            this.pagination.pageSize = pageSize;
        },
        setQueryParam(queryParam) {
            this.queryParam = queryParam;
        },
        setAdvanced(advanced) {
            this.advanced = advanced;
        },
    },
});

export default useTableStore;

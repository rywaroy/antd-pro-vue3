<template>
    <page-container>
        <base-search-form
            :form-list="formList"
            :query-param="queryParam"
            @reset="reset"
            @search="search" />
        <div class="table-page-wrapper">
            <div class="table-page-toolbar">
                <div class="table-title">查询表格</div>
                <div class="table-operation">
                    <a-button type="primary" @click="visible = true">新建</a-button>
                </div>
            </div>
            <a-table
                row-key="id"
                :loading="loading"
                :data-source="dataSource"
                :columns="columns"
                :pagination="pagination"
                :row-selection="rowSelection"
                @change="handleTableChange">
                <template #bodyCell="{ column, record, index }">
                    <template v-if="column.key === 'serial'">
                        {{ index + 1 }}
                    </template>
                    <template v-if="column.dataIndex === 'action'">
                        <span>
                            <a @click="update(record)">配置</a>
                            <a-divider type="vertical" />
                            <a>订阅报警</a>
                        </span>
                    </template>
                </template>
            </a-table>
        </div>

        <update-form-modal
            v-model:visible="visible"
            title="新建规则"
            :form-state="formState" />
    </page-container>
</template>
<script setup>
import { ref, reactive } from 'vue';
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue';
import UpdateFormModal from './components/UpdateFormModal.vue';
import useSearchTable from '@/hooks/useSearchTable';
import { getDataListApi } from '@/services/mock';

defineOptions({
    name: 'TableList',
});

const params = ref({});

const formList = ref([
    {
        type: 'input',
        label: '规则编号',
        value: 'id',
    },
    {
        type: 'select',
        label: '使用状态',
        value: 'status',
        options: [
            { label: '全部', value: '0' },
            { label: '关闭', value: '1' },
            { label: '运行中', value: '2' },
        ],
    },
    {
        type: 'input-number',
        label: '调用次数',
        value: 'callNo',
    },
    {
        type: 'date',
        label: '更新日期',
        value: 'date',
    },
    {
        type: 'range-date',
        label: '时间区间',
        value: 'rangeDate',
    },
]);

const {
    queryParam,
    advanced,
    dataSource,
    pagination,
    loading,
    toggleAdvanced,
    search,
    reset,
    handleTableChange,
} = useSearchTable(getDataListApi, {
    defaultQueryParam: {
        status: '0',
        useStatus: '0',
    },
    params,
    formatQueryParam(params) {
        const { rangeDate } = params;
        if (rangeDate && rangeDate.length > 0) {
            params.startTime = rangeDate[0].format('YYYY-MM-DD');
            params.endTime = rangeDate[1].format('YYYY-MM-DD');
            delete params.rangeDate;
        }

        return params;
    },
});

const visible = ref(false);
const formState = reactive({ no: '', status: '' });

const update = (record) => {
    const { no, status } = record;
    formState.no = no;
    formState.status = status;
    visible.value = true;
};

const columns = [
    {
        title: '#',
        key: 'serial',
    },
    {
        title: '规则编号',
        dataIndex: 'no',
    },
    {
        title: '描述',
        dataIndex: 'description',
    },
    {
        title: '服务调用次数',
        dataIndex: 'callNo',
    },
    {
        title: '状态',
        dataIndex: 'status',
    },
    {
        title: '更新时间',
        dataIndex: 'updatedAt',
    },
    {
        title: '操作',
        dataIndex: 'action',
        width: '150px',
    },
];

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(selectedRowKeys);
        console.log(selectedRows);
    },
    getCheckboxProps: (record) => ({
        disabled: record.id === 2,
        name: record.name,
    }),
};

</script>

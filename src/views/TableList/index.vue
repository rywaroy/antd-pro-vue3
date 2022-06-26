<template>
    <page-container>
        <div class="table-page-search-wrapper">
            <a-form layout="inline">
                <a-row :gutter="48">
                    <a-col :md="8" :sm="24">
                        <a-form-item label="规则编号">
                            <a-input v-model:value="queryParam.id" placeholder="" />
                        </a-form-item>
                    </a-col>
                    <a-col :md="8" :sm="24">
                        <a-form-item label="使用状态">
                            <a-select v-model:value="queryParam.status" placeholder="请选择">
                                <a-select-option value="0">全部</a-select-option>
                                <a-select-option value="1">关闭</a-select-option>
                                <a-select-option value="2">运行中</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <template v-if="advanced">
                        <a-col :md="8" :sm="24">
                            <a-form-item label="调用次数">
                                <a-input-number v-model:value="queryParam.callNo" style="width: 100%" />
                            </a-form-item>
                        </a-col>
                        <a-col :md="8" :sm="24">
                            <a-form-item label="更新日期">
                                <a-date-picker v-model:value="queryParam.date" style="width: 100%" placeholder="请输入更新日期" />
                            </a-form-item>
                        </a-col>
                        <a-col :md="8" :sm="24">
                            <a-form-item label="使用状态">
                                <a-select v-model:value="queryParam.useStatus" placeholder="请选择">
                                    <a-select-option value="0">全部</a-select-option>
                                    <a-select-option value="1">关闭</a-select-option>
                                    <a-select-option value="2">运行中</a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                    </template>
                    <a-col :md="!advanced && 8 || 24" :sm="24">
                        <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
                            <a-button type="primary" @click="search">查询</a-button>
                            <a-button style="margin-left: 8px" @click="reset">重置</a-button>
                            <a style="margin-left: 8px" @click="toggleAdvanced">
                                {{ advanced ? ' 收起 ' : ' 展开 ' }}
                                <down-outlined v-if="advanced" />
                                <up-outlined v-else />
                            </a>
                        </span>
                    </a-col>
                </a-row>
            </a-form>
        </div>
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

        <create-form-modal
            v-model:visible="visible"
            title="新建规则"
            :form-ref="formRef" />
    </page-container>
</template>
<script>
import { defineComponent, ref, reactive } from 'vue';

export default defineComponent({
    name: 'TableList',
});
</script>
<script setup>
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue';
import CreateFormModal from './components/CreateFormModal.vue';
import useSearchTable from '@/hooks/useSearchTable';
import { getDataListApi } from '@/services/mock';

const params = ref({});

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
});

const visible = ref(false);
const formRef = reactive({ no: '', status: '' });

const update = (record) => {
    const { no, status } = record;
    formRef.no = no;
    formRef.status = status;
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

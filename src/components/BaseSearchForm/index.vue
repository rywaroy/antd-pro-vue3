<template>
    <div class="table-page-search-wrapper">
        <a-form layout="inline">
            <a-row :gutter="48">
                <a-col
                    v-for="item in list"
                    :key="item.value"
                    :xxl="6"
                    :lg="8">
                    <a-form-item v-if="item.type === 'input'" :label="item.label">
                        <a-input
                            v-model:value="queryParam[item.value]"
                            :placeholder="item.placeholder || `请输入${item.label}`" />
                    </a-form-item>
                    <a-form-item v-if="item.type === 'input-number'" :label="item.label">
                        <a-input-number
                            v-model:value="queryParam[item.value]"
                            :placeholder="item.placeholder || `请输入${item.label}`"
                            :max="item.max"
                            :min="item.min"
                            :precision="item.precision"
                            :step="item.step"
                            style="width: 100%" />
                    </a-form-item>
                    <a-form-item v-if="item.type === 'select'" :label="item.label">
                        <a-select
                            v-model:value="queryParam[item.value]"
                            placeholder="请选择">
                            <a-select-option
                                v-for="option in item.options"
                                :key="option.value"
                                :value="option.value">
                                {{ option.label }}
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item v-if="item.type === 'range-date'" :label="item.label">
                        <a-range-picker
                            v-model:value="queryParam[item.value]"
                            format="YYYY-MM-DD" />
                    </a-form-item>
                    <a-form-item v-if="item.type === 'date'" :label="item.label">
                        <a-date-picker
                            v-model:value="queryParam[item.value]"
                            style="width: 100%" />
                    </a-form-item>
                    <template v-if="item.type === 'slot'">
                        <a-form-item :label="item.label">
                            <slot :name="item.value" />
                        </a-form-item>
                    </template>
                </a-col>
                <a-col
                    v-if="btnInline"
                    :xxl="6"
                    :lg="8">
                    <span class="table-page-search-submitButtons" :style="{ float: 'left', overflow: 'hidden' }">
                        <a-button type="primary" @click="search">查询</a-button>
                        <a-button style="margin-left: 8px" @click="reset">重置</a-button>
                        <a v-if="needHide" style="margin-left: 8px" @click="toggleAdvanced">
                            {{ advanced ? ' 收起 ' : ' 展开 ' }}
                            <down-outlined v-if="advanced" />
                            <up-outlined v-else />
                        </a>
                    </span>
                </a-col>
            </a-row>
            <a-row v-if="!btnInline">
                <a-col :span="24">
                    <span class="table-page-search-submitButtons" :style="{ float: 'right', overflow: 'hidden' }">
                        <a-button type="primary" @click="search">查询</a-button>
                        <a-button style="margin-left: 8px" @click="reset">重置</a-button>
                        <a v-if="needHide" style="margin-left: 8px" @click="toggleAdvanced">
                            {{ advanced ? ' 收起 ' : ' 展开 ' }}
                            <down-outlined v-if="advanced" />
                            <up-outlined v-else />
                        </a>
                    </span>
                </a-col>
            </a-row>
        </a-form>
    </div>
</template>
<script setup>
import { ref, computed, onUnmounted } from 'vue';
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue';
import { throttle } from 'lodash-es';

defineOptions({
    name: 'BaseSearchForm',
});

const props = defineProps({
    formList: {
        type: Array,
        default: () => [],
    },
    queryParam: {
        type: Object,
        default: () => ({}),
    },
    forceShowAll: {
        type: Boolean,
        default: false,
    },
});

const emits = defineEmits([
    'search',
    'reset',
]);

const advanced = ref(false);
const windowWidth = ref(0);

const list = computed(() => {
    if (props.forceShowAll) {
        return props.formList;
    }
    if (windowWidth.value >= 1600) { // 一行4列，超过7个显示高级搜索
        if (props.formList.length > 7) {
            return advanced.value ? props.formList : props.formList.slice(0, 7);
        }
        return props.formList;
    } if (windowWidth.value >= 998) { // 一行3列，超过5个显示高级搜索
        if (props.formList.length > 5) {
            return advanced.value ? props.formList : props.formList.slice(0, 5);
        }
        return props.formList;
    }
    return props.formList;
});

const btnInline = computed(() => {
    if (windowWidth.value >= 1600) {
        if (list.value.length % 4 === 0) {
            return false;
        }
    } else if (windowWidth.value >= 998) {
        if (list.value.length % 3 === 0) {
            return false;
        }
    }
    return true;
});

const needHide = computed(() => {
    if (props.forceShowAll) {
        return false;
    }
    if (windowWidth.value >= 1600) {
        if (props.formList.length > 7) {
            return true;
        }
    } else if (windowWidth.value >= 998) {
        if (props.formList.length > 5) {
            return true;
        }
    }
    return false;
});

const reset = () => {
    emits('reset');
};

const toggleAdvanced = () => {
    advanced.value = !advanced.value;
};

const search = () => {
    emits('search');
};

const getWindowWidthThrottle = throttle(() => {
    const width = document.body.clientWidth;
    windowWidth.value = width;
}, 300);

getWindowWidthThrottle();

window.addEventListener('resize', getWindowWidthThrottle);

onUnmounted(() => {
    window.removeEventListener('resize', getWindowWidthThrottle);
});

</script>

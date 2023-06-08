<template>
    <page-container>
        <div class="form-page-wrapper">
            <a-form
                :label-col="{lg: {span: 7}, sm: {span: 7}}"
                :wrapper-col="{lg: {span: 10}, sm: {span: 17} }">
                <a-form-item label="标题" v-bind="validateInfos.title">
                    <a-input v-model:value="formState.title" />
                </a-form-item>
                <a-form-item label="起止日期" v-bind="validateInfos.time">
                    <a-range-picker v-model:value="formState.time" />
                </a-form-item>
                <a-form-item label="目标描述" v-bind="validateInfos.goal">
                    <a-textarea v-model:value="formState.goal" placeholder="请输入你的阶段性工作目标" :rows="4" />
                </a-form-item>
                <a-form-item label="衡量标准" v-bind="validateInfos.standard">
                    <a-textarea v-model:value="formState.standard" placeholder="请输入你的阶段性工作目标" :rows="4" />
                </a-form-item>
                <a-form-item label="客户" v-bind="validateInfos.client">
                    <a-input v-model:value="formState.client" />
                </a-form-item>
                <a-form-item label="邀评人" v-bind="validateInfos.invites">
                    <a-input v-model:value="formState.invites" />
                </a-form-item>
                <a-form-item label="权重" v-bind="validateInfos.weight">
                    <a-input-number v-model:value="formState.weight" :min="0" :max="100" />
                    <span> %</span>
                </a-form-item>
                <a-form-item label="目标公开">
                    <a-radio-group v-model:value="formState.target">
                        <a-radio :value="1">公开</a-radio>
                        <a-radio :value="2">部分公开</a-radio>
                        <a-radio :value="3">不公开</a-radio>
                    </a-radio-group>
                </a-form-item>
                <a-form-item v-show="formState.target === 2" label="&nbsp;" :colon="false">
                    <a-select mode="multiple">
                        <a-select-option value="4">同事甲</a-select-option>
                        <a-select-option value="5">同事乙</a-select-option>
                        <a-select-option value="6">同事丙</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="&nbsp;" :colon="false">
                    <a-button type="primary" @click.prevent="submit">提交</a-button>
                    <a-button style="margin-left: 8px" @click="resetFields">重置</a-button>
                </a-form-item>
            </a-form>
        </div>
    </page-container>
</template>
<script setup>
import { reactive, toRaw, onMounted } from 'vue';
import { Form } from 'ant-design-vue';

defineOptions({
    name: 'BasicForm',
});

const formState = reactive({
    title: '',
    time: [],
    goal: '',
    standard: '',
    client: '',
    invites: '',
    weight: 0,
    target: 1,
});

const rules = reactive({
    title: [{ required: true, message: '请输入标题' }],
    time: [{ required: true, message: '请选择起止日期' }],
    goal: [{ required: true, message: '请输入目标描述' }],
    standard: [{ required: true, message: '请输入衡量标准' }],
});

const { resetFields, validate, validateInfos } = Form.useForm(formState, rules);

const submit = () => {
    validate()
        .then(() => {
            console.log(toRaw(formState));
        })
        .catch((err) => {
            console.log('error', err);
        });
};

onMounted(() => {
    console.log('mounted');
});

</script>

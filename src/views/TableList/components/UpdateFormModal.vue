<template>
    <a-modal
        :title="title"
        :open="visible"
        @cancel="cancel"
        @ok="submit">
        <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-form-item label="规则编号" v-bind="validateInfos.no">
                <a-input
                    v-model:value="formState.no"
                />
            </a-form-item>
            <a-form-item label="状态" v-bind="validateInfos.status">
                <a-select v-model:value="formState.status">
                    <a-select-option :value="0">0</a-select-option>
                    <a-select-option :value="1">1</a-select-option>
                    <a-select-option :value="2">2</a-select-option>
                </a-select>
            </a-form-item>
        </a-form>
    </a-modal>
</template>
<script setup>
import { reactive, toRaw } from 'vue';
import { Form } from 'ant-design-vue';

const { formState } = defineProps({
    title: String,
    visible: Boolean,
    formState: Object,
});

const emits = defineEmits(['update:visible']);

const labelCol = { span: 4 };
const wrapperCol = { span: 14 };

const rulesRef = reactive({
    no: [{ required: true, message: '请输入规则编号' }],
    status: [{ required: true, message: '请选择状态' }],
});

const { resetFields, validate, validateInfos } = Form.useForm(formState, rulesRef);

const cancel = () => {
    emits('update:visible', false);
};

const submit = () => {
    validate()
        .then(() => {
            console.log(toRaw(formState));
        })
        .catch((err) => {
            console.log('error', err);
        });
};
</script>

<template>
    <a-modal
        :visible="visible"
        :title="title"
        :width="width"
        @cancel="close"
        @ok="submit">
        <a-form
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 16 }">
            <template
                v-for="item in formList"
                :key="item.value">
                <a-form-item
                    v-show="item.type !== 'hidden'"
                    :label="item.label"
                    v-bind="validateInfos[item.value]">
                    <a-input v-if="item.type === 'input'" v-model:value="form[item.value]" />
                </a-form-item>
            </template>
        </a-form>
    </a-modal>
</template>
<script setup>
import { Form } from 'ant-design-vue';

defineOptions({
    name: 'BaseModalForm',
});

const emits = defineEmits([
    'update:visible',
    'submit',
]);

const props = defineProps({
    form: {
        type: Object,
        default: () => ({}),
    },
    rules: {
        type: Object,
        default: () => ({}),
    },
    title: {
        type: String,
        default: '',
    },
    visible: {
        type: Boolean,
        default: false,
    },
    width: {
        type: String,
        default: '800px',
    },
    formList: {
        type: Array,
        default: () => [],
    },
});

const useForm = Form.useForm;

const { resetFields, validate, validateInfos } = useForm(
    props.form,
    props.rules,
);

const close = () => {
    emits('update:visible', false);
};

const submit = () => {
    validate().then((res) => {
        if (res) {
            emits('submit', res);
        }
    });
};

</script>

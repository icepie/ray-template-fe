import type { FormInst, FormItemRule, FormRules } from 'naive-ui'
import {
  NButton,
  NForm,
  NFormItem,
  NInput,
  NRadio,
  NRadioGroup,
  NSpace,
} from 'naive-ui'

const CreateUser = defineComponent({
  name: 'CreateUser',
  emits: ['cancel'],
  setup() {
    const formRef = ref<FormInst | null>(null)

    // 校验规则
    const rules: FormRules = {
      username: {
        required: true,
        message: '请输入用户名',
        length: 32,
        trigger: ['blur', 'input'],
      },
      name: {
        // required: true,
        message: '请输入昵称',
        length: 32,
        trigger: ['blur', 'change'],
      },
      password: {
        required: true,
        message: '请输入密码',
        length: 32,
        trigger: ['blur', 'change'],
      },
      confirmPassword: {
        validator(rule: FormItemRule, value: string) {
          return value === formData.value.password
        },
        required: true,
        length: 32,
        message: '两次输入密码不一致',
        trigger: ['blur', 'change'],
      },
      role: {
        required: true,
        message: '请选择角色',
        trigger: 'change',
      },
    }

    // 表单数据
    const formData = ref({
      username: '',
      name: '',
      password: '',
      confirmPassword: '',
      role: '',
    })

    const OnSubmit = (e: MouseEvent) => {
      e.preventDefault()

      console.log(formRef.value)

      formRef.value?.validate((errors) => {
        if (!errors) {
          window.$message.success('验证成功')
        } else {
          console.log(errors)
          window.$message.success('验证失败')
        }
      })
    }

    return {
      rules,
      formData,
      formRef,
      OnSubmit,
    }
  },
  render() {
    return (
      <NForm
        labelPlacement="left"
        labelWidth={100}
        label-width="auto"
        model={this.formData}
        rules={this.rules}
        ref="formRef"
        require-mark-placement="right-hanging"
      >
        <NFormItem label="用户名" path="username">
          <NInput v-model:value={this.formData.username} />
        </NFormItem>

        <NFormItem label="昵称" path="name">
          <NInput v-model:value={this.formData.name} />
        </NFormItem>

        <NFormItem label="角色" path="role">
          <NRadioGroup v-model:value={this.formData.role}>
            <NRadio value="admin">管理员</NRadio>
            <NRadio value="user">用户</NRadio>
          </NRadioGroup>
        </NFormItem>

        <NFormItem label="密码" path="password">
          <NInput type="password" v-model:value={this.formData.password} />
        </NFormItem>

        <NFormItem label="确认密码" path="confirmPassword">
          <NInput
            type="password"
            v-model:value={this.formData.confirmPassword}
          />
        </NFormItem>

        <NSpace
          justify="center"
          align="center"
          style="margin-top: 20px;"
          wrap-item
        >
          <NButton onClick={this.OnSubmit} type="primary">
            提交
          </NButton>
          <NButton
            onClick={() => {
              this.$emit('cancel')
            }}
          >
            取消
          </NButton>
        </NSpace>
      </NForm>
    )
  },
})

export default CreateUser

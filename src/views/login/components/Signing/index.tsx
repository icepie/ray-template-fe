import { NForm, NFormItem, NInput, NButton, NCheckbox } from 'naive-ui'

import { setStorage } from '@/utils/cache'
import { useI18n } from '@/hooks/web'
import { APP_CATCH_KEY } from '@/app-config/appConfig'
import { setVariable, getVariableToRefs } from '@/global-variable'
import { useAppRoot } from '@/hooks/template'

import type { FormInst } from 'naive-ui'
import { authLogin } from '@/api/auth'
import { useUserInfoActions } from '@/store'

export default defineComponent({
  name: 'RSigning',
  setup() {
    const loginFormRef = ref<FormInst>()

    const { t } = useI18n()
    const { getRootPath } = useAppRoot()
    const globalSpinning = getVariableToRefs('globalSpinning')

    const useSigningForm = () => ({
      name: 'admin',
      pwd: '123456',
      rememberMe: false,
    })

    const router = useRouter()
    const signingForm = ref(useSigningForm())

    const rules = {
      name: {
        required: true,
        message: t('views.login.index.NamePlaceholder'),
        trigger: ['blur', 'input'],
      },
      pwd: {
        required: true,
        message: t('views.login.index.PasswordPlaceholder'),
        trigger: ['blur', 'input'],
      },
    }

    const { setToken } = useUserInfoActions()

    /** 普通登陆形式 */
    const handleLogin = () => {
      loginFormRef.value?.validate(async (valid) => {
        if (!valid) {
          setVariable('globalSpinning', true)

          try {
            const authResp = await authLogin({
              username: signingForm.value.name,
              password: signingForm.value.pwd,
            })

            if (authResp.code === 0) {
              window.$message.success(`欢迎${signingForm.value.name}登陆~`)

              if (signingForm.value.rememberMe) {
                setStorage(
                  APP_CATCH_KEY.token,
                  authResp.data.token,
                  'localStorage',
                )
                setStorage(
                  APP_CATCH_KEY.userInfo,
                  authResp.data.userInfo,
                  'localStorage',
                )
              }

              setToken(authResp.data.token)

              // setStorage(APP_CATCH_KEY.token, authResp.data.token)
              // setStorage(APP_CATCH_KEY.signing, authResp.data.userInfo)

              const { redirect = getRootPath.value } =
                router.currentRoute.value.query
              const redirectUrl = decodeURIComponent(redirect as string)

              router.push(redirectUrl)
            } else {
              window.$message.error(authResp.message)
            }
          } catch (error: unknown) {
            window.$message.error((error as BaseResp).message)
          }

          setVariable('globalSpinning', false)
        }
      })
    }

    return {
      signingForm,
      loginFormRef,
      handleLogin,
      rules,
      globalSpinning,
    }
  },
  render() {
    const { $t, globalSpinning } = this

    return (
      <NForm model={this.signingForm} ref="loginFormRef" rules={this.rules}>
        <NFormItem label={$t('views.login.index.Name')} path="name">
          <NInput
            v-model:value={this.signingForm.name}
            placeholder={$t('views.login.index.NamePlaceholder')}
          />
        </NFormItem>
        <NFormItem label={$t('views.login.index.Password')} path="pwd">
          <NInput
            v-model:value={this.signingForm.pwd}
            type="password"
            showPasswordOn="click"
            placeholder={$t('views.login.index.PasswordPlaceholder')}
          />
        </NFormItem>
        <NButton
          style={['width: 100%', 'margin-to: 18px']}
          type="primary"
          onClick={this.handleLogin.bind(this)}
          loading={globalSpinning}
        >
          {$t('views.login.index.Login')}
        </NButton>
        <NCheckbox
          style={['margin-top: 18px']}
          v-model:checked={this.signingForm.rememberMe}
        >
          {$t('views.login.index.RememberMe')}
        </NCheckbox>
      </NForm>
    )
  },
})

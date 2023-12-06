import { NResult } from 'naive-ui'

const Profile = defineComponent({
  name: 'BaseProfile',
  render() {
    return (
      <NResult status="info" title="提示" description="我实在是不想写了..." />
    )
  },
})

export default Profile

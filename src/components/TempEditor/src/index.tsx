// v5
import { fabric } from 'fabric'

export default defineComponent({
  name: 'TempEditor',
  setup() {
    const canvas = ref<fabric.Canvas>()
    const canvasRef = ref<HTMLCanvasElement>()

    onMounted(() => {
      canvas.value = new fabric.Canvas(canvasRef.value as HTMLCanvasElement, {
        width: 400,
        height: 300,
        backgroundColor: '#ccc',
      })

      const rect = new fabric.Rect({
        left: 100,
        top: 100,
        fill: 'red',
        width: 20,
        height: 20,
      })

      canvas.value.add(rect)
    })

    return {
      canvas,
      canvasRef,
    }
  },
  render() {
    return <canvas width="400" height="300" ref="canvasRef"></canvas>
  },
})

import type {
  ValidteValueType,
  DownloadAnyFileDataType,
} from '@/types/modules/utils'

/**
 *
 * @returns 获取当前项目环境
 */
export const getAppEnvironment = () => {
  const env = import.meta.env

  return env
}

/**
 *
 * @param data 二进制流数据
 *
 * @returns formate binary to base64 of the image
 */
export const arrayBufferToBase64Image = (data: ArrayBuffer): string | null => {
  if (!data || data.byteLength) {
    return null
  }

  const base64 =
    'data:image/png;base64,' +
    window.btoa(
      new Uint8Array(data).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        '',
      ),
    )

  return base64
}

/**
 *
 * @param base64 base64
 * @param fileName file name
 *
 * @remark 下载 base64 文件
 */
export const downloadBase64File = (base64: string, fileName: string) => {
  const link = document.createElement('a')

  link.href = base64
  link.download = fileName

  link.click()
}

/**
 *
 * @param value 目标值
 * @param type 类型
 */
export const isValueType = <T>(
  value: unknown,
  type: ValidteValueType,
): value is T => {
  const valid = Object.prototype.toString.call(value)

  return valid.includes(type)
}

/**
 *
 * @param length `uuid` 长度
 * @param radix `uuid` 基数
 * @returns `uuid`
 */
export const uuid = (length = 16, radix = 62) => {
  // 定义可用的字符集，即 0-9, A-Z, a-z
  const availableChars =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  // 定义存储随机字符串的数组
  const arr: string[] = []
  // 获取加密对象，兼容 IE11
  const cryptoObj = window.crypto || window.msCrypto
  let i = 0

  // 循环 length 次，生成随机字符，并添加到数组中
  for (i = 0; i < length; i++) {
    // 生成一个随机数
    const randomValues = new Uint32Array(1)

    cryptoObj.getRandomValues(randomValues)

    // 根据随机数生成对应的字符，并添加到数组中
    const index = randomValues[0] % radix

    arr.push(availableChars[index])
  }

  // 将数组中的字符连接起来，返回最终的字符串
  return arr.join('')
}

/**
 *
 * @param data base64, Blob, ArrayBuffer type
 * @param fileName file name
 *
 * @remark 支持下载任意类型的文件，包括 base64, Blob, ArrayBuffer
 */
export const downloadAnyFile = (
  data: DownloadAnyFileDataType,
  fileName: string,
): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    let blobData!: Blob

    if (typeof data === 'string') {
      // 处理 Base64 数据
      downloadBase64File(data, fileName)
      resolve()
    } else if (data instanceof ArrayBuffer) {
      // 处理 ArrayBuffer 数据
      blobData = new Blob([new Uint8Array(data)], {
        type: 'application/octet-stream',
      })
    } else {
      // 处理 Blob 和 File 数据
      blobData = data
    }

    const url = URL.createObjectURL(blobData)
    const link = document.createElement('a')

    link.href = url
    link.download = fileName
    link.style.display = 'none'

    document.body.appendChild(link)

    link.click()

    document.body.removeChild(link)

    URL.revokeObjectURL(url)
    resolve()
  })
}

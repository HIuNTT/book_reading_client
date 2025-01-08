import { PlusOutlined } from '@ant-design/icons'
import { Image, Typography, Upload, UploadFile, UploadProps } from 'antd'
import { AxiosError } from 'axios'
import { ErrorEnum } from 'constants/errorCode'
import { postFile } from 'modules/book/services'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { cn } from 'utils/cn'

interface ImageUploadProps {
  name?: string
  imageUrl?: string
  value?: string
  description?: string | null
  type?: UploadProps['listType']
  className?: string
  onLoading?: (isLoading: boolean) => void
  onChange?(value: string | undefined): void
}

export default function ImageUpload({
  imageUrl,
  name,
  description = 'Tối đa 1 file, dung lượng file không được quá 2MB',
  type = 'picture-card',
  className,
  onLoading,
  onChange,
}: ImageUploadProps) {
  type FileType = Parameters<NonNullable<UploadProps['beforeUpload']>>[0]

  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [previewVisible, setPreviewVisible] = useState<boolean>(false)
  const [previewImage, setPreviewImage] = useState<string>('')

  useEffect(() => {
    if (imageUrl && name) {
      setFileList([
        {
          uid: `rc-upload-${Date.now()}-1`,
          name,
          status: 'done',
          url: imageUrl,
        },
      ])
    }
  }, [imageUrl, name])

  const fileToBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
      reader.readAsDataURL(file)
    })

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      toast.error('Chỉ chấp nhận file JPG/PNG!')
    }

    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      toast.error('Kích thước file phải nhỏ hơn 2MB!')
    }

    return isJpgOrPng && isLt2M
  }

  const customRequest: UploadProps['customRequest'] = async (options) => {
    const formData = new FormData()
    formData.append('file', options.file as FileType)
    try {
      onLoading?.(true)
      const {
        data: { key },
      } = await postFile(formData, {
        onUploadProgress(progressEvent) {
          const complete = ((progressEvent.loaded / progressEvent.total!) * 100) | 0
          options.onProgress?.({ percent: complete })
        },
      })
      options.onSuccess?.('Success')
      onChange?.(key)
      onLoading?.(false)
    } catch (error: unknown) {
      let message = ''
      if (error instanceof AxiosError) {
        message = ErrorEnum[error.response?.data?.data.error_codes[0] as keyof typeof ErrorEnum] || error.message
      } else if (error instanceof Error) {
        message = `Execution error: ${error.message}`
      }
      options.onError?.({ message, name: 'Error' })
      onLoading?.(false)
    }
  }

  const handleChange: UploadProps['onChange'] = ({ file }) => {
    setFileList([file])
  }

  const handleRemove: UploadProps['onRemove'] = () => {
    onChange?.(undefined)
    setFileList([])
    return false
  }

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await fileToBase64(file.originFileObj as FileType)
    }
    setPreviewImage(file.url || (file.preview as string))
    setPreviewVisible(true)
  }

  return (
    <>
      <Upload
        className={cn('min-h-[110px]', className)}
        fileList={fileList}
        beforeUpload={beforeUpload}
        customRequest={customRequest}
        onRemove={handleRemove}
        onChange={handleChange}
        onPreview={handlePreview}
        listType={type}
        maxCount={1}
        accept=".jpg,.jpeg,.png"
      >
        {fileList.length < 1 && (
          <div>
            <PlusOutlined />
            <div className="mt-2">Tải ảnh lên</div>
          </div>
        )}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewVisible,
            onVisibleChange: (visible) => setPreviewVisible(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
      {description && (
        <Typography.Text className="text-[11px] leading-[18px]" italic type="secondary">
          {description}
        </Typography.Text>
      )}
    </>
  )
}

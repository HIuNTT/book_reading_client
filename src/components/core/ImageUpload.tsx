import { PlusOutlined } from '@ant-design/icons'
import { Image, Upload, UploadFile, UploadProps } from 'antd'
import { postFile } from 'modules/book/services'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface ImageUploadProps {
  name?: string
  imageUrl?: string
  value?: string
  onChange?(value: string): void
}

export default function ImageUpload({ imageUrl, name, onChange }: ImageUploadProps) {
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
      toast.error('Kích thước ảnh phải nhỏ hơn 2MB!')
    }

    return isJpgOrPng && isLt2M
  }

  const customRequest: UploadProps['customRequest'] = async (options) => {
    const formData = new FormData()
    formData.append('file', options.file as FileType)
    const {
      data: { key },
    } = await postFile(formData, {
      onUploadProgress(progressEvent) {
        const complete = ((progressEvent.loaded / progressEvent.total!) * 100) | 0
        options.onProgress?.({ percent: complete })
      },
    })
    options.onSuccess?.('OK')
    onChange?.(key)
  }

  const handleChange: UploadProps['onChange'] = ({ file }) => {
    setFileList([file])
  }

  const handleRemove: UploadProps['onRemove'] = () => {
    onChange?.('')
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
        className="min-h-[110px]"
        fileList={fileList}
        beforeUpload={beforeUpload}
        customRequest={customRequest}
        onRemove={handleRemove}
        onChange={handleChange}
        onPreview={handlePreview}
        listType="picture-card"
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
      <small className="text-[rgb(153,153,153)]">
        <i>Tối đa 1 file, dung lượng file không được quá 2MB</i>
      </small>
    </>
  )
}

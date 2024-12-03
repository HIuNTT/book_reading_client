import { UploadFile, UploadProps } from 'antd'
import { postFile } from 'modules/book/services'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface UseUploadProps {
  onSuccess?(value: string): void
  fileUrl?: string
}

export default function useUpload({ onSuccess, fileUrl }: UseUploadProps) {
  type FileType = Parameters<NonNullable<UploadProps['beforeUpload']>>[0]

  const [fileList, setFileList] = useState<UploadFile[]>([])

  console.log('fileUrl', fileList)

  useEffect(() => {
    if (fileUrl && !fileList.length) {
      setFileList([
        {
          uid: `vc-upload-${Date.now()}-1`,
          name: fileUrl.split('/').pop()!.split('?').at(0)!,
          status: 'done',
          url: fileUrl,
        },
      ])
    }
  }, [fileList.length, fileUrl])

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

  const uploadImage = async (file: FileType) => {
    const formData = new FormData()
    formData.append('file', file)
    const {
      data: { key },
    } = await postFile(formData)
    onSuccess?.(key)
  }

  const customRequest: UploadProps['customRequest'] = async (options) => {
    await uploadImage(options.file as FileType)
  }

  const handleChange: UploadProps['onChange'] = ({ file }) => {
    console.log('onChange', file)

    file.status = 'done'
    setFileList([file])
  }

  const handleRemove: UploadProps['onRemove'] = (file) => {
    console.log('onRemove', file)

    setFileList([])
    onSuccess?.('')
  }

  return {
    beforeUpload,
    customRequest,
    handleChange,
    fileList,
    handleRemove,
  }
}

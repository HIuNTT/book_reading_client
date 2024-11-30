import { PlusOutlined } from '@ant-design/icons'
import { Upload } from 'antd'
import useUpload from 'hooks/useUpload'

interface AvatarUploadProps {
  onSetValue?(value: string): void
  avatarUrl?: string
}

export default function AvatarUpload({ onSetValue, avatarUrl }: AvatarUploadProps) {
  console.log('render avatar upload', avatarUrl)

  const { fileList, beforeUpload, customRequest, handleChange, handleRemove } = useUpload({
    onSuccess: onSetValue,
    fileUrl: avatarUrl,
  })

  return (
    <Upload
      className="min-h-[110px]"
      fileList={fileList}
      beforeUpload={beforeUpload}
      customRequest={customRequest}
      onChange={handleChange}
      onRemove={handleRemove}
      listType="picture-card"
    >
      {fileList.length < 1 && (
        <div>
          <PlusOutlined />
          <div className="mt-2">Tải ảnh lên</div>
        </div>
      )}
    </Upload>
  )
}

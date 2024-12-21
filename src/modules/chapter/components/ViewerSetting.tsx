import {
  CloseOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
  SettingOutlined,
  UndoOutlined,
} from '@ant-design/icons'
import { Card, FloatButton, Space, theme } from 'antd'
import { fontFamilies, spaceStyle, themeSpace } from 'constants/viewerLayout'
import { useState } from 'react'
import { useViewerSetting } from 'stores/viewerSetting'
import { cn } from 'utils/cn'

const { useToken } = theme

export default function ViewerSetting() {
  const [settingVisible, setSettingVisible] = useState<boolean>(false)

  const { token } = useToken()
  const viewerSetting = useViewerSetting()

  return (
    <>
      <FloatButton.Group style={{ insetInlineEnd: 30 }}>
        <FloatButton
          onClick={() => setSettingVisible(true)}
          icon={<SettingOutlined />}
          style={{ width: '46px', height: '46px', border: `1px solid ${token.colorBorder}` }}
        />
        <FloatButton.BackTop
          visibilityHeight={0}
          style={{ width: '46px', height: '46px', border: `1px solid ${token.colorBorder}` }}
        />
      </FloatButton.Group>
      {settingVisible && (
        <>
          <div onClick={() => setSettingVisible(false)} className="fixed left-0 top-0 z-[100] h-full w-full"></div>
          <div className="fixed bottom-[40px] right-[30px] z-[2000] w-[370px]">
            <Card
              title="Cài đặt trình đọc"
              extra={<CloseOutlined onClick={() => setSettingVisible(false)} className="cursor-pointer text-[20px]" />}
            >
              <Space direction="vertical" className="flex" size={20}>
                <div className="flex h-8 items-center">
                  <div>Chủ đề</div>
                  <div className="flex-1">
                    <div className="flex shrink-0 justify-end gap-x-3 overflow-x-scroll scrollbar-none">
                      {spaceStyle.map((space) => (
                        <div
                          key={space.label}
                          onClick={() => viewerSetting.setSpaceColor(space.value)}
                          className="relative size-8 cursor-pointer rounded-full border-2"
                          style={{
                            backgroundColor: themeSpace[space.value].backgroundColor,
                            borderColor:
                              viewerSetting.spaceColor === space.value ? token.colorPrimary : token.colorBorder,
                          }}
                        >
                          <div
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none"
                            style={{ color: themeSpace[space.value].color }}
                          >
                            A
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex h-8 items-center">
                  <div>Phông chữ</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-end gap-x-3">
                      {fontFamilies.map((font) => (
                        <div
                          key={font.label}
                          onClick={() => viewerSetting.setFontFamily(font.value)}
                          className={cn('cursor-pointer text-[14px] opacity-60', {
                            'opacity-100': viewerSetting.fontFamily === font.value,
                          })}
                          style={{ fontFamily: font.value }}
                        >
                          {font.label}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex h-8 items-center">
                  <div>Cỡ chữ</div>
                  <div className="flex-1">
                    <div className="flex justify-end">
                      <MinusCircleOutlined
                        className={cn('text-[22px]', {
                          'pointer-events-none opacity-30': viewerSetting.fontSize === 1,
                        })}
                        onClick={viewerSetting.decFontSize}
                      />
                      <div className="mx-1 w-8 text-center font-bold">{viewerSetting.fontSize}</div>
                      <PlusCircleOutlined
                        className={cn('text-[22px]', {
                          'pointer-events-none opacity-30': viewerSetting.fontSize === 9,
                        })}
                        onClick={viewerSetting.incFontSize}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex h-8 items-center">
                  <div>Khoảng cách dòng</div>
                  <div className="flex-1">
                    <div className="flex justify-end">
                      <MinusCircleOutlined
                        className={cn('text-[22px]', { 'pointer-events-none opacity-30': viewerSetting.lineGap === 1 })}
                        onClick={viewerSetting.decLineGap}
                      />
                      <div className="mx-1 w-8 text-center font-bold">{viewerSetting.lineGap}</div>
                      <PlusCircleOutlined
                        className={cn('text-[22px]', { 'pointer-events-none opacity-30': viewerSetting.lineGap === 5 })}
                        onClick={viewerSetting.incLineGap}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex h-[18px] items-center justify-center">
                  <div className="flex cursor-pointer items-center opacity-50" onClick={viewerSetting.reset}>
                    <div className="mr-2 text-[12px]">Thiết lập lại chế độ đọc</div>
                    <UndoOutlined className="text-[14px]" />
                  </div>
                </div>
              </Space>
            </Card>
          </div>
        </>
      )}
    </>
  )
}

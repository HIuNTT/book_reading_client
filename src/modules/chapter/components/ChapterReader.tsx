import { useRef } from 'react'
import EpubView, { EpubViewRef } from './EpubView'
import { useViewerSetting } from 'stores/viewerSetting'
import { themeSpace } from 'constants/viewerLayout'
import { Contents } from 'epubjs'
import { floor } from 'lodash'

interface ChapterReaderProps {
  fileUrl: string
}

export default function ChapterReader({ fileUrl }: ChapterReaderProps) {
  const epubRef = useRef<EpubViewRef>(null)

  const { spaceColor, fontFamily, fontSize, lineGap } = useViewerSetting()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renditionRef = useRef<any>()

  return (
    <div className="min-h-full w-full">
      <div className="mx-auto min-h-full w-full max-w-[720px]">
        <div className="min-h-screen py-[10vh]">
          <EpubView
            url={fileUrl}
            ref={epubRef}
            getRendition={(rendition) => {
              renditionRef.current = rendition
              rendition.hooks.content.register((contents: Contents) => {
                const body = contents.window.document.querySelector('body')
                if (body) {
                  body.oncontextmenu = () => false
                  const head = contents.window.document.head
                  const link = contents.window.document.createElement('link')
                  link.rel = 'stylesheet'
                  link.href =
                    'https://fonts.googleapis.com/css2?family=Asap:ital,wght@0,100..900;1,100..900&family=Literata:ital,opsz,wght@0,7..72,200..900;1,7..72,200..900&family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap'
                  head.appendChild(link)
                }
              })
              renditionRef.current.themes.fontSize(`${12 + (fontSize - 1) * 2}px`)
              renditionRef.current.themes.override('color', themeSpace[spaceColor].color)
              renditionRef.current.themes.register('default', {
                p: {
                  'line-height': `${lineGap * 0.2 + 0.2 * floor(lineGap / 2) + 1} !important`,
                  'background-color': `${themeSpace[spaceColor].backgroundColor} !important`,
                },
                body: { 'font-family': `${fontFamily} !important`, padding: '0px !important' },
              })
            }}
          />
        </div>
      </div>
    </div>
  )
}

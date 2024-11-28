import ePub from 'epubjs'
import Book, { BookOptions } from 'epubjs/types/book'
import Rendition, { Location, RenditionOptions } from 'epubjs/types/rendition'
import { forwardRef, ReactNode, RefObject, useCallback, useEffect, useRef, useState } from 'react'

export interface EpubViewProps {
  url: string
  epubInitOptions?: BookOptions
  epubOptions?: RenditionOptions
  location?: string
  onLocationChange?(location: string): void
  getRendition?(rendition: Rendition): void
  loadingView?: ReactNode
}

export interface EpubViewRef extends HTMLDivElement {
  prevPage: () => void
  nextPage: () => void
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EpubView = (props: EpubViewProps, ref: RefObject<EpubViewRef> | any) => {
  const { url, epubInitOptions, epubOptions, location, onLocationChange, getRendition, loadingView } = props

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [book, setBook] = useState<Book | null>(null)
  const [rendition, setRendition] = useState<Rendition | null>(null)
  console.log('ren', rendition)

  const viewRef = useRef<HTMLDivElement>(null)

  const prevPage = useCallback(() => {
    rendition?.prev()
  }, [rendition])

  const nextPage = useCallback(() => {
    rendition?.next()
  }, [rendition])

  /** Epub init options Changed */
  useEffect(() => {
    if (!url) return

    let mounted: boolean = true

    if (!mounted) return

    const ebook = ePub(url, epubInitOptions)
    console.log('render book')

    setBook(ebook)
    setIsLoading(false)

    return () => {
      mounted = false
    }
  }, [url, epubInitOptions])

  useEffect(() => {
    let mounted = true
    if (!book) return

    const el = viewRef.current
    if (!el) return

    book.ready.then(() => {
      if (!mounted) return

      const rendition_ = book.renderTo(el, {
        width: '100%',
        height: '100%',
        ...epubOptions,
      })
      console.log('rerender')

      setRendition(rendition_)

      if (location) {
        rendition_.display(location)
      } else {
        rendition_.display()
      }

      rendition_.themes.default({ body: { padding: '0px 0px !important' } })
    })

    return () => {
      mounted = false
    }
  }, [book, location, epubOptions])

  useEffect(() => {
    if (!rendition) return

    if (getRendition) getRendition(rendition)
  }, [rendition, getRendition])

  const handleLocationChange = useCallback(
    (loc: Location) => {
      const newLocation = loc.start.cfi
      console.log(newLocation)

      // setMergedLocation(newLocation)
      onLocationChange?.(newLocation)
    },
    [onLocationChange],
  )

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        nextPage()
      } else if (event.key === 'ArrowLeft') {
        prevPage()
      }
    },
    [nextPage, prevPage],
  )

  useEffect(() => {
    if (!rendition) return

    console.log('event')

    if (ref.current) {
      ref.current.prevPage = prevPage
      ref.current.nextPage = nextPage
    }

    document.addEventListener('keyup', handleKeyPress)
    if (epubOptions?.flow !== 'scrolled') {
      rendition.on('relocated', handleLocationChange)
    }
    rendition.on('keyup', handleKeyPress)

    return () => {
      document.removeEventListener('keyup', handleKeyPress)
      rendition.off('relocated', handleLocationChange)
      rendition.off('keyup', handleKeyPress)
    }
  }, [rendition, handleKeyPress, handleLocationChange, nextPage, prevPage, ref, epubOptions?.flow])

  return (
    <>
      {isLoading && loadingView}
      <div className="min-h-full" ref={viewRef} />
    </>
  )
}

export default forwardRef(EpubView)

import { FC, useRef, useState } from 'react'
import Spinner from './Spinner/Spinner'
import useInView from '../../hooks/useInView'

interface ImageProp {
    src: string
    width: number
    height: number
    alt?: string | ''
    style: string
}

const Image: FC<ImageProp> = ({ src, width, height, alt = '', style }) => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false)
    const imgRef = useRef<HTMLDivElement | null>(null)

    const inView = useInView(imgRef)

    const handleLoad = () => {
        setIsLoaded(true)
    }

    return (
        <div
            ref={imgRef}
            className={`${style} image`}
            style={{ width, height }}
        >
            {!isLoaded && <Spinner />}
            {(inView || isLoaded) && (
                <img
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    className={style}
                    loading="lazy"
                    onLoad={handleLoad}
                />
            )}
        </div>
    )
}

export default Image

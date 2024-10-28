import { FC, useState } from 'react'
import Spinner from './Spinner/Spinner'

interface ImageProp {
    src: string
    width: number
    height: number
    alt?: string | ''
    style: string
}

const Image: FC<ImageProp> = ({ src, width, height, alt = '', style }) => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false)

    const handleLoad = () => {
        setIsLoaded(true)
    }

    return (
        <div className={`${style} image`} style={{ width, height }}>
            {!isLoaded && <Spinner />}
            <img
                src={src}
                alt={alt}
                width={width}
                height={height}
                className={style}
                loading="lazy"
                onLoad={handleLoad}
            />
        </div>
    )
}

export default Image

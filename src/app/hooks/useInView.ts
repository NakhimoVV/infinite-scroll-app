import { useEffect, useState } from 'react'

const useInView = (
    ref: React.MutableRefObject<HTMLElement | null>,
    rootMargin = '0px'
) => {
    const [isIntersecting, setIntersecting] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIntersecting(entry.isIntersecting)
            },
            { rootMargin }
        )

        if (ref.current) {
            observer.observe(ref.current)
        }
        return () => {
            if (ref.current) {
                observer.unobserve(ref.current)
            }
        }
    }, [])

    return isIntersecting
}

export default useInView

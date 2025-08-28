import { useEffect, useRef, useState } from 'react'

interface HighlightProps {
	value: string
	children: (value: string, isHighlight: boolean) => React.ReactNode
}

export const Highlight = ({ value, children }: HighlightProps) => {
	const prevValueRef = useRef<string>(undefined)
	const [isHighlight, setIsHighlight] = useState(false)
	const timeoutRef = useRef<number>(undefined)

	useEffect(() => {
		if (prevValueRef.current !== undefined && prevValueRef.current !== value) {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current)
			}

			setIsHighlight(true)

			timeoutRef.current = setTimeout(() => {
				setIsHighlight(false)
				timeoutRef.current = undefined
			}, 1000)
		}

		prevValueRef.current = value
	}, [value])

	return children(value, isHighlight)
}

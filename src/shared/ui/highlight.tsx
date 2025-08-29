import { useEffect, useRef, useState } from 'react'

interface HighlightProps {
	value: string
	children: (value: string, isHighlight: boolean) => React.ReactNode
}

const initialValue = undefined

export const Highlight = ({ value, children }: HighlightProps) => {
	const previousValueRef = useRef<string>(initialValue)
	const [isHighlight, setIsHighlight] = useState(false)
	const timeoutRef = useRef<number>(undefined)

	useEffect(() => {
		if (previousValueRef.current !== initialValue && previousValueRef.current !== value) {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current)
			}

			setIsHighlight(true)

			timeoutRef.current = setTimeout(() => {
				setIsHighlight(false)
				timeoutRef.current = undefined
			}, 1000)
		}

		previousValueRef.current = value
	}, [value])

	return children(value, isHighlight)
}

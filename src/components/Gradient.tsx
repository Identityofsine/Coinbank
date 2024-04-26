import LinearGradient, { LinearGradientProps } from "react-native-linear-gradient"
import { StyleSheet, Text } from "react-native"
import MaskedView from "@react-native-masked-view/masked-view"
import React from "react"

type GradientType = 'gradient-1' | 'gradient-2'

type GradientProps = {
	gradienttype?: GradientType
}

type TextGradientProps = {
	children: React.ReactElement
} & GradientProps


const Gradient = ({ gradienttype = 'gradient-1', ...props }: Omit<LinearGradientProps, 'colors'> & GradientProps) => {

	type GradientStyles = {
		[key in GradientType]: {
			colors: LinearGradientProps['colors'],
			location: LinearGradientProps['locations'],
		}
	}

	const gradients: GradientStyles = {
		'gradient-1': {
			colors: ['#b191ff', '#ed254e'],
			location: [0.09, 1]
		},
		'gradient-2': {
			colors: ['#ed254e', '#b191ff'],
			location: [0.09, 1]
		}
	}
	return <LinearGradient {...gradients[gradienttype]} {...props} />
}

Gradient.Mask = ({ gradienttype = 'gradient-1', children, ...props }: Omit<LinearGradientProps, 'colors'> & TextGradientProps) => {

	return (
		<MaskedView
			maskElement={children}
		>
			<Gradient gradienttype={gradienttype} {...props} >
				{React.cloneElement(children, { opacity: 0 })}
			</Gradient>
		</MaskedView>
	)
}

export default Gradient;

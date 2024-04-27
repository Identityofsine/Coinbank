import LinearGradient, { LinearGradientProps } from "react-native-linear-gradient"
import { StyleSheet, Text } from "react-native"
import MaskedView from "@react-native-masked-view/masked-view"
import React from "react"
import { AppColors } from "../styles/global.styles"

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
			colors: [AppColors["gradient-1-a"], AppColors["gradient-1-b"]],
			location: [0.09, 1]
		},
		'gradient-2': {
			colors: [AppColors["gradient-1-b"], AppColors["gradient-1-a"]],
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

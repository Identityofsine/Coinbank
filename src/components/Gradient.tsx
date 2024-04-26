import LinearGradient, { LinearGradientProps } from "react-native-linear-gradient"


type GradientProps = {
	gradienttype: 'gradient-1' | 'gradient-2'
}


const Gradient = ({ gradienttype = 'gradient-1', ...props }: Omit<LinearGradientProps, 'colors'> & GradientProps) => {

	type GradientStyles = {
		[key in GradientProps['gradienttype']]: {
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
	return <LinearGradient {...gradients[gradienttype as GradientProps['gradienttype']]} {...props} />
}

export default Gradient;

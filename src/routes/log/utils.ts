export const metersToMiles = (meters: number) => {
	return (meters * 0.000621371).toFixed(2);
};

export const metersPerSecToMinPerMile = (metersPerSec: number) => {
	const fractionalMinutes = 1 / (metersPerSec * 0.0372822715);
	// convert fractional minutes to minutes and seconds
	const minutes = Math.floor(fractionalMinutes);
	const seconds = Math.floor((fractionalMinutes - minutes) * 60).toFixed(0);
	return `${minutes}:${seconds}`;
};

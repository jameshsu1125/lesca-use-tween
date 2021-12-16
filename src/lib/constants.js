import Color from 'color';

const useColor = ['backgroundColor', 'color', 'borderColor'];

const pureUnit = (e) => {
	const t = String(e);
	const isN = t.slice(0, 1) === '-';
	let mt;
	if (isN) mt = t.substring(1);
	else mt = t;

	const [, i, u] = mt.match(/^([0-9]+\.?[0-9]*)(.*)/);
	return [Number(i) * (isN ? -1 : 1), u];
};

const hex2hls = (e) => {
	const c = Color(e);
	const { color, model } = c.hsl();
	const [h, s, l] = color;
	return [{ h, s, l }, model];
};

export const UnitSpliter = (styleName, value) => {
	const isColor = useColor.filter((e) => e === styleName).length !== 0;
	if (isColor) return hex2hls(value);
	return pureUnit(value);
};

export const UnitConbiner = (e, u) => {
	const result = {};
	Object.entries(e).forEach((t) => {
		const [key, value] = t;
		const [classname, c] = key.split('@');
		const unit = u[classname];
		if (unit === 'hsl') {
			result[classname] = { ...result[classname], [c]: value };
		} else result[classname] = `${value}${unit}`;
	});
	Object.entries(result).forEach((e) => {
		const [key, value] = e;
		const isHSL = useColor.filter((e) => e === key);
		if (isHSL.length !== 0) {
			const { h, s, l } = value;
			result[key] = `hsl(${h}, ${s}%, ${l}%)`;
		}
	});
	return result;
};

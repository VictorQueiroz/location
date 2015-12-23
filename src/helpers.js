function isObject(value) {
	return (value != null && typeof value == 'object');
}

function isUndefined(value) {
	return typeof value == 'undefined';
}

function isDefined(value) {
	return isUndefined(value) === false;
}

function isNumber(value) {
	return typeof value == 'number';
}

function isBoolean (value) {
	return typeof value == 'boolean';
}

function isString(value) {
	return typeof value == 'string';
}

function toArray(value) {
	return Array.prototype.slice.call(value);
}

var isArray = Array.isArray || function(array) {
	return isObject(array) && (array instanceof Array === true);
};

function inherits(ctor, ctorSrc, attrs) {
	ctor.prototype = Object.create(ctorSrc.prototype);

	if(isObject(attrs)) {
		extend(ctor.prototype, attrs);
	}
}

function extend (target) {
	if(!target) target = {};

	var sources = toArray(arguments).slice(1).filter(isDefined);

	var source,
			value,
			keys,
			key,
			ii = sources.length,
			jj,
			i,
			j;

	for(i = 0; i < ii; i++) {
		if((source = sources[i]) && isObject(source)) {
			keys = Object.keys(source);
			jj = keys.length;

			for(j = 0; j < jj; j++) {
				key 					= keys[j];
				value 				= source[key];

				target[key] 	= value;
			}
		}
	}

	return target;
}

function isObject (value) {
	return value !== null && (typeof value === 'object');
}
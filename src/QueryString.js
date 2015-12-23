var decode = function(value) {
	return decodeURIComponent(value);
};

var encode = function(value) {
	return encodeURIComponent(value);
};

var QueryString = {
	stringify: function(object) {
		var i,
				key,
				keys = Object.keys(object),
				value,
				values = new Array(keys.length);

		for(i = keys.length - 1; i >= 0; i--) {
			key = keys[i];
			value = object[key];

			if(isArray(value)) {
				value = value.join(',');
			}

			values[i] = encode(key) + '=' + encode(value);
		}

		return values.join('&');
	},

	parse: function(string) {
		if(isString(string)) {
			var i,
					key,
					value,
					object = {},
					values = string.split('&').filter(function(str) {
						return str.length > 0;
					}).map(function(piece) {
						return piece.split('=').filter(function(str) {
							return str.length > 0;
						});
					});

			for(i = values.length - 1; i >= 0; i--) {
				value = values[i];
				key = decode(value[0]);

				object[key] = decode(value[1]);
			}

			return object;
		}

		return {};
	}
};
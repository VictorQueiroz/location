function Location(browser) {
	EventEmitter.call(this);

	this.url_ = null;
	this.browser = browser;
	this.sync();

	var location = this;

	this.onUrlChangeListener = function(url, oldUrl) {
		location.sync();

		if(!location.emit('locationChangeStart', location.url(), location.oldUrl)) {
			location.url(oldUrl);
		}
	};

	this.browser.on('urlChange', this.onUrlChangeListener);
}

inherits(Location, EventEmitter, {
	/**
	 * Getter/setter
	 *
	 * Set/retrieve the entire url
	 */
	url: function(url) {
		if(url) {
			this.browser.url(url);
		} else {
			return this.url_;
		}

		return this;
	},

	search: function(search) {
		var url = this.url().split('?');

		if(isObject(search)) {
			url[1] = QueryString.stringify(search);

			this.url(url.join('?'));
		} else {
			return QueryString.parse(url[1]);
		}

		return this;
	},

	path: function(path) {
		var url = this.url().split('?');

		if(path) {
			url[0] = path;

			this.url(url.join('?'));
		} else {
			return url[0];
		}

		return this;
	},

	/*
	 * Keep the location service directly
	 * updated with the browser service
	 */
	sync: function() {
		var url = this.browser.url();

		if(url !== this.url_) {
			this.oldUrl = this.url_;
			this.url_ = url;
		}

		return this;
	},

	destroy: function() {

	}
});

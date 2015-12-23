function Browser (global) {
	EventEmitter.call(this);

	this.url_ = null;
	this.global = global;

	if(this.global.location.hash.length === 0) {
		this.url('/');
	}

	this.sync();

	var browser = this;

	this.onHashChange_ = function() {
		if(browser.url() !== browser.oldUrl) {
			browser.sync();
			browser.emit('urlChange', browser.url(), browser.oldUrl);
		}
	};

	global.addEventListener('hashchange', this.onHashChange_);
}

inherits(Browser, EventEmitter, {
	url: function(url) {
		if(url) {
			var global = this.global;

			global.location.hash = url;
		} else {
			return this.url_;
		}

		return this;
	},

	/**
	 * Keep the `url_` property of the browser instance, updated
	 * according to the `window.location.hash` value
	 */
	sync: function() {
		var url = this.global.location.hash.substring(1);

		if(url !== this.url_) {
			this.oldUrl = this.url_;
			this.url_ = url;
		}

		return this;
	},

	destroy: function() {
		this.removeAllListeners();
		this.global.removeEventListener('hashchange', this.onHashChange_);
	}
});

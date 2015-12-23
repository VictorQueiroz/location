function FakeWindow() {
	EventEmitter.call(this);

	var self = this,
			$location = { hash: '' };

	this.location = {
		get hash() {
			return $location.hash;
		},

		set hash(value) {
			try {
				if(value.charAt(0) !== '#') {
					value = ('#' + value);
				}

				return ($location.hash = value);
			} finally {
				self.emit('hashchange');
			}
		}
	};
}

inherits(FakeWindow, EventEmitter, {
	addEventListener: function () {
		return this.on.apply(this, arguments);
	},

	removeEventListener: function() {
		return this.off.apply(this, arguments);
	}
});

describe('Browser', function() {
	var browser, fakeWindow = new FakeWindow();

	beforeEach(function() {
		browser = new Browser(fakeWindow);
	});

	it('should detect hash changes and execute listeners', function() {
		var onUrlChangeSpy = jasmine.createSpy();

		browser.on('urlChange', onUrlChangeSpy);

		fakeWindow.location.hash = '/test';

		expect(onUrlChangeSpy).toHaveBeenCalledWith('/test', '/');
	});

	it('should set the hash url', function() {
		expect(browser.url()).toEqual(fakeWindow.location.hash.substring(1));

		browser.url('/my/path/here');

		expect(fakeWindow.location.hash).toEqual('#/my/path/here');
	});
});

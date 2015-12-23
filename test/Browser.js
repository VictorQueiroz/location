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
	var browser,
      fakeWindow = new FakeWindow(),
      listenerSpy = jasmine.createSpy();

	beforeEach(function() {
    browser = new Browser(fakeWindow);
    browser.url('/');

    listenerSpy = jasmine.createSpy();
	});

  afterEach(function() {
    browser.removeAllListeners();
  });

	it('should detect hash changes and execute listeners', function() {
		browser.on('urlChange', listenerSpy);

		fakeWindow.location.hash = '/test';

		expect(listenerSpy).toHaveBeenCalledWith('/test', '/');
	});

	it('should set the hash url', function() {
		expect(browser.url()).toEqual(fakeWindow.location.hash.substring(1));

		browser.url('/my/path/here');

		expect(fakeWindow.location.hash).toEqual('#/my/path/here');
	});

  it('should not emit "urlChange" event when replacing the hash', function() {
    browser.on('urlChange', listenerSpy);

    browser.url('/some/cool/url/here', 1);
    expect(listenerSpy).not.toHaveBeenCalledWith('/some/cool/url/here', '/');

    browser.url('/some/cool/url/here');
    expect(listenerSpy).toHaveBeenCalledWith('/some/cool/url/here', '/');
  });
});

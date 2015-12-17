describe('Browser', function() {
	var browser;

	beforeEach(function() {
		browser = new Browser(window);
		browser.url('/');
	});

	it('should detect hash changes and execute listeners', function(done) {
		var onUrlChangeSpy = jasmine.createSpy();

		browser.onUrlChange(onUrlChangeSpy);
		window.location.hash = '/test';

		setTimeout(function() {
			expect(onUrlChangeSpy).toHaveBeenCalledWith('/test');

			done();
		});
	});

	it('should set the hash url', function() {
		expect(browser.url()).toEqual(window.location.hash.substring(1));

		browser.url('/my/path/here');
		expect(window.location.hash).toEqual('#/my/path/here');
	});
});
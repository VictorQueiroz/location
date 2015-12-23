describe('Location', function() {
	var fakeWindow = new FakeWindow(),
			browser,
			location;

	beforeEach(function() {
		browser = new Browser(fakeWindow);
		location = new Location(browser);

		location.url('/');
		browser.sync();
		location.sync();
	});

	afterEach(function() {
		location.removeAllListeners();
	});

  describe('Events', function() {
    var listenerSpy;

    beforeEach(function() {
      listenerSpy = jasmine.createSpy();
    });

    describe('locationChangeSuccess', function() {
      it('should emit "locationChangeSuccess" when the location change finish', function() {
        location.on('locationChangeSuccess', listenerSpy);

        location.path('/settings');
        browser.sync();
        location.sync();

        expect(listenerSpy).toHaveBeenCalledWith('/settings', '/');
      });

      it('should not emit the "locationChangeSuccess" when the location is prevented by some listener', function() {
        location.on('locationChangeStart', function(url, oldUrl) {
          if(url !== '/' && url !== '/not-ignore-path') {
            return false;
          }
        })
        .on('locationChangeSuccess', listenerSpy);

        browser.url('/home');
        browser.sync();
        location.sync();

        expect(location.url()).toEqual('/');
        expect(listenerSpy).not.toHaveBeenCalledWith('/home', '/');

        location.url('/products?page=4');
        browser.sync();
        location.sync();

        expect(location.url()).toEqual('/');
        expect(listenerSpy).not.toHaveBeenCalledWith('/products?page=4', '/');

        location.url('/not-ignore-path');
        browser.sync();
        location.sync();

        expect(location.url()).toEqual('/not-ignore-path');
        expect(listenerSpy).toHaveBeenCalledWith('/not-ignore-path', '/');
      });
    });

    describe('locationChangeStart', function() {
    	it('should emit "locationChangeStart" event when browser url changes', function() {
    		location.on('locationChangeStart', function(a, b) {
    			listenerSpy(a, b);
    		});

    		browser.url('/home/index');
    		browser.sync();
    		location.sync();

    		expect(listenerSpy).toHaveBeenCalledWith('/home/index', '/');

    		browser.url('/home');
    		browser.sync();
    		location.sync();

    		expect(listenerSpy).toHaveBeenCalledWith('/home', '/home/index');
    	});

    	it('should prevent "locationChangeStart" and rollback to the old url', function() {
    		location.on('locationChangeStart', function(url, oldUrl) {
    			if(url !== '/' && url !== '/not-ignore-path') {
    				return false;
    			}
    		});

    		browser.url('/home');
    		browser.sync();
    		location.sync();

    		expect(location.url()).toEqual('/');

    		location.url('/products?page=4');
    		browser.sync();
    		location.sync();

    		expect(location.url()).toEqual('/');

    		location.url('/not-ignore-path');
    		browser.sync();
    		location.sync();

    		expect(location.url()).toEqual('/not-ignore-path');
    	});
    });
  });

	describe('search()', function() {
		it('should add parameters to the hash sign', function() {
			location.search({age: 18});
			browser.sync();
			location.sync();

			expect(location.url()).toEqual(
				'/?age=18'
			);
		});

		it('should get the actual search value', function() {
			location.search({name: 'mark'});
			browser.sync();
			location.sync();

			expect(location.search()).toEqual({name: 'mark'});
		});

		it('should replace the entire query on url everytime any search value is assigned', function() {
			location.search({search: 'balls', size: '40cm'});
			browser.sync();
			location.sync();

			expect(location.url()).toEqual('/?search=balls&size=40cm');
		});
	});

	describe('path()', function() {
		it('should give only the path of the url', function() {
			location.search({search: 'xbox'});
			browser.sync();
			location.sync();

			expect(location.path()).toEqual('/');
		});

		it('should change only the path of the url', function() {
			location.search({search: 'boxes', 'min-price': '100'});
			browser.sync();
			location.sync();

			location.path('/home');
			browser.sync();
			location.sync();
			expect(location.url()).toEqual('/home?search=boxes&min-price=100');

			location.path('/product-detail');
			browser.sync();
			location.sync();
			expect(location.url()).toEqual('/product-detail?search=boxes&min-price=100');
		});
	});
});

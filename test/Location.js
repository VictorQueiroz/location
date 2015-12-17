describe('Location', function() {
	var $window = window,
			browser,
			location;

	beforeEach(function() {
		browser = new Browser($window);
		location = new Location(browser);
		location.url('/');
	});

	describe('search()', function() {
		it('should add parameters to the hash sign', function() {
			expect(location.search({age: 18}).url()).toEqual(
				'/?age=18'
			);
		});

		it('should get the actual search value', function() {
			var query = {name: 'mark'};

			expect(location.search(query).search()).toEqual(query);
		});

		it('should replace the entire query on url everytime any search value is assigned', function() {
			location.search({search: 'balls', size: '40cm'});

			expect(location.url()).toEqual('/?search=balls&size=40cm');
		});
	});

	describe('path()', function() {
		it('should give only the path of the url', function() {
			location.search({search: 'xbox'});

			expect(location.path()).toEqual('/');
		});

		it('should change only the path of the url', function() {
			location.search({search: 'boxes', 'min-price': '100'});
			
			location.path('/home');
			expect(location.url()).toEqual('/home?search=boxes&min-price=100');

			location.path('/product-detail');
			expect(location.url()).toEqual('/product-detail?search=boxes&min-price=100');
		});
	});
});
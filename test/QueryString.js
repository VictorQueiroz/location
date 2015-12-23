describe('QueryString', function() {
	describe('stringify()', function() {
		it('should stringify an object', function() {
			expect(QueryString.stringify({
				search: 'for my name',
				age: 18
			})).toEqual(
				'search=for%20my%20name&age=18'
			);
		});
	});

	describe('parse()', function() {
		it('should parse a string to an object', function() {
			expect(QueryString.parse('a=1&b=2&c=3&d=4')).toEqual({
				a: '1',
				b: '2',
				c: '3',
				d: '4'
			});
		});
	});
});

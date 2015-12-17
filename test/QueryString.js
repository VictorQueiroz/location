describe('QueryString', function() {
	it('should stringify an object', function() {
		expect(decodeURIComponent(QueryString.stringify({
			search: 'for my name',
			age: 18
		}))).toEqual(
			'search=for my name&age=18'
		);
	});
});
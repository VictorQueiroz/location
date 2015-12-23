# location

### Dependencies
- [eventemitter](https://github.com/VictorQueiroz/eventemitter)

### Installation
```
bower install --save location
```

The location changes will be applied to the url hash (soon, HTML5 url approach will be available, same as AngularJS $location service)

### Usage
```js
var browser = new $location.Browser(window);
var location = new $location.Location(browser);

location.path('/home/index');
location.url('/search/products?size=20cm&weight=2kg');

expect(location.search()).toEqual({size: '20', weight: '2kg'});

location.search({ size: '20cm' });
location.path('/search/category/1');
```
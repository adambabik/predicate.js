# predicate.js

A simple library to retrieve object's properties based on a predicate expression.

## Features

+ uses the Safe Navigation operator (`?.`) in a predicate definition to handle optional object's properties
+ translates to native code - practically no footprint on the performance
+ works in browser and node.js environment

## Why?

Processing large JSON objects can be error-prone, especially if these objects` properties can be filled with null values or may vary inconsistently because of lack of some properties.

Such situations can lead to large and complicated if statements. **predicate.js** is a simple library to solve this problem by creating a function based on a predicate expression, which is a "path" to value you'd like to retrieve.

## Usage

In oreder to create a predicate object, you need to call `predicate` function with one parameter - predicate expression which is a string.

```
var pre = predicate("chain.of.properties");
```

If any property in a properties chain can be `null`, you should use the Save Navigation operator. 

```
var pre = predicate("chain.?of.?properties");
```

To obtain a value from object based on a predicate expression, you need to call function returned by `predicate` function with this object as only argument.

```
var obj = {
	chain: {
		of: {
			properties: "Get me!"
		}
	}
};

var pre = predicate("chain.?of.?properties");

pre(obj); // => "Get me!"
```

## License
Copyright (c) 2012 Adam Babik
Licensed under the MIT license.
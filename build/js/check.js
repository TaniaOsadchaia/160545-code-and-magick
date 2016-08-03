function getMessage(a, b) {
	var result;
	var typeA = typeof a;
	switch (typeA) {

		case 'boolean':

			if (a) {
				result = 'Я попал в ' + b;
			} else {
				result = 'Я никуда не попал';
			}
			break;

		case 'number':

			result = 'Я прыгнул на ' + (a * 100) + ' сантиметров';
			break;

		case 'object':

			if (a instanceof Array) {
				if (b instanceof Array) {
					var distancePath = 0;
					for (var i = 0; i < a.length; i++) {
						distancePath += (a[i] * b[i]);
					}
					result = 'Я прошёл ' + distancePath + ' метров';
				} else {
					var numberOfSteps = 0;
					for (var i = 0; i < a.length; i++) {
						numberOfSteps += a[i];
					}
					result = 'Я прошёл ' + numberOfSteps + ' шагов';
				}
				break;
			}

		default:
			result = 'unknown type';
	}
	return result;
}
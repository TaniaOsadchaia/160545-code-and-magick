function getMessage(a, b) {
	var i;
	var typeA = typeof a;

	if (typeA == 'number') {
		return 'Я прыгнул на ' + (a * 100) + ' сантиметров';
	}

	if (typeA == 'boolean') {
		if (a) {
			return 'Я попал в ' + b;
		} else {
			return 'Я никуда не попал';
		}
	}

	if (a instanceof Array) {
		if (b instanceof Array) {
			var distancePath = 0;
			for (i = 0; i < a.length; i++) {
				distancePath += (a[i] * b[i]);
			}
			return 'Я прошёл ' + distancePath + ' метров';
		} else {
			var numberOfSteps = 0;
			for (i = 0; i < a.length; i++) {
				numberOfSteps += a[i];
			}
			return 'Я прошёл ' + numberOfSteps + ' шагов';
		}
	}

	return 'bad params';
}
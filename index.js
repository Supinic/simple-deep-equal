module.exports = (one, two) => {
	if (one === two) {
		return true;
	}
	else if (typeof one !== typeof two) {
		return false;
	}
	else if (one?.constructor !== two?.constructor) {
		return false;
	}
	else if (one !== null && typeof one === "object") {
		const keys1 = Object.keys(one);
		const keys2 = Object.keys(two);
		for (const key of keys1) {
			const equivalent = keys2.findIndex(i => i === key);
			if (equivalent === -1) {
				return false;
			}
		}
		for (const key of keys2) {
			const equivalent = keys1.findIndex(i => i === key);
			if (equivalent === -1) {
				return false;
			}
		}

		for (const key of keys1) {
			const equivalent = deepEqual(one[key], two[key]);
			if (!equivalent) {
				return false;
			}
		}

		if (typeof one.valueOf === "function" && typeof two.valueOf === "function") {
			const valueOne = one.valueOf();
			const valueTwo = two.valueOf();
			if (typeof valueOne !== "object" && typeof valueTwo !== "object" && valueOne !== valueTwo) {
				return false;
			}
		}
		if (typeof one.toJSON === "function" && typeof two.toJSON === "function") {
			const valueOne = one.toJSON();
			const valueTwo = two.toJSON();
			if (typeof valueOne !== "object" && typeof valueTwo !== "object" && valueOne !== valueTwo) {
				return false;
			}
		}
		if (typeof one.toString === "function" && typeof two.toString === "function") {
			const valueOne = one.toString();
			const valueTwo = two.toString();
			if (typeof valueOne !== "object" && typeof valueTwo !== "object" && valueOne !== valueTwo) {
				return false;
			}
		}

		return true;
	}
	else {
		return false;
	}
};
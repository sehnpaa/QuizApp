!function () {
	// creating a merge method that will merge our localStorage objects
	 Object.prototype.merge = function (target, obj) {
		target = target || {};

		for(var key in obj) {
		  target[key] = obj[key];
		}
		return target;
	}

	Object.prototype.show = function () {
		return this.style.display = '';
	}

	Object.prototype.hide = function () {
		return this.style.display = 'none';
	}

	//compare userAnswers with the correct Answers
	Array.prototype.compare = function (answers) {
		var count = 0;
		for(var i = 0; i < answers.length; i++) {
			if(answers[i] === this[i])
				count++;
		}
		return count;
	}

}();
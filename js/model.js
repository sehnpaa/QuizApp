!function () {
	function QuestionModel (obj) {
		this.question = obj.question;
		this.choices = obj.choices;
		this.userAnswer = obj.userAnswer || null;
	}

	QuestionModel.prototype.renderTemplate = function (temp) {
		Mustache.parse(temp);
		rendered = Mustache.render(temp, this);
		return rendered;
	}

	function Finished (correct, length) {
		this.correct = correct;
		this.length = length;
	}

	Finished.prototype.render = QuestionModel.prototype.renderTemplate;

	return window.Model = {
			data: QuestionModel,
			finished: Finished
		};
}();



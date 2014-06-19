  !function (obj) {
    var create = Model.data,
        quiz = $('#quiz'),
        next = $('#quizWrapper'),
        nextButton = $("input[type='submit']"),
        back = $('#back'),
        restart = $('#restart'),
        template = $('#questionTemp').innerHTML,
        lastTemp = $('#finished').innerHTML,
        leng = data.length,
        currentPage,
        local,
        input,
        views;

    function createViews() {
        views = data.map(function (val) {
            return new create(val);
        });
        animate(next, 'slideInDown');

        if (!store.getData('user')) {
            back.hide();
            store.setData('user', {
                currentPage: 0,
                userAnswer: []
            });
            local = store.getData('user');
            currentPage = 0;
            quiz.innerHTML = views[currentPage].renderTemplate(template);

        } else {
            local = store.getData('user');
            currentPage = local.currentPage;

            if (currentPage === (data.length)) return finish();

            if (!currentPage) back.hide();
            else back.show();

            quiz.innerHTML = views[currentPage].renderTemplate(template);
            checkAnswer();
        }
        restart.hide();
        nextButton.show();
    }

    function nextPage(event) {
        event.preventDefault();
        animate(next, 'slideOutRight');
        window.setTimeout(function () {

            isAnswered();
            animate(next, 'bounceInLeft');
            currentPage++;
            updateStore(currentPage);

            if (currentPage === (data.length)) return finish();

            if (currentPage) back.show();

            quiz.innerHTML = views[currentPage].renderTemplate(template);
            checkAnswer();
        }, 1000);
    }

    function isAnswered() {
        input = $('input');
        for (var i = 0; i < input.length; i++) {
            if (input[i].checked) {
                local.userAnswer[currentPage] = input[i].value;
            }
        }
    }


    function updateStore(count) {
        local.currentPage = count;
        store.setData('user', local);
    }

    function checkAnswer() {
        input = $('input');
        for (var i = 0; i < input.length; i++) {
            if (input[i].value === local.userAnswer[currentPage]) input[i].checked = true;
        }
    }

    function finish() {
        var answers = data.map(function (val) {
            return val.answer;
        }),
            correct = answers.compare(local.userAnswer);
        quiz.innerHTML = new Model.finished(correct, data.length).render(lastTemp);
        nextButton.hide();
        restart.show();
    }

    function animate(id, animation) {
        id.className = 'animated ' + animation;
        window.setTimeout(function () {
            id.className = '';
        }, 1000);
    }

    function $(query) {
        var selector = document.querySelectorAll(query);
        return selector.length > 1 ? selector : selector[0];
    }

    function goBack() {
        animate(next, 'slideOutLeft');
        window.setTimeout(function () {
            isAnswered();
            animate(next, 'bounceInRight');
            currentPage--;
            updateStore(currentPage);
            nextButton.show();
            restart.hide();

            if (!currentPage) back.hide();

            quiz.innerHTML = views[currentPage].renderTemplate(template);
            checkAnswer();
        }, 1000);
    }

    function restartQuiz () {
    	localStorage.clear();
    	createViews();
    }

    window.addEventListener('load', createViews);
    next.addEventListener('submit', nextPage);
    back.addEventListener('click', goBack);
    restart.addEventListener('click', restartQuiz);
}(window.Model);
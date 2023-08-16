

$(document).ready(function() {
    /*--------------------- navbar encolher ------------------*/
    $(window).on("scroll",function(){
        if($(this).scrollTop() > 90){
            $(".navbar").addClass("navbar-shrink");
        }
        else{
            $(".navbar").removeClass("navbar-shrink");
        }
    }); 

    /*--------------------- video popup -----------------------*/
    const videoSrc = $("#player-1").attr("src");
    $(".video-play-btn, .video-popup").on("click", function(){
        if($(".video-popup").hasClass("open")){
            $(".video-popup").removeClass("open");
            $("#player-1").attr("src","");
        }
        else{
            $(".video-popup").addClass("open");
            if($("#player-1").attr("src")==''){
                $("#player-1").attr("src",videoSrc);
            }
        }
    });

    /*---------------------- features carousel ----------------- */

    $('.features-carousel').owlCarousel({
        loop:true,
        margin:0,
        autoplay:false,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
            },
            600:{
                items:2,
            },
            1000:{
                items:3,
            }
        }
    });

     /*---------------------- exemplo carousel ----------------- */

     $('.screenshots-carousel').owlCarousel({
        loop:false,
        margin:0,
        responsiveClass:false,
        responsive:{
            0:{
                items:1,
            },
            600:{
                items:2,
            },
            1000:{
                items:4,
            }
        }
    });


    /*---------------------- equipe carousel ----------------- */

    $('.team-carousel').owlCarousel({
        loop:false,
        margin:0,
        responsiveClass:false,
        responsive:{
            0:{
                items:1,
            },
            600:{
                items:2,
            },
            1000:{
                items:3,
            }
        }
    });
    /*---------------------- scroll das paginas - Scrollit ---------------- */
    $.scrollIt({
        topOffset: -50
    });

    /*---------------------- NAVBAR COLLAPSE                -- ---------------- */
    $(".nav-link").on("click", function(){
        $(".navbar-collapse").collapse("hide");
    });

    /*---------------------- Alteração de Imagem ---------------- */
    const imagePaths = [
        '6_orange_darkgreen.jpg',
        '8_orange_darkgreen.jpg',
        '29_orange_darkgreen.jpg',
        '57_orange_darkgreen.jpg',
        '5_green_yellow_red.jpg',
        '15_green_yellow_red.jpg',
        '16_green_yellow_red.jpg',
        '73_green_yellow_red.jpg',
        '2_orange_green.jpg',
        '6_orange_green.jpg',
        '45_orange_green.jpg',
        '97_orange_green.jpg',
        '26_orange_black.jpg',
        '35_orange_black.jpg',
        '42_orange_black.jpg',
        '96_orange_black.jpg',
    ];
    const optionsPerImage = [
        ['Número 6', 'Número 5'],
        ['Número 3', 'Número 8'],
        ['Número 29', 'Número 70'],
        ['Número 57', 'Número 35'],
        ['Número 2', 'Número 5'],
        ['Número 17', 'Número 15'],
        ['Número 16', 'Vazio/Outro'],
        ['Vazio/Outro', 'Número 73'],
        ['Vazio/Outro', 'Número 2'],
        ['Número 6', 'Vazio/Outro'],
        ['Vazio/Outro', 'Número 45'],
        ['Número 97', 'Vazio/Outro'],
        ['Número 6', 'Número 26'],
        ['Número 35', 'Número 5'],
        ['Número 42', 'Número 4'],
        ['Número 96', 'Número 9'],
    ];
    const correctAnswers = [
        'Número 6', 'Número 8', 'Número 29', 'Número 57',
        'Número 5', 'Número 15', 'Número 16', 'Número 73',
        'Número 2', 'Número 6', 'Número 45', 'Número 97',
        'Número 26', 'Número 35', 'Número 42', 'Número 96'
    ];

    let currentImageIndex = 0;
    let userAnswers = [];

    function changeImage(chosenOption) {
        if (currentImageIndex >= imagePaths.length) {
            // Todas as imagens já foram respondidas, faça ação de conclusão aqui
            showTestCompletion();
            return;
        }

        const testImage = document.getElementById('test-img');
        testImage.src = 'img/Teste/' + imagePaths[currentImageIndex];

        // Resto do seu código para atualizar respostas e botões
        updateButtons();

        currentImageIndex++; // Mover para a próxima imagem após a atualização
    }

    function updateButtons() {
        const optionsForImage = optionsPerImage[currentImageIndex];

        $(".btn-1").each(function(index) {
            const button = $(this);
            const optionForImage = optionsForImage[index];

            button.text(optionForImage);

            if (userAnswers[currentImageIndex] === optionForImage) {
                button.addClass("selected");
            } else {
                button.removeClass("selected");
            }
        });
    }

    function showTestCompletion() {
        // Esconder botões de resposta
        $(".choices").hide();

        // Mostrar nova imagem e texto de conclusão
        const newImageSrc = 'img/Teste/12_blue_orange.jpg'; // Substitua pelo caminho da nova imagem
        const newImageAlt = 'Teste Final'; // Substitua pelo texto alternativo da nova imagem
        const newText = 'Parabéns, você completou o teste!'; // Substitua pelo texto que desejar

        const testImage = document.getElementById('test-img');
        testImage.src = newImageSrc;
        testImage.alt = newImageAlt;

        const newTextElement = document.getElementById('test-text');
        newTextElement.textContent = newText;

        // Exibir as respostas do usuário
        const userAnswersElement = document.getElementById('user-answers');
        userAnswersElement.innerHTML = '<strong>Respostas:</strong><br>';
        for (let i = 0; i < userAnswers.length; i++) {
            const userAnswer = userAnswers[i];
            const isCorrect = userAnswer === correctAnswers[i] ? 'Correta' : 'Incorreta';
            userAnswersElement.innerHTML += `Pergunta ${i + 1}: ${userAnswer} - ${isCorrect}<br>`;
        }

        // Calcular e exibir a pontuação do usuário
        const userScoreElement = document.getElementById('user-score');
        const score = calculateScore();
        userScoreElement.innerHTML = `Pontuação: ${score} / ${correctAnswers.length}`;
    }

    function calculateScore() {
        let score = 0;
        for (let i = 0; i < userAnswers.length; i++) {
            if (userAnswers[i] === correctAnswers[i]) {
                score++;
            }
        }
        return score;
    }

    $(".btn-1").on("click", function() {
        const buttonText = $(this).text();
        userAnswers[currentImageIndex] = buttonText;
        changeImage(buttonText);
    });

    // Inicializar a primeira imagem e botões
    changeImage();

});
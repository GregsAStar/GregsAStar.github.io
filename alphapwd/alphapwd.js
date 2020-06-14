
slides = [
    [
        "What is Alphapwd?",
        "Sure, making your password \"password\" is very tempting, but using a simple dictionary word or a name will make your password incredibly easy for hackers to guess, putting your accounts at risk. To keep yourself secure you will want to use a long password with uppercase letters, lowercase letters, numbers, and symbols. But, you might ask, who is going to remember a password like \"$#W5heU%o28l\"?! This is what Alphapwd aims to solve. Alphapwd is a password creation technique that makes passwords both easy to remember <i>and</i> secure. Click next to find out how it works!"
    ],
    [
        "How does it work?",
        "We begin by choosing a short word that is easy to remember, known as the mnemonic. We will choose to use the word \"CAT\" as our mnemonic in the example shown on the left. For each letter in your mnemonic, you will pick a starting point on your keyboard and imagine yourself drawing that letter on the keyboard from that starting point. Make sure to remember your starting points! Press each key that you cross while \"drawing\" the letter over your keyboard. You should also use the SHIFT key in combination with the other keys at some interval you choose so that you type some symbols and uppercase letters. In the example on the left we used the SHIFT key on every other stroke, but you could also choose to switch on every other letter, every other key, or any pattern you choose. Once you understand what we are going to do, click next to try it for yourself!"
    ],
    [
        "Designing your password",
        "Pick a short mnemonic and try drawing its letters on the keyboard image on the left. Make sure you cover letters as well as numbers and symbols. Ignore keys such as CAPS, TAB, CTRL, ALT, etc. You can press the clear button below to return to a blank keyboard. Once you are happy with your placement of the letters, click next."
    ],
    [
        "Testing your password",
        "Now you can try typing your password in the box below. Remember to use the SHIFT key at some points as described earlier. When you type your password, trace the keys on your physical keyboard in the same way you did in your drawing. If you have entered in your password correctly with uppercase letters, lowercase letters, numbers and symbols, you should have a \"very strong\" password. You can also try the password \"43wsdVGYHNgh()_0pl\" which was the password from our example. Click next for more information about Alphapwd."
    ],
    [
        "Where did Alphapwd come from?",
        "The idea behind Alphapwd comes from an article published by IEEE.<br><br>Citation: J. Song, D. Wang, Z. Yun and X. Han, \"Alphapwd: A Password Generation Strategy Based on Mnemonic Shape,\" in IEEE Access, vol. 7, pp. 119052-119059, 2019, doi: 10.1109/ACCESS.2019.2937030."
    ],

]

function changeSlide(slide){
    document.getElementById("slideTitle").innerHTML = slides[slide][0];
    document.getElementById("slideText").innerHTML = slides[slide][1];
    buttonBack = document.getElementById("buttonBack");
    buttonNext = document.getElementById("buttonNext");
    divSlide2 = document.getElementById("slide2");
    divSlide3 = document.getElementById("slide3");
    
    buttonBack.disabled = (slide == 0);
    buttonNext.disabled = (slide == slides.length - 1);

    divSlide2.style.display = ((slide == 2) ? "block" : "none");
    divSlide3.style.display = ((slide == 3) ? "block" : "none");

    draw(slide);
}

function draw(slide){
    draw.animationc = 0;
    if(typeof draw.init == 'undefined'){
        draw.canvas = document.getElementById("interactive");
        paper.setup(draw.canvas);

        /* LAYER 0 */
        draw.randomtext = new paper.Group();
        for(var i=0; i<50; i++){
            var randx = Math.floor(Math.random() * paper.view.size.width);
            var randy = Math.floor(Math.random() * paper.view.size.height);
            draw.randomtext.addChild(new paper.PointText(randx, randy));
            draw.randomtext.lastChild.fillColor = "lime";
            draw.randomtext.lastChild.content = Math.floor(Math.random() * 2468).toString(2);
            draw.randomtext.lastChild.fontSize = "1em";
        }

        /* LAYER 1 */
        new paper.Layer();
        draw.keyboard = new paper.Raster("img_keyboard")
        draw.keyboard.position = paper.view.center;
        draw.keyboard.fitBounds(paper.view.bounds);

        draw.password = new paper.PointText(30, paper.view.size.height*0.95);
        draw.password.fillColor = "white";
        draw.password.content = "Password: ";
        draw.password.fontSize = "2em";

        draw.c_stroke_1 = new paper.Path();
        draw.c_stroke_1.strokeColor = "red";
        draw.c_stroke_1.strokeWidth = 5;
        draw.a_stroke_1 = new paper.Path();
        draw.a_stroke_1.strokeColor = "red";
        draw.a_stroke_1.strokeWidth = 5;
        draw.a_stroke_2 = new paper.Path();
        draw.a_stroke_2.strokeColor = "red";
        draw.a_stroke_2.strokeWidth = 5;
        draw.t_stroke_1 = new paper.Path();
        draw.t_stroke_1.strokeColor = "red";
        draw.t_stroke_1.strokeWidth = 5;
        draw.t_stroke_2 = new paper.Path();
        draw.t_stroke_2.strokeColor = "red";
        draw.t_stroke_2.strokeWidth = 5;

        /* LAYER 2 */
        new paper.Layer();
        draw.keyboard2 = new paper.Raster("img_keyboard")
        draw.keyboard2.position = paper.view.center;
        draw.keyboard2.fitBounds(paper.view.bounds);

        draw.userdrawings = new paper.Group();

        paper.view.onResize = function (){
            draw.keyboard.position = paper.view.center;
            draw.keyboard.fitBounds(paper.view.bounds);
            draw.animationc = 0;
            draw.password.point = new paper.Point(30, paper.view.size.height*0.97);
            draw.c_stroke_1.removeSegments();
            draw.a_stroke_1.removeSegments();
            draw.a_stroke_2.removeSegments();
            draw.t_stroke_1.removeSegments();
            draw.t_stroke_2.removeSegments();
            draw.password.content = "Password: ";

        }
        paper.view.onFrame = function (){
            switch(draw.slide){
                case 0:
                case 4:
                    for (var i=0; i<draw.randomtext.children.length; i++){
                        if (draw.randomtext.children[i].point.x < -100){
                            draw.randomtext.children[i].point = new paper.Point(paper.view.size.width, Math.floor(Math.random() * paper.view.size.height));
                        } else if (draw.randomtext.children[i].point.x > paper.view.size.width){
                            draw.randomtext.children[i].point = new paper.Point(-100, Math.floor(Math.random() * paper.view.size.height));
                        }
                        draw.randomtext.children[i].point.x += ((i % 2 == 1) ? 1 : -1);
                    }
                    break;
                case 1:
                    if (draw.animationc % 5 == 0){
                        var pointi = draw.animationc / 5;
                        var p = new paper.Point(animation_points[pointi]["x"]*paper.view.size.width, animation_points[pointi]["y"]*paper.view.size.height);
                        if (pointi >= 287){
                            draw.animationc = -1;
                            draw.c_stroke_1.removeSegments();
                            draw.a_stroke_1.removeSegments();
                            draw.a_stroke_2.removeSegments();
                            draw.t_stroke_1.removeSegments();
                            draw.t_stroke_2.removeSegments();
                            draw.password.content = "Password: ";
                        }else if (pointi >= 218){
                            draw.t_stroke_2.add(p);
                        }else if (pointi >= 178){
                            draw.t_stroke_1.add(p);
                        } else if (pointi >= 151) {
                            draw.a_stroke_2.add(p);
                        } else if (pointi >= 89) {
                            draw.a_stroke_1.add(p);
                        } else if (pointi >= 0) {
                            draw.c_stroke_1.add(p);
                        }
                    }
                    for (i in animation_letters){
                        if (i == pointi) draw.password.content += animation_letters[i];
                    }
                    break;
            }
            
            draw.animationc++;
        }
        paper.view.onMouseDown = function (event){
            switch(draw.slide){
                case 2:
                    draw.userdrawings.addChild(new paper.Path(event.point));
                    draw.userdrawings.lastChild.strokeColor = "red";
                    draw.userdrawings.lastChild.strokeWidth = 5;
                    break;
            }
        }
        paper.view.onMouseDrag = function (event){
            switch(draw.slide){
                case 2:
                    draw.userdrawings.lastChild.add(event.point);
                    break;
            }
        }

        document.getElementById("buttonClear").onclick = function(){
            draw.userdrawings.removeChildren();
        }

        var password = document.getElementById("password");
        password.addEventListener('input', function(){
            var score = zxcvbn(password.value);
            var text = document.getElementById("pStrength");
            document.getElementById("meterStrength").value = score.score;
            if (password.value !== "") {
                text.innerHTML = "Strength: " + {0: "Extremely Weak", 1: "Very Weak", 2: "Weak", 3: "Strong", 4: "Very Strong"}[score.score]; 
              } else {
                text.innerHTML = "";
              }
        });


        draw.init = true;
    }

    draw.c_stroke_1.removeSegments();
    draw.a_stroke_1.removeSegments();
    draw.a_stroke_2.removeSegments();
    draw.t_stroke_1.removeSegments();
    draw.t_stroke_2.removeSegments();
    draw.password.content = "Password: ";

    switch(slide){
        case 0:
        case 4:
            paper.project.layers[0].activate();
            paper.project.layers[0].visible = true;
            paper.project.layers[1].visible = false;
            paper.project.layers[2].visible = false;
            break;
        case 1:
            paper.project.layers[1].activate();
            paper.project.layers[0].visible = false;
            paper.project.layers[1].visible = true;
            paper.project.layers[2].visible = false;
            break;
        case 2:
        case 3:
            paper.project.layers[2].activate();
            paper.project.layers[0].visible = false;
            paper.project.layers[1].visible = false;
            paper.project.layers[2].visible = true;
            break;
    }
    draw.slide = slide;
}

function main(){
    currentSlide = 0;
    document.getElementById("buttonNext").onclick = function (){
        currentSlide++;
        changeSlide(currentSlide);
    }
    document.getElementById("buttonBack").onclick = function (){
        currentSlide--;
        changeSlide(currentSlide);
    }
    changeSlide(0);
}
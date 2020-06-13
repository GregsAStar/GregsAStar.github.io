
slides = [
    [
        "What is Alphapwd?",
        "Sure, making your password \"password\" is very tempting, but as you might know, using a simple dictionary word or name puts your accounts at risk. But, you might ask, who is going to remember a password like \"$#W5heU%o28l\"?! Alphapwd is a password creation technique that makes passwords both easy to remember and secure. Click next to find out how it works!"
    ],
    [
        "Placeholder Heading",
        "Placeholder body. Slide 2"
    ],
    [
        "Placeholder Heading",
        "Placeholder body. Slide 3"
    ]
]

function changeSlide(slide){
    document.getElementById("slideTitle").innerHTML = slides[slide][0];
    document.getElementById("slideText").innerHTML = slides[slide][1];
    buttonBack = document.getElementById("buttonBack");
    buttonNext = document.getElementById("buttonNext");
    
    buttonBack.disabled = (slide == 0);
    buttonNext.disabled = (slide == slides.length - 1);

    draw(slide);
}

function draw(slide){
    draw.slide = slide;
    draw.animationc = 0;
    if(typeof draw.init == 'undefined'){
        draw.canvas = document.getElementById("interactive");
        paper.setup(draw.canvas);
        console.log(paper.view.size);

        /* LAYER 0 */
        draw.testtext = new paper.PointText(100,100);
        draw.testtext.fillColor = "white";
        draw.testtext.content = "Cool animation coming soon :) ...probably";

        /* LAYER 1 */
        new paper.Layer();
        draw.keyboard = new paper.Raster("img_keyboard")
        draw.keyboard.position = paper.view.center;
        draw.keyboard.fitBounds(paper.view.bounds);

        draw.coords = new paper.PointText(100, 100);
        draw.coords.fillColor = "red";
        draw.coords.content = "Coords";

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

        }
        paper.view.onMouseDrag = function (event){
            
        }
        paper.view.onMouseMove = function (event){
            draw.coords.content = "" + event.point;
        }

        draw.init = true;
    }

    draw.c_stroke_1.removeSegments();
    draw.a_stroke_1.removeSegments();
    draw.a_stroke_2.removeSegments();
    draw.t_stroke_1.removeSegments();
    draw.t_stroke_2.removeSegments();
    draw.password.content = "Password: ";

    for(var i=0; i < slides.length; i++){
        if (slide == i)
            paper.project.layers[i].visible = true;
        else
            paper.project.layers[i].visible = false;
    }
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
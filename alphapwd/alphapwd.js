
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
    if(typeof draw.init == 'undefined'){
        draw.canvas = document.getElementById("interactive");
        paper.setup(draw.canvas);
        draw.keyboard = new paper.Raster("img_keyboard")
        draw.keyboard.position = paper.view.center;
        draw.keyboard.fitBounds(paper.view.bounds);
        paper.view.onResize = function (event){
            raster0.position = paper.view.center;
            raster0.fitBounds(paper.view.bounds)
        }
        draw.init = true;
    }

    switch(slide){
        case 0:
            draw.keyboard.visible = false;
            break;
        default:
            draw.keyboard.visible = true;
    }

    paper.view.draw();
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




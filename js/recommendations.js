// enter user profile
function onClick(element){

    // HIDE
        // text
    var text = document.getElementsByClassName("recs-text");
    for (var i = 0; i < text.length; i++){
        text[i].style.display = "none";
    }

        // icons
    var icons = document.getElementsByClassName("icon-group");
    icons[0].style.display = "none";


    //SHOW
        // switch button
    document.getElementById('switch').style.display = 'block';

        // recommendations
    var elements = document.getElementsByClassName(element.id);
    for (var i = 0; i < elements.length; i++){
        elements[i].style.display = "block";
    }

        // breaks
    var breaks = document.getElementsByClassName('break');
    for (var i = 0; i < breaks.length; i++){
        breaks[i].style.display = "block";
    }

}

// switch user profile
function switchUser() {

    // SHOW
        // text
    var text = document.getElementsByClassName("recs-text");
    for (var i = 0; i < text.length; i++){
        text[i].style.display = "block";
    }

        // icons
    var icons = document.getElementsByClassName("icon-group");
    icons[0].style.display = "flex";


    // HIDE
        // switch button
    document.getElementById('switch').style.display = 'none';

        // recommendations
    var recs = document.getElementsByClassName('recs');
    for (var i = 0; i < recs.length; i++){
        recs[i].style.display = "none";
    }

        // top-picks headers
    var header = document.getElementsByClassName('top-picks');
    for (var i = 0; i < header.length; i++){
        header[i].style.display = "none";
    }

        // breaks
    var breaks = document.getElementsByClassName('break');
    for (var i = 0; i < breaks.length; i++) {
        breaks[i].style.display = "none";
    }


}



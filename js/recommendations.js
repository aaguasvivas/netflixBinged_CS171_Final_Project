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

// link to netflix
function goToNetflix(element){

    var classNames = element.className;
    var classArray = new Array();

    // get class name of selected element
    classNames = classNames.split(" ");

    for(var i =0; i < classNames.length; i++){
        classArray.push(classNames[i]);
        if(i != classNames.length-1){
            classArray.push(" ");
        }
    }

    if (classArray[4] == "gossip-girl"){
        window.open("https://www.netflix.com/title/70143811");
    }

    else if (classArray[4] == "schitts-creek"){
        window.open("https://www.netflix.com/title/80036165");
    }

    else if (classArray[4] == "new-girl"){
        window.open("https://www.netflix.com/title/70196145");
    }

    else if (classArray[4] == "dynasty") {
        window.open("https://www.netflix.com/title/80179394");
    }

    else if (classArray[4] == "you") {
        window.open("https://www.netflix.com/title/80211991");
    }

    else if (classArray[4] == "jane") {
        window.open("https://www.netflix.com/title/80027158");
    }

    else if (classArray[4] == "social-network"){
        window.open("https://www.netflix.com/title/70132721");
    }

    else if (classArray[4] == "bling-ring"){
        window.open("https://www.netflix.com/title/70271454");
    }

    else if (classArray[4] == "lady-bird"){
        window.open("https://www.netflix.com/title/80205227");
    }

    else if (classArray[4] == "valentines"){
        window.open("https://www.netflix.com/title/70124804");
    }

    else if (classArray[4] == "to-all-the-boys"){
        window.open("https://www.netflix.com/title/80203147");
    }

    else if (classArray[4] == "murder-mystery"){
        window.open("https://www.netflix.com/title/80242619");
    }

    else if (classArray[4] == "social-dilemma"){
        window.open("https://www.netflix.com/title/81254224");
    }

    else if (classArray[4] == "tvd"){
        window.open("https://www.netflix.com/title/70143860");
    }

    else if (classArray[4] == "rebecca"){
        window.open("https://www.netflix.com/title/81002196");
    }

    else if (classArray[4] == "waiting-for-superman"){
        window.open("https://www.netflix.com/title/70129364");
    }

    else if (classArray[4] == "miss-americana"){
        window.open("https://www.netflix.com/title/81028336");
    }

    else if (classArray[4] == "the-boy"){
        window.open("https://www.netflix.com/title/80200047");
    }

    else if (classArray[4] == "good-place"){
        window.open("https://www.netflix.com/title/80113701");
    }

    else if (classArray[4] == "sherlock"){
        window.open("https://www.netflix.com/title/70202589");
    }

    else if (classArray[4] == "imposters"){
        window.open("https://www.netflix.com/title/80161628");
    }

    else if (classArray[4] == "okay"){
        window.open("https://www.netflix.com/lu-en/title/81243992");
    }

    else if (classArray[4] == "avatar"){
        window.open("https://www.netflix.com/title/70142405");
    }

    else if (classArray[4] == "sex-ed"){
        window.open("https://www.netflix.com/title/80197526");
    }

    else if (classArray[4] == "old-guard"){
        window.open("https://www.netflix.com/title/81038963");
    }

    else if (classArray[4] == "knock-down"){
        window.open("https://www.netflix.com/title/81080637");
    }

    else if (classArray[4] == "enola-holmes"){
        window.open("https://www.netflix.com/title/81277950");
    }

    else if (classArray[4] == "marriage-story"){
        window.open("https://www.netflix.com/title/80223779");
    }

    else if (classArray[4] == "guernsey"){
        window.open("https://www.netflix.com/title/80223371");
    }

    else if (classArray[4] == "selena"){
        window.open("https://www.netflix.com/title/81022733");
    }

    else if (classArray[4] == "crown"){
        window.open("https://www.netflix.com/title/80025678");
    }

    else if (classArray[4] == "baking"){
        window.open("https://www.netflix.com/title/80063224");
    }

    else if (classArray[4] == "dear-white-people"){
        window.open("https://www.netflix.com/title/80095698");
    }

    else if (classArray[4] == "legend-of-korra"){
        window.open("https://www.netflix.com/title/80027563");
    }

    else if (classArray[4] == "umbrella-academy"){
        window.open("https://www.netflix.com/title/80186863")
    }

    else if (classArray[4] == "when-they-see"){
        window.open("https://www.netflix.com/title/80200549")
    }

    else if (classArray[4] == "bojack"){
        window.open("https://www.netflix.com/title/70300800")
    }

    else if (classArray[4] == "money-heist"){
        window.open("https://www.netflix.com/title/80192098")
    }

    else if (classArray[4] == "spiderman"){
        window.open("https://www.netflix.com/title/81002747")
    }

    else if (classArray[4] == "13th"){
        window.open("https://www.netflix.com/title/80091741")
    }

    else if (classArray[4] == "roma"){
        window.open("https://www.netflix.com/title/80240715")
    }

    else if (classArray[4] == "bee"){
        window.open("https://www.netflix.com/title/70060010")
    }

    else if (classArray[4] == "bandersnatch"){
        window.open("https://www.netflix.com/title/80988062")
    }

    else if (classArray[4] == "bird-box"){
        window.open("https://www.netflix.com/title/80196789")
    }

    else if (classArray[4] == "big-mouth"){
        window.open("https://www.netflix.com/title/80117038")
    }

    else if (classArray[4] == "hunter-x-hunter"){
        window.open("https://www.netflix.com/title/70300472")
    }

    else if (classArray[4] == "sabrina"){
        window.open("https://www.netflix.com/title/80223989")
    }

}


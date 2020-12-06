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

    console.log("hi")
    console.log(element.className)

    if (element.className == "gossip-girl"){
        window.open("https://www.netflix.com/title/70143811");
    }

    else if (element.className == "schitts-creek"){
        window.open("https://www.netflix.com/title/80036165");
    }

    else if (element.className == "new-girl"){
        window.open("https://www.netflix.com/title/70196145");
    }

    else if (element.className == "dynasty") {
        window.open("https://www.netflix.com/title/80179394");
    }

    else if (element.className == "you") {
        window.open("https://www.netflix.com/title/80211991");
    }

    else if (element.className == "jane") {
        window.open("https://www.netflix.com/title/80027158");
    }

    else if (element.className == "social-network"){
        window.open("https://www.netflix.com/title/70132721");
    }

    else if (element.className == "bling-ring"){
        window.open("https://www.netflix.com/title/70271454");
    }

    else if (element.className == "lady-bird"){
        window.open("https://www.netflix.com/title/80205227");
    }

    else if (element.className == "valentines"){
        window.open("https://www.netflix.com/title/70124804");
    }

    else if (element.className == "to-all-the-boys"){
        window.open("https://www.netflix.com/title/80203147");
    }

    else if (element.className == "murder-mystery"){
        window.open("https://www.netflix.com/title/80242619");
    }

    else if (element.className == "social-dilemma"){
        window.open("https://www.netflix.com/title/81254224");
    }

    else if (element.className == "tvd"){
        window.open("https://www.netflix.com/title/70143860");
    }

    else if (element.className == "rebecca"){
        window.open("https://www.netflix.com/title/81002196");
    }

    else if (element.className == "waiting-for-superman"){
        window.open("https://www.netflix.com/title/70129364");
    }

    else if (element.className == "miss-americana"){
        window.open("https://www.netflix.com/title/81028336");
    }

    else if (element.className == "the-boy"){
        window.open("https://www.netflix.com/title/80200047");
    }

    else if (element.className == "good-place"){
        window.open("https://www.netflix.com/title/80113701");
    }

    else if (element.className == "sherlock"){
        window.open("https://www.netflix.com/title/70202589");
    }

    else if (element.className == "imposters"){
        window.open("https://www.netflix.com/title/80161628");
    }

    else if (element.className == "okay"){
        window.open("https://www.netflix.com/lu-en/title/81243992");
    }

    else if (element.className == "avatar"){
        window.open("https://www.netflix.com/title/70142405");
    }

    else if (element.className == "sex-ed"){
        window.open("https://www.netflix.com/title/80197526");
    }

    else if (element.className == "old-guard"){
        window.open("https://www.netflix.com/title/81038963");
    }

    else if (element.className == "knock-down"){
        window.open("https://www.netflix.com/title/81080637");
    }

    else if (element.className == "enola-holmes"){
        window.open("https://www.netflix.com/title/81277950");
    }

    else if (element.className == "marriage-story"){
        window.open("https://www.netflix.com/title/80223779");
    }

    else if (element.className == "guernsey"){
        window.open("https://www.netflix.com/title/80223371");
    }

    else if (element.className == "selena"){
        window.open("https://www.netflix.com/title/81022733");
    }

    else if (element.className == "crown"){
        window.open("https://www.netflix.com/title/80025678");
    }

    else if (element.className == "baking"){
        window.open("https://www.netflix.com/title/80063224");
    }

    else if (element.className == "dear-white-people"){
        window.open("https://www.netflix.com/title/80095698");
    }

    else if (element.className == "legend-of-korra"){
        window.open("https://www.netflix.com/title/80027563");
    }

    else if (element.className == "umbrella-academy"){
        window.open("https://www.netflix.com/title/80186863")
    }

    else if (element.className == "when-they-see"){
        window.open("https://www.netflix.com/title/80200549")
    }

    else if (element.className == "bojack"){
        window.open("https://www.netflix.com/title/70300800")
    }

    else if (element.className == "money-heist"){
        window.open("https://www.netflix.com/title/80192098")
    }

    else if (element.className == "spiderman"){
        window.open("https://www.netflix.com/title/81002747")
    }

    else if (element.className == "13th"){
        window.open("https://www.netflix.com/title/80091741")
    }

    else if (element.className == "roma"){
        window.open("https://www.netflix.com/title/80240715")
    }

    else if (element.className == "bee"){
        window.open("https://www.netflix.com/title/70060010")
    }

    else if (element.className == "bandersnatch"){
        window.open("https://www.netflix.com/title/80988062")
    }

    else if (element.className == "bird-box"){
        window.open("https://www.netflix.com/title/80196789")
    }

    else if (element.className == "big-mouth"){
        window.open("https://www.netflix.com/title/80117038")
    }

    else if (element.className == "hunter-x-hunter"){
        window.open("https://www.netflix.com/title/70300472")
    }

    else if (element.className == "sabrina"){
        window.open("https://www.netflix.com/title/80223989")
    }

}


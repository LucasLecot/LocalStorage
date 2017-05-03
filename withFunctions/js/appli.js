var inputs = document.querySelectorAll('.input');
var btn = document.querySelector('button');
var list = JSON.parse(localStorage.getItem('liste')) || [];

btn.addEventListener('click', function() {
    var obj = {
        type: inputs[0].value,
        titre: inputs[1].value,
        episode_max: inputs[2].value,
        episode_vu: inputs[3].value
    };
    list.push(obj);
    localStorage.setItem('liste', JSON.stringify(list));
});

for (var i = 0; i < list.length; i++) {
    var divColumns = document.createElement("div");
    divColumns.classList = "columns";

    createDiv(i, divColumns);
    // createTab(i);

    document.querySelector(".list").appendChild(divColumns);
}

function createDiv(numObj, col) {

    for (var j = 0; j < 4; j++) {
        var divColumn = document.createElement("div");
        divColumn.classList = "column";

        switch (j) {
            case 0:
                var text = document.createTextNode(list[numObj].type);
                divColumn.appendChild(text);
                break;
            case 1:
                var text = document.createTextNode(list[numObj].titre);
                divColumn.appendChild(text);
                break;
            case 2:
                spanPlusMoins(numObj, divColumn);
                break;
            case 3:
                var text = document.createTextNode(list[numObj].episode_max);
                divColumn.appendChild(text);
                break;
        }
        col.appendChild(divColumn);
    }
}

// function createTab(numObj) {
//     var count = 0;
//
//     for (var i = 0; i < list.length; i++) {
//         if (list[numObj].type == list[i].type) {
//             console.log(list[numObj].type);
//             console.log(list[i].type);
//         }
// //           console.log(list[numObj]);
//     }
// //       console.log(list[numObj].type);
// }

function spanPlusMoins(serie, _4col) {
    var text = document.createTextNode(list[serie].episode_vu);
    var span = document.createElement("span");
    span.classList = "current-eps";
    span.appendChild(text);
    _4col.appendChild(span);
    for (var k = 1; k < 3; k++) {
        var createA = document.createElement("a");
        if (k == 1) {
            createA.classList = "plus button";
            var textPlus = document.createTextNode(" + ");
            createA.appendChild(textPlus);
            _4col.appendChild(createA);
            createA.addEventListener('click', function() {
                if (parseInt(list[serie].episode_vu) < parseInt(list[serie].episode_max)) {
                    list[serie].episode_vu = parseInt(list[serie].episode_vu) + 1;
                    list[serie].episode_vu = list[serie].episode_vu.toString();
                    localStorage.setItem('liste', JSON.stringify(list));
                    span.innerHTML = list[serie].episode_vu;
                }
            });
        } else {
            createA.classList = "minus button";
            var textMoins = document.createTextNode(" - ");
            createA.appendChild(textMoins);
            _4col.appendChild(createA);
            createA.addEventListener('click', function() {
                if (parseInt(list[serie].episode_vu ) > 0) {
                    list[serie].episode_vu = parseInt(list[serie].episode_vu) - 1;
                    list[serie].episode_vu = list[serie].episode_vu.toString();
                    localStorage.removeItem('liste');
                    localStorage.setItem('liste', JSON.stringify(list));
                    span.innerHTML = list[serie].episode_vu;
                }
            });
        }
    }
}
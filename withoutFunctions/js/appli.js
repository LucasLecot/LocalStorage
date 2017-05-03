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

for (let i = 0; i < list.length; i++) {
    var divColumns = document.createElement("div");
    divColumns.classList = "columns";

    for (var j = 0; j < 4; j++) {
        var divColumn = document.createElement("div");
        divColumn.classList = "column";

        switch (j) {
            case 0:
                var text = document.createTextNode(list[i].type);
                divColumn.appendChild(text);
                break;
            case 1:
                var text = document.createTextNode(list[i].titre);
                divColumn.appendChild(text);
                break;
            case 2:
                var text = document.createTextNode(list[i].episode_vu);
                var span = document.createElement("span");

                span.classList = "current-eps";
                span.appendChild(text);
                divColumn.appendChild(span);
                for (var k = 1; k < 3; k++) {
                    var createA = document.createElement("a");
                    if (k == 1) {
                        createA.classList = "plus button";
                        var textPlus = document.createTextNode(" + ");
                        createA.appendChild(textPlus);
                        divColumn.appendChild(createA);
                        createA.addEventListener('click', function() {
                            if (parseInt(list[i].episode_vu) < parseInt(list[i].episode_max)) {
                                list[i].episode_vu = parseInt(list[i].episode_vu) + 1;
                                list[i].episode_vu = list[i].episode_vu.toString();
                                localStorage.setItem('liste', JSON.stringify(list));
                                location.reload();
                            }
                        });
                    } else {
                        createA.classList = "minus button";
                        var textMoins = document.createTextNode(" - ");
                        createA.appendChild(textMoins);
                        divColumn.appendChild(createA);
                        createA.addEventListener('click', function() {
                            if (parseInt(list[i].episode_vu ) > 0) {
                                list[i].episode_vu = parseInt(list[i].episode_vu) - 1;
                                list[i].episode_vu = list[i].episode_vu.toString();
                                localStorage.removeItem('liste');
                                localStorage.setItem('liste', JSON.stringify(list));
                                location.reload();
                            }
                        });
                    }
                }
                break;
            case 3:
                var text = document.createTextNode(list[i].episode_max);
                divColumn.appendChild(text);
                break;
        }
        divColumns.appendChild(divColumn);
    }
    document.querySelector(".list").appendChild(divColumns);
}
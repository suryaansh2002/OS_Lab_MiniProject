function validation() {
    var a = document.getElementById('resourceA').value;
    var b = document.getElementById('resourceB').value;
    var c = document.getElementById('resourceC').value;
    if (a == '' || a < 0 || b == '' || b < 0 || c == '' || c < 0) {
        alert("Resource instance value can't be negative or blank");
    }
    for (var i = 1; i <= 5; i++) {
        for (var j = 1; j <= 3; j++) {
            if (document.getElementById('a' + i + j).value < 0 || document.getElementById('a' + i + j).value == '') {
                alert("Allocation matrix elements can't be negative or blank");
            }
            if (document.getElementById('m' + i + j).value < 0 || document.getElementById('m' + i + j).value == '') {
                alert("Max matrix elements can't be negative or blank");
            }
        }
        document.getElementById('calc' + i).value = '';
    }
    document.getElementById('calc0').value = '';
}


function reset() {
    document.getElementsByClassName('seq')[0].style.display='none';
    document.getElementsByClassName('comparison')[0].style.display='none';
    document.getElementsByClassName('comparison')[0].style.paddingTop='10%';
    document.getElementById('resourceA').value = '';
    document.getElementById('resourceB').value = '';
    document.getElementById('resourceC').value = '';
    for (var i = 1; i <= 5; i++) {
        for (var j = 1; j <= 3; j++) {
            document.getElementById('a' + i + j).value = '';
            document.getElementById('m' + i + j).value = '';
            document.getElementById('n' + i + j).value = '';
        }
        document.getElementById('p' + i).value = ''
        document.getElementById('calc' + i).innerHTML = '';
    }
    document.getElementById('av11').value = '';
    document.getElementById('av12').value = '';
    document.getElementById('av13').value = '';
    document.getElementById('calc0').innerHTML = '';
}

function sample() {
    sam = [[0, 1, 0],
    [2, 0, 0],
    [3, 0, 2],
    [2, 1, 1],
    [0, 0, 2]];

    max = [[7, 5, 3],
    [3, 2, 2],
    [9, 0, 2],
    [2, 2, 2],
    [4, 3, 3]];
    for (var i = 1; i <= 5; i++) {
        for (var j = 1; j <= 3; j++) {
            document.getElementById('a' + i + j).value = sam[i - 1][j - 1];
            document.getElementById('m' + i + j).value = max[i - 1][j - 1];
        }
    }
    document.getElementById('resourceA').value = 10;
    document.getElementById('resourceB').value = 5;
    document.getElementById('resourceC').value = 7;
    document.getElementById('calc0').innerHTML = ' Sample Loaded...';
}

function find_avai() {
    document.getElementsByClassName('comparison')[0].style.display='block';
    document.getElementsByClassName('footer')[0].style.marginTop='2%';

    var a = document.getElementById('resourceA').value;
    var b = document.getElementById('resourceB').value;
    var c = document.getElementById('resourceC').value;
    var x = 0;
    var y = 0;
    var z = 0;
    document.getElementById('calc1').innerHTML = 'Calculating the Available Matrix....' + '<br/>' + 'Available[n] = Total no. of instances - (Allocation[0][n] + Allocation[1][n] + Allocation[2][n] + Allocation[3][n] + Allocation[4][n])' + '<br/>';
    document.getElementById('calc1').innerHTML += 'Available[0] = ' + a + ' - (';
    document.getElementById('calc2').innerHTML = 'Available[1] = ' + b + ' - (';
    document.getElementById('calc3').innerHTML = 'Available[2] = ' + c + ' - (';
    for (var i = 1; i <= 5; i++) {
        var x = x + parseInt(document.getElementById('a' + i + '1').value);
        document.getElementById('calc1').innerHTML += parseInt(document.getElementById('a' + i + '1').value); if (i < 5) { document.getElementById('calc1').innerHTML += '+'; } else { document.getElementById('calc1').innerHTML += ') = ' }
        var y = y + parseInt(document.getElementById('a' + i + '2').value);
        document.getElementById('calc2').innerHTML += parseInt(document.getElementById('a' + i + '1').value); if (i < 5) { document.getElementById('calc2').innerHTML += '+'; } else { document.getElementById('calc2').innerHTML += ') = ' }
        var z = z + parseInt(document.getElementById('a' + i + '3').value);
        document.getElementById('calc3').innerHTML += parseInt(document.getElementById('a' + i + '1').value); if (i < 5) { document.getElementById('calc3').innerHTML += '+'; } else { document.getElementById('calc3').innerHTML += ') = ' }
    }
    document.getElementById('av11').value = a - x;
    document.getElementById('calc1').innerHTML += a - x;
    document.getElementById('av12').value = b - y;
    document.getElementById('calc2').innerHTML += b - y;
    document.getElementById('av13').value = c - z;
    document.getElementById('calc3').innerHTML += c - z;
    document.getElementById('calc4').innerHTML = '';
    document.getElementById('calc5').innerHTML = '';
    document.getElementById('calc0').innerHTML = '';
    validation();
}

function find_need() {
    // find_avai();
    document.getElementsByClassName('comparison')[0].style.display='block';
    document.getElementById('calc1').innerHTML = ' Calculating the Need Matrix....' + '<br/>' + 'Need[n][n] = Max[n][n] - Allocation[n][n]' + '<br/>';
    document.getElementById('calc2').innerHTML = '';
    document.getElementById('calc3').innerHTML = '';
    document.getElementById('calc4').innerHTML = '';
    document.getElementById('calc5').innerHTML = '';
    document.getElementById('calc0').innerHTML = '';
    for (var i = 1; i <= 5; i++) {
        for (var j = 1; j <= 3; j++) {
            document.getElementById('n' + i + j).value = parseInt(document.getElementById('m' + i + j).value) - parseInt(document.getElementById('a' + i + j).value);
            document.getElementById('calc' + i).innerHTML += 'Need[' + (i - 1) + ']' + '[' + (j - 1) + ']' + ' = ' + document.getElementById('m' + i + j).value + ' - ' + document.getElementById('a' + i + j).value + ' = ' + document.getElementById('n' + i + j).value + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp';
        }
    }
}


async function find_sequence() {
    // find_avai();
    // find_need();
    document.getElementsByClassName('seq')[0].style.display='block';
    document.getElementsByClassName('comparison')[0].style.display='block';
    document.getElementsByClassName('comparison')[0].style.paddingTop=0;
    for(var i=0;i<=5;i++){
        document.getElementById('calc' + i).innerHTML = '';
    }
    var checker = 0;
    var q = 1;
    var k = 1;
    document.getElementById('calc0').innerHTML = ' Calculating the Final Order....' + '<br/>';
    for (var j = 1; j <= 5; j++) {
        x1 = parseInt(document.getElementById('av11').value);
        x2 = parseInt(document.getElementById('av12').value);
        x3 = parseInt(document.getElementById('av13').value);
        document.getElementById('calc' + j).innerHTML = 'Step' + j + ':&nbsp&nbsp' + 'Available Matrix = ' + x1 + ', ' + x2 + ', ' + x3;
        for (var i = k; i <= 5; i++) {
            var ex1 = parseInt(document.getElementById('a' + i + '1').value);
            var ex2 = parseInt(document.getElementById('a' + i + '2').value);
            var ex3 = parseInt(document.getElementById('a' + i + '3').value);
            if (ex1 != 0 || ex2 != 0 || ex3 != 0) {
                if (x1 >= parseInt(document.getElementById('n' + i + '1').value) && x2 >= parseInt(document.getElementById('n' + i + '2').value) && x3 >= parseInt(document.getElementById('n' + i + '3').value)) {
                    document.getElementById('p' + q).innerHTML = 'P' + i;
                    document.getElementById('calc' + j).innerHTML += '&nbsp&nbsp As Need[' + (i) + '] = ( ' + document.getElementById('n' + i + '1').value + ', ' + document.getElementById('n' + i + '2').value + ', '
                        + document.getElementById('n' + i + '3').value + ' ) < Available = ( ' + x1 + ', ' + x2 + ', ' + x3
                        + ' ) => Process P' + i + ' is selected. <br> New Available Matrix is ( ' + document.getElementById('av11').value + ', ' + document.getElementById('av12').value + ', ' + document.getElementById('av13').value + ' ) + ( ' + document.getElementById('a' + i + '1').value + ', ' + document.getElementById('a' + i + '2').value + ', '
                        + document.getElementById('a' + i + '3').value + ' ) =  ';
                    document.getElementById('av11').value = parseInt(document.getElementById('av11').value) + parseInt(document.getElementById('a' + i + '1').value);
                    document.getElementById('av12').value = parseInt(document.getElementById('av12').value) + parseInt(document.getElementById('a' + i + '2').value);
                    document.getElementById('av13').value = parseInt(document.getElementById('av13').value) + parseInt(document.getElementById('a' + i + '3').value);
                    document.getElementById('calc' + j).innerHTML += '( ' + document.getElementById('av11').value + ', ' + document.getElementById('av12').value + ', ' + document.getElementById('av13').value + ' ) <br>';
                    document.getElementById('a' + i + '1').value = '0';
                    document.getElementById('a' + i + '2').value = '0';
                    document.getElementById('a' + i + '3').value = '0';
                    k = i + 1;
                    if (k == 6) {
                        k = 1;
                    }
                    q = q + 1;
                    checker = checker + 1;
                    await new Promise(r => setTimeout(r, 2000));
                    break;
                }
                else {
                    dp = i;
                }
            }
        }
    }
    if (checker == 0) {
        alert("Deadlock!!");
        reset();
    }
}
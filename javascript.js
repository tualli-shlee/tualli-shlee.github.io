var table = document.querySelector('#table');
var hiddendata = [];
var showdata = [];
var finishflag;
var opendcell;
var result = document.querySelector('#result');

var button = document.querySelector('#start');
var boardheight;
var boardwidth;
var minenumber;

button.addEventListener('click',function(){
    table.innerHTML=''; //reset the variables
    boardheight = parseInt(document.querySelector('#height').value);
    boardwidth = parseInt(document.querySelector('#width').value);
    minenumber = parseInt(document.querySelector('#mine').value);
    hiddendata = [];
    showdata = [];
    result.textContent = '';
    finishflag = false;
    opendcell = 0;

    var numberset = Array(boardheight * boardwidth).fill().map(function(element, index){//make the position of mine
        return index;
    })
    var shuffle = []; 
    while(numberset.length>boardheight*boardwidth - minenumber){
        var cut = numberset.splice(Math.floor(Math.random() * numberset.length),1)[0];
        shuffle.push(cut);
    }

    for(var i = 0 ; i<boardheight; i++){
        var tr = document.createElement('tr');
        var showcolumn =[];
        var hiddencolumn = [];
        for(var j = 0; j<boardwidth; j++){
            showcolumn.push('closed');
            hiddencolumn.push(0);
            var td = document.createElement('td');
            (function(cell, i, j){
                cell.addEventListener('click',function(e){
                    if(finishflag){
                        return;
                    }
                    if(showdata[i][j] === 'closed'){
                        if(hiddendata[i][j] !== 'mine'){
                            opendcell++;
                            if(opendcell === boardheight*boardwidth - minenumber){
                                finishflag = true;
                                result.textContent = 'SUCCESS';
                            }
                            cell.textContent = hiddendata[i][j] || '';
                            showdata[i][j] = 'opened';
                            cell.classList.add('opened');
                            if(hiddendata[i][j] === 0){
                                for(var x = -1; x<= 1; x++){
                                    if(hiddendata[i + x]){
                                        for(var y = -1; y<=1; y++){
                                            if(showdata[i+x][j+y] === 'closed'){
                                                cell.parentNode.parentNode.children[i+x].children[j+y].click();
                                            }
                                        }
                                    }
                                }
                            }
                        }else{
                            finishflag = true;
                            cell.classList.add('boom');
                            result.textContent = 'FAIL';
                        }
                    }
                });
                cell.addEventListener('contextmenu',function(){
                    if(finishflag){
                        return;
                    }
                    if(showdata[i][j] === 'closed'){
                        showdata[i][j] = 'flaged'
                        cell.classList.add('flaged');
                    }
                    else if(showdata[i][j] === 'flaged'){
                        showdata[i][j] = 'qmark'
                        cell.textContent = '?';
                        cell.classList.remove('flaged');
                    }
                    else if(showdata[i][j] === 'qmark'){
                        showdata[i][j] = 'closed'
                        cell.textContent = '';
                    }
                });
            })(td, i , j);
            tr.appendChild(td);
        }
        showdata.push(showcolumn);
        hiddendata.push(hiddencolumn);
        table.appendChild(tr);
    }
    for(var k = 0; k<shuffle.length;k++){ //mine setting and hidden data number setting
        var row = Math.floor(shuffle[k]/boardwidth);
        var column = shuffle[k]%boardwidth;
        hiddendata[row][column] = 'mine';
        for(var i = -1; i<= 1; i++){
            if(hiddendata[row + i]){
                for(var j = -1; j<=1; j++){
                    if(Number.isInteger(hiddendata[row + i][column + j])){
                        hiddendata[row + i][column + j]++;
                    }
                }
            }
        }
    }
    console.log(showdata, hiddendata);
});

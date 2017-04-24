// JavaScript Document

//js禁止右键
function stop() {
    return false;
}
document.oncontextmenu = stop;


var event = new Event('allBoom');
var box = document.getElementById('box'),   
    arr = newMap(),
    temp = newMap(),   //temp为1则表示通过右键使旗子显示 
    num;
function newMap(r, c) {
    //当做二维数组并赋初值
	num=100;
    r = r || 10;   //10行
    c = c || 10;   //10列
    var arr = [];
    for (var i = 0; i < r; i++) {
        var row = [];
        for (var j = 0; j < c; j++) {
            row[j] = -1;
        }
        arr.push(row);
    }

    var count = 10;
    while (count > 0) {
        //放10个雷1为雷
        var x = Math.floor(Math.random() * 10);
        var y = Math.floor(Math.random() * 10);
        if (arr[x][y] != 9) {
            arr[x][y] = 9;
            count--;
        }
    }
    return arr;
}

print();
function print() {//打印
    for (var i = 0; i < arr.length; i++) {
        console.log(arr[i].join("\t"));
        console.log("");
    }
}



function drawMap() {
    var html = "";
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr[i].length; j++) {
            if (temp[i][j] == 1) {
                html += `<span onmousedown='clickBlock(event,${i},${j},this)'><img src="timg.jpg"   width="15" height="15"/></span>`;
            } else if (arr[i][j] == -1 || arr[i][j] == 9) {
                html += `<span onmousedown='clickBlock(event,${i},${j},this)'></span>`;
            } else if (arr[i][j] == 0) {
                html += "<span class='safe'></span>";
            } else {
                html += `<span class='safe'>${arr[i][j]}</span>`;
            }
        }
        box.innerHTML = html;
    }
}
drawMap();
function clickBlock(event, i, j, that) {
    //点击
    if (event.button == 2) {
        //鼠标右键
        if (!that.innerHTML) {
            that.innerHTML = '<img src="timg.jpg" width="15" height="15"/>';
            temp[i][j] = 1;
        }
        else {
            that.innerHTML = '';
            temp[i][j] = -1;
        }
    } else if (temp[i][j] == 1) {
        //如果旗子显示 左键无法操作 	 
    } else {
        if (arr[i][j] === 9) {
            //点到雷
            that.className = 'boom';
            //每个span都添加一个监听事件 如果是雷就变为红色
            var event = new Event('isBoom');
            var obj = document.getElementsByTagName('span');
            for (var k = 0; k < obj.length; k++) {
                obj[k].addEventListener('isBoom', function (target) {
                    var i = Math.floor(k / 10);
                    var j = Math.floor(k % 10);
                    if (arr[i][j] == 9) {
                        this.className = 'boom';
                    }
                }, false);
                obj[k].dispatchEvent(event);
            }

            setTimeout(function () {
                alert('点到雷了，游戏结束！');
                arr = newMap();
                temp = newMap();
                drawMap();
            }, 0);
        }
        else {
            //没点到雷
              countBoom(i, j);
              drawMap();
		  }
            }
        }

    



function countBoom(i, j) {
    //计算以自己为中心 3*3的范围内雷的个数
    var count = 0;
    for (var x = i - 1; x <= i + 1; x++) {
        for (var y = j - 1; y <= j + 1; y++) {
            if (x < 0 || y < 0)
                continue;
            if (arr[x] && arr[x][y] && arr[x][y] === 9) {
                count++;
            }
        }
    }
    arr[i][j] = count;
	num--;
	console.log(num);
    if (count === 0) {
        for (var x = i - 1; x <= i + 1; x++) {
            for (var y = j - 1; y <= j + 1; y++) {
                if (arr[x] && arr[x][y] == -1) {
                    countBoom(x, y);
                }
            }
        }
    }
		if(num==10) {
		setTimeout(function() {
		  alert('恭喜你，挑战成功！');
		   arr = newMap();
           temp = newMap();
		   drawMap();
		});
	}
}



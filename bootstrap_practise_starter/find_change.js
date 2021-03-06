function baseGet() {
    let baseInfo=
        [
            ["学号","姓名", "数学", "语文","英语","编程"]
        ];
    let localStore=localStorage;
    let temp=[];
    for(let i=0;i<localStore.length;i++){
        temp[i]=(localStore.key(i)+','+localStore[localStore.key(i)]).split(',');
        baseInfo.push(temp[i]);
    }
    return baseInfo;
}
let baseInfo=baseGet();
function findJudge(inputInfo,baseInfo) {
    baseInfo=baseInfo.reduce(function(accumulator,currentValue){
        accumulator.push(currentValue[0]);
        return accumulator;
    },[]);
    if(inputInfo.split(',').length>1){
        inputInfo=inputInfo.split(',');
        for (let input_info of inputInfo) {
            if (baseInfo.indexOf(input_info) !== -1) {
                return true;
            }
        }return false;
    }else{
        return  baseInfo.indexOf(inputInfo) !== -1?true:false;
    }
}
function SecondBehavior(inputInfo,baseInfo) {
    let needInfo;
    if (inputInfo.split(',').length > 1) {
        inputInfo=inputInfo.split(',');
        needInfo = baseInfo.reduce(function (accumulator, currentValue,currentIndex) {
            for (let input_info of inputInfo) {
                if (input_info === currentValue[0]||currentIndex===0) {
                    accumulator.push(currentValue);
                    break;
                }
            }
            return accumulator;
        }, []);

    }else{
        needInfo=baseInfo.filter(function (number,index) {
            return number[0]===inputInfo||index===0;
        });
    }
    return needInfo;
}
function start() {
    let needInfo;
    let getId=document.getElementById("Id").value;
    let findJudges=findJudge(getId,baseInfo);
    if(findJudges===false){
        alert('请按正确的格式输入要打印的学生的学号（格式： 学号, 学号,...）');
        return null;
    }else{
        needInfo=SecondBehavior(getId,baseInfo);
        return needInfo;
    }

}
function onSubmit() {
    let base0=document.getElementById("page_table");
    let base1=document.getElementById("tbody");
    $('#tbody').empty();
    $('#page').remove();
    let needInfo=start();
    let end=print(needInfo);
    if(needInfo!==null){
        let newTr=[];
        let innerPara;
        let node;
        needInfo.forEach(function (value,tag) {
            newTr[tag]=document.createElement('tr');
            value.forEach(function (element) {
                innerPara=document.createElement('td');
                node =document.createTextNode(element);
                innerPara.appendChild(node);
                newTr[tag].appendChild(innerPara);
                base1.appendChild(newTr[tag]);
            });
            if(tag!==0){
                let endTr1=document.createElement("td");
                let button1=document.createElement("button");
                let Text=document.createTextNode('修改');
                button1.appendChild(Text);
                endTr1.appendChild(button1);
                button1.setAttribute('class','btn btn-info btn-xs');
                button1.onclick=function () {
                    window.location.href = "changeScores.html";
                    localStorage.setItem('stuId',value[0]);
                    localStorage.setItem('stuName',value[1]);
                };
                let button2=document.createElement("button");
                let Text2=document.createTextNode('删除');
                button2.setAttribute('class','btn btn-info btn-xs');
                button2.appendChild(Text2);
                endTr1.appendChild(button2);
                newTr[tag].appendChild(endTr1);
                button2.onclick=function () {
                    let result=confirm(`确定删除”${value[1]+value[0]}“的成绩？`);
                    if(result===true){
                        base1.removeChild(newTr[tag]);
                        localStorage.removeItem(value[0]);
                        baseInfo=baseGet();
                        let needInfo=start();
                        end=print(needInfo);
                        document.getElementById('page').innerHTML=end;
                    }
                };
            }
        });
        let endNode=document.createElement("p");
        endNode.setAttribute('id','page');
        let endText=document.createTextNode(end);
        endNode.appendChild(endText);
        base0.appendChild(endNode);
    }

}

$(document).ready(function() {
    let numbers= ""; //String型数式
    let resultNum = 0;//計算結果
    let isCac = false;//計算結果を出力しているか
    let isOpe = false;//演算子を入力しているか
    let isDec = false;//数字に対して、.が入力されているか
    $("input").click(function() {
        if(this.className === "number") {
            //数字が入力された場合

            if(numbers =="" && this.value == "0"||numbers =="" && this.value == "00"){
                //最初に0 00 = を入力された場合→0入力
                numbers +="0";   
            }else if(isCac == true){
                //計算結果後、数字を入力された場合→リセット
                numbers = this.value;   
                isCac = false;
                isDec = false;
            }else if(isOpe == true && this.value == "00"){
                //演算子を入力された後に ００入力→無効
                numbers += "";
            }else if(isCac == true && this.value == "0"||isCac == true && this.value == "00"){
                //計算結果後、0, 00入力→0入力
                numbers += "0";
            }else if(numbers == "0" && this.value == "00"){
                //numbers = 0の際に00が入力された場合→無効
                numbers += "";
            }else if(numbers == "0"){
                //numbers = ０の時に数字を入力した場合→上書きして挿入
                numbers = numbers.slice(1);
                numbers += this.value;
            }
            else{
                //数字を入力した際の処理
                numbers += this.value;
            }
            $("#display").text(numbers);
        }else if(this.className === "operator") {
            //演算子が入力された場合

            if(numbers == "" && this.value == "+"||numbers == "" && this.value == "*"||numbers == "" && this.value == "/"){
                //最初に＝,-以外の演算子を入力された場合→０ 演算子の並びにする
                numbers += "0";
                numbers += this.value;    
                isOpe = true;   
                isDec = false;
            }else if(isCac == true){
                //計算結果後、演算子を入力された場合→リセットしない
                numbers += this.value;  
                isCac = false;
                isOpe = true;   
                isDec = false;
            }else if(isOpe == true){
                //直前に入力されたものが演算子の場合→直前の演算子を削除して入力内容を反映
                numbers = numbers.slice(0, -1);
                numbers += this.value;
                isOpe = true;
                isDec = false;
            }else if(numbers.slice(-1) == "."){
                //. を入力された直後に演算子を入力できないようにする
                numbers += "";
            }
            else{
                //演算子を入力された際の処理
                numbers += this.value;
                isOpe = true;   
                isDec = false;
            }
            $("#display").text(numbers);
        }else if(this.className == "decimal"){
            //.が入力された場合

            if(numbers== ""){
                //最初に[.]を入力された場合→０. と入力される
                numbers = "0.";
                isDec = true;
            }else if(isDec == true){
                //小数の値に再度 .を入力→無効
                numbers += "";
            }else if(numbers.slice(-1)=="+"||numbers.slice(-1)=="-"||numbers.slice(-1)=="*"||numbers.slice(-1)=="/"){
               //演算子を入力された直後に .入力→0.に変更
                numbers += "0.";
            }else{
                //.を入力された際の処理
                numbers += this.value;
                isDec = true;
            }
            $("#display").text(numbers);
        }else if(this.className == "equal"){
            //＝が入力された場合
            if(numbers ==""){
                //最初に0 00 = を入力された場合→入力無効
                numbers +="";
            }else if(isCac == true){
                //計算結果後、＝を入力された場合→入力無効
                numbers += ""
            }else{
                //計算結果を出力
                resultNum = eval(numbers);
                //計算結果が小数の場合、小数点4位以下を四捨五入
                if(Number.isInteger(resultNum) != true){
                    Math.round(resultNum*10000)/10000;
                }
                numbers = String(resultNum);
                isCac = true;
                isOpe = false;

                //計算結果に.が含まれていない場合isDec = falseにする
                if(numbers.indexOf(".") == -1){
                    isDec = false;
                }
            }
            $("#display").text(numbers);
        }else if(this.className == "clear"){
            //ACを入力された場合 表示と各変数をリセットする
            numbers = "";
            $("#display").text(0);
            isCac = false;
            isOpe = false;
            isDec = false;
        }
        
    });

});

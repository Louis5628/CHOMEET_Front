// dom元素
var elementInputNumber = document.querySelectorAll('.qty-input');  //每個商品的數量
var elementPlusButton = document.querySelectorAll('.plus-btn');    //每個商品的加號
var elementMinusButton = document.querySelectorAll('.minus-btn');  //每個商品的減號
var elementSubtotal = document.querySelectorAll('.js-subtotal');   //每個商品的總價格
var elementPrice = document.querySelectorAll('.js-price');         //每個商品的單價
var elementCartQty = document.querySelector('.js-cart-qty');       //總數量
var elementShipping = document.querySelector('.js-shipping');      //運費
var elementTotal = document.querySelector('.js-total');            //總價格


var iProductPrice = []; //每個商品的單價 轉成int 運算用
var iLength = 0         //商品樣數

//初值設定
elementPrice.forEach(element => {
    iProductPrice.push(element.dataset.price);
});

var iLength = iProductPrice.length;  //商品樣數
updateTotalPay();


//加減號處理 事件添加
for (let i = 0 ; i < iLength ; i++)
{
    elementPlusButton[i].onclick = function(){
        mathUpdateProduct(i);
    }

    elementMinusButton[i].onclick = function(){
        if(elementInputNumber[i].value > 1 )
        {
            mathUpdateProduct(i , -1);
        }
        else
        {
            alert('不得小於1');
        }        
    }
}

// 監聽input value改變
for (let i = 0; i < iLength; i++) {
    elementInputNumber[i].listeneraArguments = i;
    elementInputNumber[i].addEventListener('input',mathUpdateValue);
    
}



// 函式區
// 目的 : 處理各產品因為加減號影響的價格以及總價
// 輸入 : 第幾個產品 以及 opcode 決定+-
function mathUpdateProduct(index, opcode = 1) {
    var temp = parseInt(elementInputNumber[index].value) + opcode;
    elementInputNumber[index].value = temp;
    
    elementSubtotal[index].innerHTML = '$' + (iProductPrice[index] * temp).toLocaleString();    
    elementCartQty += opcode;

    updateTotalPay();
}

// 目的 : 監聽輸入數值改變 處理直接輸入input欄位影響的價格
// 輸入 : 受監聽的輸入攔位
function mathUpdateValue() {
    var iNumbers = parseInt(this.value)
    var index = this.listeneraArguments;
        
    elementSubtotal[index].innerHTML = '$' + (iProductPrice[index] * iNumbers).toLocaleString(); 

    updateTotalPay();
    
}

// 目的 : 更新小計和總計價格
function updateTotalPay() {
    var iQty = 0;
    var iShipping = 60;
    var iTotal = 0;
    elementCartQty
    elementShipping
    

    for (let i = 0 ; i < iLength ; i++)
    {
        var iEachQty = elementInputNumber[i].value
        iQty += parseInt(iEachQty);
        iTotal += iProductPrice[i] * iEachQty;
    }

    elementCartQty.innerHTML = iQty.toLocaleString();
    if (iTotal > 1000)
    {
        elementShipping.innerHTML = '$0';
        elementTotal.innerHTML = '$' + iTotal.toLocaleString(); 
    }
    else
    {
        elementShipping.innerHTML = '$60';
        elementTotal.innerHTML = '$' + (iTotal + 60).toLocaleString(); 
    }
    
}


function Validator(options){


    var selectorRules = {}
    var formElement = document.querySelector(options.form)
    function validate(inputElement,rule){
        var errorMessage = rule.test(inputElement.value);
        var errorElement = formElement.querySelector(rule.selector).parentElement.querySelector(options.errorSelector)
        
        
        if(errorMessage){
                            
            errorElement.innerText = errorMessage
            inputElement.parentElement.classList.add('invalid')
    
    
        }
        else{
            errorElement.innerText = ''
            inputElement.parentElement.classList.remove('invalid')
        }
    }
    console.log(options.rules)
    if(formElement){
        options.rules.forEach(function(rule){

            // Lưu lại các rules cho mỗi input

            if(Array.isArray(selectorRules[rule.selector])){
                selectorRules[rule.selector].push(rule.test)
            }else{
                selectorRules[rule.selector] = [rule.test]
            }
            console.log(rule.selector)
            var inputElement = formElement.querySelector(rule.selector)
            if(inputElement){
                inputElement.onblur = function(){
                    validate(inputElement,rule)    
                }
                inputElement.oninput = function(){
                    var errorElement = formElement.querySelector(rule.selector).parentElement.querySelector('.form-message')
                    errorElement.innerText = '',
                    inputElement.parentElement.classList.remove('invalid')
                }
            }
        })
    }
}

Validator.isRequired = function(selector){
    return {
        selector:selector,
        test:function(value){
            return value.trim()?undefined:"Vui lòng nhập trường này"
        }
    }
}
Validator.isEmail = function(selector){
    return{
        selector:selector,
        test:function(value){
            var regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
            return regex.test(value)?undefined:"Vui lòng nhập email"
        }
    }
}

Validator.requiredMinLength = function(selector,min){
    return{
        selector:selector,
        test:function(value){
            return value.length>=min?undefined:`Vui lòng nhập tối thiểu ${min} kí tự`
        }
    }
}

Validator.isConfirmed=function(selector,getConfirmValue,message){
    return {
        selector:selector,
        test:function(value){
            return value == getConfirmValue()?undefined:message||"Giá trị nhập vào không đúng"
        }
    }
}



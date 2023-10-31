const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const buyTicketBtn = $$('.buy-ticket')
const modal = $('.modal')
const modalClose = $('.modal-close')
const inputNumber = $('#number-tickets')
const inputGmail = $('#gmail-user')
const submitButton = $('#buy-tickets')
buyTicketBtn.forEach(function(btn){
    btn.onclick = function(){
        modal.style.display = 'flex'
    }
})
modalClose.onclick = function(){
    modal.style.display = 'none'
}
Validator.isEmail = function(selector){
    return {
        selector : selector,
        test : function(value){
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(value) ? undefined : 'Vui long nhap Email'
        }
    }
}
Validator.isRequired = function(selector){
    return {
        selector : selector,
        test: function(value){
            return value ? undefined : 'Vui long nhap cho nay'
        }
    }
}
Validator.check = function(selector,min){
    return{
        selector: selector,
        test: function(value){
            return value <= min ? undefined : `Qua so luong ve , so luong ve hien tai ${min}`
        }
    }
}
function Validator(options){
    var modalContainer = document.querySelector(options.form)
    var selectorRule = {}
    // validate
    function validate(inputElement,rule,inputMessage){
        let rules = selectorRule[rule.selector]
        let errorMessage
        for(let i = 0 ; i<rules.length ; i++){
            errorMessage = rules[i](inputElement.value)
            if(errorMessage) break;
        }
        if(errorMessage){
            inputMessage.innerText = errorMessage
            inputMessage.classList.add('invalid')
        }else{
            inputMessage.innerText = ''
            inputMessage.classList.remove('invalid')
        }
    }
    function getParent(element,selector){
        while(element.parentElement){
            if(element.parentElement.matches(selector)){
                return element.parentElement  
        }
        element = element.parentElement
    }
}
    //get function rule cho vao mang
    options.rules.forEach(function(rule){
        if(Array.isArray(selectorRule[rule.selector])){
            selectorRule[rule.selector].push(rule.test)
        }else{
            selectorRule[rule.selector] = [rule.test]
        }
    })

    options.rules.forEach(function(rule){
        const inputElement = modalContainer.querySelector(rule.selector)
        const inputMessage = getParent(inputElement,options.formParent).querySelector('.form-message')
        inputElement.oninput = function(){
            validate(inputElement,rule,inputMessage)
            inputMessage.innerText = ''
            inputMessage.classList.remove('invalid')
        }
        inputElement.onblur = function(){
            validate(inputElement,rule,inputMessage)
        }
    })
    
}
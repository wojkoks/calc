class Calculator{
    constructor(prevtextelement,currenttextelement){
        this.prevtextelement=prevtextelement
        this.currenttextelement=currenttextelement
        this.clear()
    }

    clear(){
        this.currentOperand = ''
        this.prevOperand = ''
        this.operation = undefined
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }

    appendNumber(number){
        if(number==='.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation){
        if(this.currentOperand === '') return
        if(this.prevOperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.prevOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute(){
        let computation
        const prev = parseFloat(this.prevOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return

        switch(this.operation){
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.prevOperand = ''

    }

    getDisplayNumber(number){

        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        
        let integerDisplay

        if(isNaN(integerDigits)){
            integerDisplay = ''
        }else{
            integerDisplay = integerDigits.toLocaleString('en',{maximumFractionDigits:0})
        }
        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        }else{
        return integerDisplay
        }
    }

    updateDisplay(){
        this.currenttextelement.innerText = this.getDisplayNumber(this.currentOperand)
        if(this.operation!= null){
            this.prevtextelement.innerText = `${this.getDisplayNumber(this.prevOperand)} ${this.operation}`
        } else{
            this.prevtextelement.innerText =''
        }
    }

}



const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const delButton = document.querySelector('[data-del]')
const acButton = document.querySelector('[data-ac]')
const prevtextelement = document.querySelector('[data-previous-operand]')
const currenttextelement = document.querySelector('[data-current-operand]')

const cal = new Calculator(prevtextelement,currenttextelement)

numberButtons.forEach((button) =>{
    button.addEventListener('click',()=>{
        cal.appendNumber(button.innerText)
        console.log(button.innerText)
        cal.updateDisplay()
    })
})
operationButtons.forEach((button) =>{
    button.addEventListener('click',()=>{
        cal.chooseOperation(button.innerText)
        console.log(button.innerText)
        cal.updateDisplay()
    })
})


equalsButton.addEventListener('click',()=>{
    cal.compute()
    cal.updateDisplay()
})

acButton.addEventListener('click',()=>{
    cal.clear()
    cal.updateDisplay()
})

delButton.addEventListener('click',()=>{
    cal.delete()
    cal.updateDisplay()
})
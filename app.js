// listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
    //hide result
    document.querySelector('#results').style.display = 'none'

    //show loader
    document.querySelector('.load').style.display = 'block'

    setTimeout(calculateResults, 2500)

    e.preventDefault()
})

function calculateResults(){
    // ui variables
    const amount = document.getElementById('amount')
    const interest = document.getElementById('interest')
    const years = document.getElementById('years')
    const monthlyPayment = document.getElementById('monthly-payment')
    const totalPayment = document.getElementById('total-payment')
    const totalInterest = document.getElementById('total-interest')

    const principal = parseFloat(amount.value)
    const calculatedInterest = parseFloat(interest.value) /100 /12
    const calculatedPayments = parseFloat(years.value) * 12

    //compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments)
    const monthly = (principal * x * calculatedInterest) / (x - 1)

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2)
        totalPayment.value = (monthly * calculatedPayments).toFixed(2)
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2)
        document.querySelector('#results').style.display = 'block'
        document.querySelector('.load').style.display = 'none'

    }else{
        showError('Oops!! check your values')
    }
}

    //show error 
    function showError(error){
        document.querySelector('#results').style.display = 'none'
        document.querySelector('.load').style.display = 'none'

        // create a div 

        const errorDiv = document.createElement('div')

        const card = document.querySelector('.card')
        const heading = document.querySelector('.heading')

        errorDiv.className = 'btn btn-large pulse red'

        errorDiv.appendChild(document.createTextNode(error))

        card.insertBefore(errorDiv, heading)

        setTimeout(clearError, 3000)

    }

    function clearError(){
        document.querySelector('.pulse').remove()
    }
import './scss/style.scss';

const total = document.querySelector('.total_output');
const income = document.querySelector('.calculator_income-input');
const sickleaveDays = document.querySelector('.calculator_days-input');
const totalDays = document.querySelector('.total_days');
const employerDays = document.querySelector('.employer_days');
const healthDays = document.querySelector('.health_days');
const employerCompensation = document.querySelector('.employer_compensation');
const healthCompensation = document.querySelector('.health_compensation');
const employerDailyAllowance = document.querySelector('.allowance_1');
const healthDailyAllowance = document.querySelector('.allowance_2');
const checkbox = document.querySelector(".calculator_checkbox");
const form = document.querySelector("form");

const compensationRate = 0.7;
const noCompensationDays = 3;
const tax = 0.2;
const monthDays = 30;

let dailyRateGross;
let dailyRateNet;
let employerPayDays = 0;
let healthInsurancePayDays = 0;
let isTubercolosis = false;


function calculateDailyRate() {
    dailyRateGross = Number(income.value) * compensationRate / monthDays;
    dailyRateNet = Math.round(dailyRateGross - (dailyRateGross * tax));
}

function calculateInsurancePayment() {
    calculateDailyRate();

    // employer pays
    if (sickleaveDays.value < 4) { 
        employerPayDays = 0
    } else if (sickleaveDays.value >= 4 && sickleaveDays.value <= 8) {
        employerPayDays = sickleaveDays.value - noCompensationDays;
    } else { employerPayDays = 5 }

    employerDays.value = employerPayDays + ' days';
    employerCompensation.value = (dailyRateNet * employerPayDays) + ',00€';

    // health insurance pays
    if (isTubercolosis && sickleaveDays.value > 240) {
        healthInsurancePayDays = 235;
    } else if (sickleaveDays.value > 185) {
        healthInsurancePayDays = 177;
    } else if (sickleaveDays.value > 8) {
        healthInsurancePayDays = sickleaveDays.value - 8;
    } else { healthInsurancePayDays = 0 }
    healthDays.value = healthInsurancePayDays + ' days';
    healthCompensation.value = (dailyRateNet * healthInsurancePayDays) + ',00€';
}

function calculateTotal() {
    calculateInsurancePayment();

    healthDailyAllowance.value = dailyRateNet + ',00 €';
    employerDailyAllowance.value = dailyRateNet + ',00 €';
    totalDays.value = sickleaveDays.value;

    total.value = (dailyRateNet * (employerPayDays + healthInsurancePayDays)) + ',00€';
}

checkbox.onclick = function() {
    if (checkbox.checked) {
        isTubercolosis = true;
    } else { isTubercolosis = false }
}

function handleForm(event) { event.preventDefault(); }
form.addEventListener('submit', handleForm);

document.querySelector('.calculator_button').onclick = function() {
    calculateTotal();
}



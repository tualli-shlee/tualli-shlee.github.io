const form = document.getElementById('inputform');
const input = document.getElementById('input');
const planlist = document.getElementsByClassName('plan');
const planwrapper = document.getElementById('planwrapper');
const planlistdata = [];

const draw = () => {
    planwrapper.innerHTML = '';
    planlistdata.forEach(element => {
        let plancell = document.createElement('div');
        plancell.textContent = element;
        planwrapper.appendChild(plancell);
    });
};

form.addEventListener('submit',e=>{
    e.preventDefault();
    planlistdata.push(input.value);
    console.log(planlistdata);
    draw();
    input.value = '';
    input.focus();
});
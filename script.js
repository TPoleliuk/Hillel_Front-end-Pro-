window.onload = function() {
    const slider = document.querySelector('.slider-range');
    const numberInput = document.querySelector('.input-number');
    const rangeDiagram = document.querySelector('.range-diagram');
    const commissionDiagram = document.querySelector('.commission-diagram');
    const resultTags = [...document.querySelectorAll('.results span')];
    const commissionValue = {
        '2%': {from: 0, to: 19},
        '4%': {from: 20, to: 49},
        '6%': {from: 50, to: 74},
        '8%': {from: 75, to: 100},
    };

    slider.addEventListener("input", onRangeInputHandler);
    numberInput.addEventListener("input", onNumberInputHandler);


    function onRangeInputHandler() {
        numberInput.value = this.value;
        modifyDiagram(this.value);
    };

    function onNumberInputHandler() {
        let value = this.value;

        if(!this.checkValidity()) {
            value = 0;
        };

        slider.value = value;
        modifyDiagram(value);
    };

    function modifyDiagram(value) {
        rangeDiagram.style.height = `${value}px`;
        commissionDiagram.style.height = `${calculateCommission(commissionValue, value)}px`;
        showResult(resultTags, rangeDiagram.style.height, commissionDiagram.style.height);
    };

    function calculateCommission(commissionObj, inputValue) {
        for(let key in commissionObj) {
            if (inputValue >= commissionObj[key].from && inputValue <= commissionObj[key].to) {
                return toCoef(parseInt(key)) * inputValue;
            };
        };
    };

    function toCoef(persantage) {
        return persantage / 100;
    };

    function showResult(tags, ...arg) {
        const totalResult = arg.reduce((total, part) => {
            return total + parseFloat(part);
        }, 0);

        arg.push(`${totalResult}px`);
        let indexOfArg = 0;

        tags.forEach(tag => {
            tag.innerHTML = `${arg[indexOfArg++]}`;
        });
    };
};


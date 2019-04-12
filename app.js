const express = require('express');

const app = express();

app.listen(8000, () => {
    console.log("were connected")
})

app.get('/', (req, res) => {
    res.send('Hello NAT!')
})

app.get('/sum', (req, res) => {
    const a = req.query.a;
    const b = req.query.b;

    const numA = parseInt(a);
    const numB = parseInt(b);
    const sum = numA + numB;


    if(numA && numB){
        res.send(`The sum of a & b is: ${sum}`)
    }

    else {
        res.end('Sorry');
    }
})

app.get('/cipher', (req, res) => {
    const text = req.query.text;
    const shift = req.query.shift;

    function caesarShift(str, amount) {

        // Wrap the amount
        if (amount < 0)
            return caesarShift(str, amount + 26);
 
        // Make an output variable
        var output = '';
 
        // Go through each character
        for (var i = 0; i < str.length; i++) {
 
            // Get the character we’ll be appending
            var c = str[i];
 
            // If it’s a letter...
            if (c.match(/[a-z]/i)) {
 
                // Get its code
                var code = str.charCodeAt(i);
 
                // Uppercase letters
                if ((code >= 65) && (code <= 90))
                    c = String.fromCharCode(((code - 65 + amount) % 26) + 65);
 
                // Lowercase letters
                else if ((code >= 97) && (code <= 122))
                    c = String.fromCharCode(((code - 97 + amount) % 26) + 97);
 
            }
 
            // Append
            output += c;
 
        }
 
        // All done!
        return output;
 
    };

    const result = caesarShift(text, shift);

    res.send(result)

})

app.get('/lottery', (req, res) => {
    const array = req.query.arr;

    var newArray = array.map(function (x) {
        return parseInt(x, 10);
    });

    if (newArray.length !== 6) {
        res.send('input 6 arr paramters');
    }

    const randomArr = [];

    for (let i = 0; i < newArray.length; i++) {
        randomArr.push((Math.floor(Math.random() * (20 - 1) + 1)));
    }


    let count = 0;
    for (let j = 0; j < newArray.length; j++) {
        if (newArray.includes(randomArr[j])) {
            count++;
        }
        
    }

    console.log(count);

    if(count === 6) {
        res.send('Wow! Unbelievable! You could have won the mega millions');
    } else if (count === 5) {
        res.send('Congratulations! You win $100!');
    } else if (count === 4) {
        res.send('Congratulations! You win a free ticket!');
    } else {
        res.send('You lose');
    }

    console.log(randomArr);


})
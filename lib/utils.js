/*
 * Copyright (c) 2020. Ed Addario. All rights reserved.
 */
'use strict';

const ac = require('ansi-colors');

const colors = ['whiteBright', 'yellowBright', 'greenBright', 'cyanBright', 'blueBright', 'magentaBright'];
let index = 0;

module.exports = {
    addWorkDays: (date, days) => {
        while (days > 0) {
            date.setDate(date.getDate() + 1);
            if (date.getDay() !== 0 && date.getDay() !== 6) {
                days -= 1;
            }
        }
        return date;
    },

    log: (message) => {
        console.log(ac[colors[index % colors.length]](message));
        index++;
    },

    apiError: (message) => {
        console.log(ac.redBright(message));
    },

    error: (message) => {
        console.log(ac.bgBlueBright.yellowBright(message));
    }
};

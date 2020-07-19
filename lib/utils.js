/*
 * Copyright (c) 2020. Ed Addario. All rights reserved.
 */
'use strict';

module.exports = {
    addWorkDays: (date, days) => {
        while (days > 0) {
            date.setDate(date.getDate() + 1);
            if (date.getDay() !== 0 && date.getDay() !== 6) {
                days -= 1;
            }
        }
        return date;
    }
};

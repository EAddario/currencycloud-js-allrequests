/*
 * Copyright (c) 2019. Ed Addario. All rights reserved.
 */
'use strict';

const currencyCloud = require('currency-cloud');
const api = require('./lib/api')

const credentials = {
  loginId: process.argv[2],
  apiKey: process.argv[3]
};
const ac = require('ansi-colors');

api.login(credentials)
  .then(api.currentAccount)
  .then(api.findAccounts)
  .then(api.accountCreate)
  .then(api.retrieveAccount)
  .then(api.updatedAccount)
  .then(api.getPaymentCharges)
  .then(api.updatePaymentCharges)
  .then(api.findBalances)
  .then(api.getBalance)
  .then(api.findBeneficiaries)
  .then(api.getBeneficiary)
  .then(api.validateBeneficiary)
  .then(api.createBeneficiary)
  .then(api.updateBeneficiary)
  .then(api.deleteBeneficiary)
  .then(api.findContacts)
  .then(api.getContact)
  .then(api.currentContact)
  .then(api.createContact)
  .then(api.updateContact)
  .then(api.findConversions)
  .then(api.getConversion)
  .then(api.createConversion)
  .then(api.quoteDateChangeConversion)
  .then(api.dateChangeConversion)
  .then(api.splitPreviewConversion)
  .then(api.splitConversion)
  .then(api.splitHistoryConversion)
  .then(api.quoteCancelParentConversion)
  .then(api.quoteCancelChildConversion)
  .then(api.cancelParentConversion)
  .then(api.cancelChildConversion)
  .then(api.profitAndLossConversion)
  .then(api.logout)
  .catch((err) => {
    if (err instanceof currencyCloud.APIerror) {
      console.log(ac.bgRedBright.yellowBright(err.toYAML()) + '\n');
    }
    else {
      console.log(ac.bgBlueBright.yellowBright(err) + '\n');
    }
  });

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

api.login(credentials)
  .then(api.currentAccount)
  .then(api.findAccounts)
  .then(api.accountCreate)
  .then(api.retrieveAccount)
  .then(api.updatedAccount)
  .then(api.findBalances)
  .then(api.getBalance)
  .then(api.findBeneficiaries)
  .then(api.getBeneficiary)
  .then(api.validateBeneficiary)
  .then(api.createBeneficiary)
  .then(api.updateBeneficiary)
  .then(api.deleteBeneficiary)
  .then(api.logout)
  .catch((err) => {
    if (err instanceof currencyCloud.APIerror) {
      console.log(err.toYAML());
    }
    else {
      console.log(err);
    }
  });

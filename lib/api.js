/*
 * Copyright (c) 2019. Ed Addario. All rights reserved.
 */
'use strict';

let currencyCloud = require('currency-cloud');

let account = {};
let balance = {};
let beneficiary = {};

module.exports = {
  login: (credentials) => {
    return currencyCloud.authentication.login({
      environment: 'demo',
      loginId: credentials.loginId,
      apiKey: credentials.apiKey
    });
  },

  logout: () => {
    return currencyCloud.authentication.logout()
      .then(() => {
        console.log('logout\n');
      });
  },

  currentAccount: () => {
    return currencyCloud.accounts.getCurrent()
      .then((res) => {
        console.log('currentAccount: ' + JSON.stringify(res, null, 2) + '\n');
      });
  },

  findAccounts: () => {
    return currencyCloud.accounts.find({})
      .then((res) => {
        console.log('findAccounts: ' + JSON.stringify(res, null, 2) + '\n');
      });
  },

  accountCreate: () => {
    return currencyCloud.accounts.create({
      accountName: "Currencycloud Development",
      legalEntityType: "individual",
      street: "12 Steward St",
      city: "London",
      postalCode: "E1 6FQ",
      country: "GB",
      apiTrading: true,
      onlineTrading: true,
      phoneTrading: true
    })
      .then((res) => {
        account = res;
        console.log('accountCreate: ' + JSON.stringify(res, null, 2) + '\n');
      });
  },

  retrieveAccount: () => {
    return currencyCloud.accounts.get({
      id: account.id
    })
      .then((res) => {
        account = res;
        console.log('retrieveAccount: ' + JSON.stringify(res, null, 2) + '\n');
      });
  },

  updatedAccount: () => {
    return currencyCloud.accounts.update({
      id: account.id,
      yourReference: "ACCT-REF-" + Math.floor(Math.random() * 1000 + 1000),
      identificationType: "passport",
      identificationValue: Math.floor(Math.random() * 100000000 + 100000000)
    })
      .then((res) => {
        console.log('updatedAccount: ' + JSON.stringify(res, null, 2) + '\n');
      });
  },

  findBalances: () => {
    return currencyCloud.balances.find({})
      .then((res) => {
        balance = res;
        console.log('findBalance: ' + JSON.stringify(res, null, 2) + '\n');
      });
  },

  getBalance: () => {
    return currencyCloud.balances.get({
      currency: balance.balances[0].currency
    })
      .then((res) => {
        console.log('getBalance: ' + JSON.stringify(res, null, 2) + '\n');
      });
  },

  findBeneficiaries: () => {
    return currencyCloud.beneficiaries.find({})
      .then((res) => {
        beneficiary = res;
        console.log('findBeneficiaries: ' + JSON.stringify(res, null, 2) + '\n');
      });
  },

  getBeneficiary: () => {
    return currencyCloud.beneficiaries.get({
      id: beneficiary.beneficiaries[0].id
    })
      .then((res) => {
        console.log('getBeneficiaries: ' + JSON.stringify(res, null, 2) + '\n');
      });
  },

  validateBeneficiary: () => {
    beneficiary = {
      bankCountry: "IT",
      currency: "EUR",
      beneficiaryCountry: "IT",
      iban: "IT1200012030200359100100",
      bicSwift: "IBSPITNA020",
      bankName: "Banca Monte dei Paschi di Siena",
      bankAddress: "n° 3 Piazza Salimbeni, Siena SI, 53100",
      bankAccountType: "checking",
      beneficiaryEntityType: "individual",
      beneficiaryFirst_name: "Dame Tamara",
      beneficiaryLastName: "Carlton",
      beneficiaryAddress: "Piazza Museo n° 19, Napoli, 80135",
      beneficiaryCity: "Napoli",
      beneficiaryPostcode: "80135",
      beneficiaryStateOrProvince: "Provincia di Napoli",
      payment_types: [
        "priority",
        "regular"
      ]
    };
    return currencyCloud.beneficiaries.validate(beneficiary)
      .then((res) => {
        console.log('validateBeneficiaries: ' + JSON.stringify(res, null, 2) + '\n');
      });
  },

  createBeneficiary: () => {
    beneficiary.bankAccountHolderName = "Dame Tamara Carlton";
    beneficiary.name = "Fulcrum Fund";
    return currencyCloud.beneficiaries.create(beneficiary)
      .then((res) => {
        beneficiary = res;
        console.log('createBeneficiary: ' + JSON.stringify(res, null, 2) + '\n');
      });
  },

  updateBeneficiary: () => {
    return currencyCloud.beneficiaries.update({
      id: beneficiary.id,
      accountNumber: Math.floor(Math.random() * 100000000 + 100000000),
      beneficiaryDateOfBirth: "1968-03-23",
      beneficiaryIdentificationType: "passport",
      beneficiaryIdentificationValue: Math.floor(Math.random() * 100000000 + 100000000),
      beneficiaryExternalReference: "BEN-REF-" + Math.floor(Math.random() * 1000 + 1000),
      email: "tamara.carlton@fulcrum-fund.org"
    })
      .then((res) => {
        console.log('updateBeneficiary: ' + JSON.stringify(res, null, 2) + '\n');
      });
  },

  deleteBeneficiary: () => {
    return currencyCloud.beneficiaries.delete({
      id: beneficiary.id
    })
      .then((res) => {
        console.log('deleteBeneficiary: ' + JSON.stringify(res, null, 2) + '\n');
      });
  }
};

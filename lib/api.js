/*
 * Copyright (c) 2019. Ed Addario. All rights reserved.
 */
'use strict';

const currencyCloud = require('currency-cloud');
const ac = require('ansi-colors');

let account = {};
let balance = {};
let beneficiary = {};
let charges = {};

module.exports = {
  login: (credentials) => {
    return currencyCloud.authentication.login({
      environment: 'demo',
      loginId: credentials.loginId,
      apiKey: credentials.apiKey
    })
      .then(() => {
        console.log('login\n');
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
        console.log(ac.blueBright('currentAccount: ' + JSON.stringify(res, null, 2) + '\n'));
      })
      .catch((err) => {
        if (err instanceof currencyCloud.APIerror) {
          console.log(ac.bgRedBright.yellowBright(err.toYAML()) + '\n');
        }
        else {
          console.log(ac.bgRedBright.yellowBright(err) + '\n');
        }
      });
  },

  findAccounts: () => {
    return currencyCloud.accounts.find({})
      .then((res) => {
        console.log(ac.cyanBright('findAccounts: ' + JSON.stringify(res, null, 2) + '\n'));
      })
      .catch((err) => {
        if (err instanceof currencyCloud.APIerror) {
          console.log(ac.bgRedBright.yellowBright(err.toYAML()) + '\n');
        }
        else {
          console.log(ac.bgRedBright.yellowBright(err) + '\n');
        }
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
        console.log(ac.greenBright('accountCreate: ' + JSON.stringify(res, null, 2) + '\n'));
      })
      .catch((err) => {
        if (err instanceof currencyCloud.APIerror) {
          console.log(ac.bgRedBright.yellowBright(err.toYAML()) + '\n');
        }
        else {
          console.log(ac.bgRedBright.yellowBright(err) + '\n');
        }
      });
  },

  retrieveAccount: () => {
    return currencyCloud.accounts.get({
      id: account.id
    })
      .then((res) => {
        account = res;
        console.log(ac.magentaBright('retrieveAccount: ' + JSON.stringify(res, null, 2) + '\n'));
      })
      .catch((err) => {
        if (err instanceof currencyCloud.APIerror) {
          console.log(ac.bgRedBright.yellowBright(err.toYAML()) + '\n');
        }
        else {
          console.log(ac.bgRedBright.yellowBright(err) + '\n');
        }
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
        console.log(ac.redBright('updatedAccount: ' + JSON.stringify(res, null, 2) + '\n'));
      })
      .catch((err) => {
        if (err instanceof currencyCloud.APIerror) {
          console.log(ac.bgRedBright.yellowBright(err.toYAML()) + '\n');
        }
        else {
          console.log(ac.bgRedBright.yellowBright(err) + '\n');
        }
      });
  },

  getPaymentCharges: () => {
    return currencyCloud.accounts.getPaymentChargesSettings({
      accountId: account.id
    })
      .then((res) => {
        charges =  res;
        console.log(ac.yellowBright('getPaymentCharges: ' + JSON.stringify(res, null, 2) + '\n'));
      })
      .catch((err) => {
        if (err instanceof currencyCloud.APIerror) {
          console.log(ac.bgRedBright.yellowBright(err.toYAML()) + '\n');
        }
        else {
          console.log(ac.bgRedBright.yellowBright(err) + '\n');
        }
      });
  },

  updatePaymentCharges: () => {
    return currencyCloud.accounts.updatePaymentChargesSettings({
      accountId:  charges.paymentChargesSettings[0].accountId,
      chargeSettingsId: charges.paymentChargesSettings[0].chargeSettingsId,
      enabled: true,
      default: true
    })
      .then((res) => {
        console.log(ac.bold('updatePaymentCharges: ' + JSON.stringify(res, null, 2) + '\n'));
      })
      .catch((err) => {
        if (err instanceof currencyCloud.APIerror) {
          console.log(ac.bgRedBright.yellowBright(err.toYAML()) + '\n');
        }
        else {
          console.log(ac.bgRedBright.yellowBright(err) + '\n');
        }
      });
  },

  findBalances: () => {
    return currencyCloud.balances.find({})
      .then((res) => {
        balance = res;
        console.log(ac.unstyle('findBalance: ' + JSON.stringify(res, null, 2) + '\n'));
      })
      .catch((err) => {
        if (err instanceof currencyCloud.APIerror) {
          console.log(ac.bgRedBright.yellowBright(err.toYAML()) + '\n');
        }
        else {
          console.log(ac.bgRedBright.yellowBright(err) + '\n');
        }
      });
  },

  getBalance: () => {
    return currencyCloud.balances.get({
      currency: balance.balances[0].currency
    })
      .then((res) => {
        console.log(ac.blueBright('getBalance: ' + JSON.stringify(res, null, 2) + '\n'));
      })
      .catch((err) => {
        if (err instanceof currencyCloud.APIerror) {
          console.log(ac.bgRedBright.yellowBright(err.toYAML()) + '\n');
        }
        else {
          console.log(ac.bgRedBright.yellowBright(err) + '\n');
        }
      });
  },

  findBeneficiaries: () => {
    return currencyCloud.beneficiaries.find({})
      .then((res) => {
        beneficiary = res;
        console.log(ac.cyanBright('findBeneficiaries: ' + JSON.stringify(res, null, 2) + '\n'));
      })
      .catch((err) => {
        if (err instanceof currencyCloud.APIerror) {
          console.log(ac.bgRedBright.yellowBright(err.toYAML()) + '\n');
        }
        else {
          console.log(ac.bgRedBright.yellowBright(err) + '\n');
        }
      });
  },

  getBeneficiary: () => {
    return currencyCloud.beneficiaries.get({
      id: beneficiary.beneficiaries[0].id
    })
      .then((res) => {
        console.log(ac.greenBright('getBeneficiaries: ' + JSON.stringify(res, null, 2) + '\n'));
      })
      .catch((err) => {
        if (err instanceof currencyCloud.APIerror) {
          console.log(ac.bgRedBright.yellowBright(err.toYAML()) + '\n');
        }
        else {
          console.log(ac.bgRedBright.yellowBright(err) + '\n');
        }
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
        console.log(ac.magentaBright('validateBeneficiaries: ' + JSON.stringify(res, null, 2) + '\n'));
      })
      .catch((err) => {
        if (err instanceof currencyCloud.APIerror) {
          console.log(ac.bgRedBright.yellowBright(err.toYAML()) + '\n');
        }
        else {
          console.log(ac.bgRedBright.yellowBright(err) + '\n');
        }
      });
  },

  createBeneficiary: () => {
    beneficiary.bankAccountHolderName = "Dame Tamara Carlton";
    beneficiary.name = "Fulcrum Fund";
    return currencyCloud.beneficiaries.create(beneficiary)
      .then((res) => {
        beneficiary = res;
        console.log(ac.redBright('createBeneficiary: ' + JSON.stringify(res, null, 2) + '\n'));
      })
      .catch((err) => {
        if (err instanceof currencyCloud.APIerror) {
          console.log(ac.bgRedBright.yellowBright(err.toYAML()) + '\n');
        }
        else {
          console.log(ac.bgRedBright.yellowBright(err) + '\n');
        }
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
        console.log(ac.yellowBright('updateBeneficiary: ' + JSON.stringify(res, null, 2) + '\n'));
      })
      .catch((err) => {
        if (err instanceof currencyCloud.APIerror) {
          console.log(ac.bgRedBright.yellowBright(err.toYAML()) + '\n');
        }
        else {
          console.log(ac.bgRedBright.yellowBright(err) + '\n');
        }
      });
  },

  deleteBeneficiary: () => {
    return currencyCloud.beneficiaries.delete({
      id: beneficiary.id
    })
      .then((res) => {
        console.log(ac.bold('deleteBeneficiary: ' + JSON.stringify(res, null, 2) + '\n'));
      })
      .catch((err) => {
        if (err instanceof currencyCloud.APIerror) {
          console.log(ac.bgRedBright.yellowBright(err.toYAML()) + '\n');
        }
        else {
          console.log(ac.bgRedBright.yellowBright(err) + '\n');
        }
      });
  }
};

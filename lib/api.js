/*
 * Copyright (c) 2019. Ed Addario. All rights reserved.
 */
'use strict';

const currencyCloud = require('currency-cloud');
const ac = require('ansi-colors');
const uuid = require('uuid/v4');

let account = {};
let balance = {};
let beneficiary = {};
let charges = {};
let contact = {};
let conversion = {};
let split = {};

module.exports = {
  login: (credentials) => {
    return currencyCloud.authentication.login({
      environment: 'demo',
      loginId: credentials.loginId,
      apiKey: credentials.apiKey
    })
      .then((res) => {
        console.log(ac.bgBlackBright.black('login: ' + JSON.stringify(res, null, 2) + '\n'));
      });
  },

  logout: () => {
    return currencyCloud.authentication.logout()
      .then(() => {
        console.log(ac.bgBlackBright.black('logout\n'));
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
          console.log(ac.bgBlueBright.yellowBright(err) + '\n');
        }
      });
  },

  findAccounts: () => {
    return currencyCloud.accounts.find({
      orderAscDesc: "desc"
    })
      .then((res) => {
        console.log(ac.cyanBright('findAccounts: ' + JSON.stringify(res, null, 2) + '\n'));
      })
      .catch((err) => {
        if (err instanceof currencyCloud.APIerror) {
          console.log(ac.bgRedBright.yellowBright(err.toYAML()) + '\n');
        }
        else {
          console.log(ac.bgBlueBright.yellowBright(err) + '\n');
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
          console.log(ac.bgBlueBright.yellowBright(err) + '\n');
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
          console.log(ac.bgBlueBright.yellowBright(err) + '\n');
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
          console.log(ac.bgBlueBright.yellowBright(err) + '\n');
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
          console.log(ac.bgBlueBright.yellowBright(err) + '\n');
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
          console.log(ac.bgBlueBright.yellowBright(err) + '\n');
        }
      });
  },

  findBalances: () => {
    return currencyCloud.balances.find({
      orderAscDesc: "desc"
    })
      .then((res) => {
        balance = res;
        console.log(ac.blueBright('findBalance: ' + JSON.stringify(res, null, 2) + '\n'));
      })
      .catch((err) => {
        if (err instanceof currencyCloud.APIerror) {
          console.log(ac.bgRedBright.yellowBright(err.toYAML()) + '\n');
        }
        else {
          console.log(ac.bgBlueBright.yellowBright(err) + '\n');
        }
      });
  },

  getBalance: () => {
    return currencyCloud.balances.get({
      currency: balance.balances[0].currency
    })
      .then((res) => {
        console.log(ac.cyanBright('getBalance: ' + JSON.stringify(res, null, 2) + '\n'));
      })
      .catch((err) => {
        if (err instanceof currencyCloud.APIerror) {
          console.log(ac.bgRedBright.yellowBright(err.toYAML()) + '\n');
        }
        else {
          console.log(ac.bgBlueBright.yellowBright(err) + '\n');
        }
      });
  },

  findBeneficiaries: () => {
    return currencyCloud.beneficiaries.find({
      orderAscDesc: "desc"
    })
      .then((res) => {
        beneficiary = res;
        console.log(ac.greenBright('findBeneficiaries: ' + JSON.stringify(res, null, 2) + '\n'));
      })
      .catch((err) => {
        if (err instanceof currencyCloud.APIerror) {
          console.log(ac.bgRedBright.yellowBright(err.toYAML()) + '\n');
        }
        else {
          console.log(ac.bgBlueBright.yellowBright(err) + '\n');
        }
      });
  },

  getBeneficiary: () => {
    return currencyCloud.beneficiaries.get({
      id: beneficiary.beneficiaries[0].id
    })
      .then((res) => {
        console.log(ac.magentaBright('getBeneficiaries: ' + JSON.stringify(res, null, 2) + '\n'));
      })
      .catch((err) => {
        if (err instanceof currencyCloud.APIerror) {
          console.log(ac.bgRedBright.yellowBright(err.toYAML()) + '\n');
        }
        else {
          console.log(ac.bgBlueBright.yellowBright(err) + '\n');
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
        console.log(ac.redBright('validateBeneficiaries: ' + JSON.stringify(res, null, 2) + '\n'));
      })
      .catch((err) => {
        if (err instanceof currencyCloud.APIerror) {
          console.log(ac.bgRedBright.yellowBright(err.toYAML()) + '\n');
        }
        else {
          console.log(ac.bgBlueBright.yellowBright(err) + '\n');
        }
      });
  },

  createBeneficiary: () => {
    beneficiary.bankAccountHolderName = "Dame Tamara Carlton";
    beneficiary.name = "Fulcrum Fund";
    return currencyCloud.beneficiaries.create(beneficiary)
      .then((res) => {
        beneficiary = res;
        console.log(ac.yellowBright('createBeneficiary: ' + JSON.stringify(res, null, 2) + '\n'));
      })
      .catch((err) => {
        if (err instanceof currencyCloud.APIerror) {
          console.log(ac.bgRedBright.yellowBright(err.toYAML()) + '\n');
        }
        else {
          console.log(ac.bgBlueBright.yellowBright(err) + '\n');
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
        console.log(ac.bold('updateBeneficiary: ' + JSON.stringify(res, null, 2) + '\n'));
      })
      .catch((err) => {
        if (err instanceof currencyCloud.APIerror) {
          console.log(ac.bgRedBright.yellowBright(err.toYAML()) + '\n');
        }
        else {
          console.log(ac.bgBlueBright.yellowBright(err) + '\n');
        }
      });
  },

  deleteBeneficiary: () => {
    return currencyCloud.beneficiaries.delete({
      id: beneficiary.id
    })
      .then((res) => {
        console.log(ac.blueBright('deleteBeneficiary: ' + JSON.stringify(res, null, 2) + '\n'));
      })
      .catch((err) => {
        if (err instanceof currencyCloud.APIerror) {
          console.log(ac.bgRedBright.yellowBright(err.toYAML()) + '\n');
        }
        else {
          console.log(ac.bgBlueBright.yellowBright(err) + '\n');
        }
      });
  },

  findContacts: () => {
    return currencyCloud.contacts.find({
      orderAscDesc: "desc"
    })
      .then((res) => {
        contact = res;
        console.log(ac.cyanBright('findContacts: ' + JSON.stringify(res, null, 2) + '\n'));
      })
      .catch((err) => {
        if (err instanceof currencyCloud.APIerror) {
          console.log(ac.bgRedBright.yellowBright(err.toYAML()) + '\n');
        }
        else {
          console.log(ac.bgBlueBright.yellowBright(err) + '\n');
        }
      });
  },

  getContact: () => {
    return currencyCloud.contacts.get({
      id: contact.contacts[0].id
    })
      .then((res) => {
        console.log(ac.greenBright('getContact: ' + JSON.stringify(res, null, 2) + '\n'));
      })
      .catch((err) => {
        if (err instanceof currencyCloud.APIerror) {
          console.log(ac.bgRedBright.yellowBright(err.toYAML()) + '\n');
        }
        else {
          console.log(ac.bgBlueBright.yellowBright(err) + '\n');
        }
      });
  },

  currentContact: () => {
    return currencyCloud.contacts.getCurrent()
      .then((res) => {
        console.log(ac.magentaBright('currentContact: ' + JSON.stringify(res, null, 2) + '\n'));
      })
      .catch((err) => {
        if (err instanceof currencyCloud.APIerror) {
          console.log(ac.bgRedBright.yellowBright(err.toYAML()) + '\n');
        }
        else {
          console.log(ac.bgBlueBright.yellowBright(err) + '\n');
        }
      });
  },

  createContact: () => {
    contact = {
      accountId: account.id,
      firstName: "Currencycloud",
      lastName: "Development",
      emailAddress: "development." + (Math.random() + 1).toString(36).substring(6) + "@currencycloud.com",
      phoneNumber: "+44 20 3326 8173",
      dateOfBirth: "1968-03-23"
    };
    return currencyCloud.contacts.create(contact)
      .then((res) => {
        contact = res;
        console.log(ac.redBright('createContact: ' + JSON.stringify(res, null, 2) + '\n'));
      })
      .catch((err) => {
        if (err instanceof currencyCloud.APIerror) {
          console.log(ac.bgRedBright.yellowBright(err.toYAML()) + '\n');
        }
        else {
          console.log(ac.bgBlueBright.yellowBright(err) + '\n');
        }
      });
  },

  updateContact: () => {
    return currencyCloud.contacts.update({
      id: contact.id,
      yourReference: "CTCT-REF-" + Math.floor(Math.random() * 1000 + 1000),
      status: "enabled"
    })
      .then((res) => {
        console.log(ac.yellowBright('updateContact: ' + JSON.stringify(res, null, 2) + '\n'));
      })
      .catch((err) => {
        if (err instanceof currencyCloud.APIerror) {
          console.log(ac.bgRedBright.yellowBright(err.toYAML()) + '\n');
        }
        else {
          console.log(ac.bgBlueBright.yellowBright(err) + '\n');
        }
      });
  },

  findConversions: () => {
    return currencyCloud.conversions.find({
      orderAscDesc: "desc"
    })
      .then((res) => {
        conversion = res;
        console.log(ac.bold('findConversions: ' + JSON.stringify(res, null, 2) + '\n'));
      })
      .catch((err) => {
        if (err instanceof currencyCloud.APIerror) {
          console.log(ac.bgRedBright.yellowBright(err.toYAML()) + '\n');
        }
        else {
          console.log(ac.bgBlueBright.yellowBright(err) + '\n');
        }
      });
  },

  getConversion: () => {
    return currencyCloud.conversions.get({
      id: conversion.conversions[0].id
    })
      .then((res) => {
        console.log(ac.blueBright('getConversion: ' + JSON.stringify(res, null, 2) + '\n'));
      })
      .catch((err) => {
        if (err instanceof currencyCloud.APIerror) {
          console.log(ac.bgRedBright.yellowBright(err.toYAML()) + '\n');
        }
        else {
          console.log(ac.bgBlueBright.yellowBright(err) + '\n');
        }
      });
  },

  createConversion: () => {
    conversion = {
      buyCurrency: "EUR",
      sellCurrency: "GBP",
      fixedSide: "buy",
      amount: Math.floor(Math.random() * (500000 + 100000)) / 100,
      reason: "Invoice Payment",
      termAgreement: true,
      uniqueRequestId: uuid()
    };
    return currencyCloud.conversions.create(conversion)
      .then((res) => {
        conversion = res;
        console.log(ac.cyanBright('createConversion: ' + JSON.stringify(res, null, 2) + '\n'));
      })
      .catch((err) => {
        if (err instanceof currencyCloud.APIerror) {
          console.log(ac.bgRedBright.yellowBright(err.toYAML()) + '\n');
        }
        else {
          console.log(ac.bgBlueBright.yellowBright(err) + '\n');
        }
      });
  },

  quoteDateChangeConversion: () => {
    let date = new Date(conversion.settlementDate);
    date.setDate(date.getDate() + 7);

    return currencyCloud.conversions.date_change_quote({
      id: conversion.id,
      new_settlement_date: date.toISOString()
    })
      .then((res) => {
        console.log(ac.greenBright('quoteDateChangeConversion: ' + JSON.stringify(res, null, 2) + '\n'));
      })
      .catch((err) => {
        if (err instanceof currencyCloud.APIerror) {
          console.log(ac.bgRedBright.yellowBright(err.toYAML()) + '\n');
        }
        else {
          console.log(ac.bgBlueBright.yellowBright(err) + '\n');
        }
      });
  },

  dateChangeConversion: () => {
    let date = new Date(conversion.settlementDate);
    date.setDate(date.getDate() + 7);

    return currencyCloud.conversions.date_change({
      id: conversion.id,
      new_settlement_date: date.toISOString()
    })
      .then((res) => {
        console.log(ac.magentaBright('dateChangeConversion: ' + JSON.stringify(res, null, 2) + '\n'));
      })
      .catch((err) => {
        if (err instanceof currencyCloud.APIerror) {
          console.log(ac.bgRedBright.yellowBright(err.toYAML()) + '\n');
        }
        else {
          console.log(ac.bgBlueBright.yellowBright(err) + '\n');
        }
      });
  },

  splitPreviewConversion: () => {
    return currencyCloud.conversions.split_preview({
      id: conversion.id,
      amount: Math.round(Number(conversion.clientBuyAmount) * 50) / 100
    })
      .then((res) => {
        console.log(ac.redBright('splitPreviewConversion: ' + JSON.stringify(res, null, 2) + '\n'));
      })
      .catch((err) => {
        if (err instanceof currencyCloud.APIerror) {
          console.log(ac.bgRedBright.yellowBright(err.toYAML()) + '\n');
        }
        else {
          console.log(ac.bgBlueBright.yellowBright(err) + '\n');
        }
      });
  },

  splitConversion: () => {
    return currencyCloud.conversions.split({
      id: conversion.id,
      amount: Math.round(Number(conversion.clientBuyAmount) * 50) / 100
    })
      .then((res) => {
        split = res;
        console.log(ac.yellowBright('splitConversion: ' + JSON.stringify(res, null, 2) + '\n'));
      })
      .catch((err) => {
        if (err instanceof currencyCloud.APIerror) {
          console.log(ac.bgRedBright.yellowBright(err.toYAML()) + '\n');
        }
        else {
          console.log(ac.bgBlueBright.yellowBright(err) + '\n');
        }
      });
  },

  splitHistoryConversion: () => {
    return currencyCloud.conversions.split_history({
      id: conversion.id
    })
      .then((res) => {
        console.log(ac.bold('splitHistoryConversion: ' + JSON.stringify(res, null, 2) + '\n'));
      })
      .catch((err) => {
        if (err instanceof currencyCloud.APIerror) {
          console.log(ac.bgRedBright.yellowBright(err.toYAML()) + '\n');
        }
        else {
          console.log(ac.bgBlueBright.yellowBright(err) + '\n');
        }
      });
  },

  quoteCancelParentConversion: () => {
    return currencyCloud.conversions.cancellation_quote({
      id: split.parentConversion.id
    })
      .then((res) => {
        console.log(ac.blueBright('quoteCancelParentConversion: ' + JSON.stringify(res, null, 2) + '\n'));
      })
      .catch((err) => {
        if (err instanceof currencyCloud.APIerror) {
          console.log(ac.bgRedBright.yellowBright(err.toYAML()) + '\n');
        }
        else {
          console.log(ac.bgBlueBright.yellowBright(err) + '\n');
        }
      });
  },

  quoteCancelChildConversion: () => {
    return currencyCloud.conversions.cancellation_quote({
      id: split.childConversion.id
    })
      .then((res) => {
        console.log(ac.cyanBright('quoteCancelConversion: ' + JSON.stringify(res, null, 2) + '\n'));
      })
      .catch((err) => {
        if (err instanceof currencyCloud.APIerror) {
          console.log(ac.bgRedBright.yellowBright(err.toYAML()) + '\n');
        }
        else {
          console.log(ac.bgBlueBright.yellowBright(err) + '\n');
        }
      });
  },

  cancelParentConversion: () => {
    return currencyCloud.conversions.cancel({
      id: split.parentConversion.id,
      notes: "Reversing transaction - Parent"
    })
      .then((res) => {
        console.log(ac.greenBright('cancelParentConversion: ' + JSON.stringify(res, null, 2) + '\n'));
      })
      .catch((err) => {
        if (err instanceof currencyCloud.APIerror) {
          console.log(ac.bgRedBright.yellowBright(err.toYAML()) + '\n');
        }
        else {
          console.log(ac.bgBlueBright.yellowBright(err) + '\n');
        }
      });
  },

  cancelChildConversion: () => {
    return currencyCloud.conversions.cancel({
      id: split.childConversion.id,
      notes: "Reversing transaction - Child"
    })
      .then((res) => {
        console.log(ac.magentaBright('cancelChildConversion: ' + JSON.stringify(res, null, 2) + '\n'));
      })
      .catch((err) => {
        if (err instanceof currencyCloud.APIerror) {
          console.log(ac.bgRedBright.yellowBright(err.toYAML()) + '\n');
        }
        else {
          console.log(ac.bgBlueBright.yellowBright(err) + '\n');
        }
      });
  },

  profitAndLossConversion: () => {
    return currencyCloud.conversions.profit_and_loss({
      orderAscDesc: "desc"
    })
      .then((res) => {
        split = res;
        console.log(ac.redBright('profitAndLossConversion: ' + JSON.stringify(res, null, 2) + '\n'));
      })
      .catch((err) => {
        if (err instanceof currencyCloud.APIerror) {
          console.log(ac.bgRedBright.yellowBright(err.toYAML()) + '\n');
        }
        else {
          console.log(ac.bgBlueBright.yellowBright(err) + '\n');
        }
      });
  }
};

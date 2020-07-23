/*
 * Copyright (c) 2019. Ed Addario. All rights reserved.
 */
'use strict';

const currencyCloud = require('currency-cloud');
const utils = require('./utils');
const {v4: uuid} = require('uuid');

let account = {};
let balance = {};
let beneficiary = {};
let charges = {};
let contact = {};
let conversion = {};
let split = {};
let payment = {};
let payer = {};
let report = {};
let settlement = {};
let transaction = {};
let transfer = {};

module.exports = {
    login: (credentials) => {
        return currencyCloud.authentication.login({
            environment: 'demo',
            loginId: credentials.loginId,
            apiKey: credentials.apiKey
        })
            .then((res) => {
                utils.log('loginId: ' + credentials.loginId + ' apiKey: ' + credentials.apiKey + '\nauthToken: ' + res + '\n');
            });
    },

    logout: () => {
        return currencyCloud.authentication.logout()
            .then(() => {
                utils.log('logout\n');
            });
    },

    currentAccount: () => {
        return currencyCloud.accounts.getCurrent()
            .then((res) => {
                account = res;
                utils.log('currentAccount: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('currentAccount: ' + err.toYAML() + '\n');
                } else {
                    utils.error('currentAccount:\n' + err + '\n');
                }
            });
    },

    accountCreate: () => {
        account = {
            accountName: "Wirecard Development",
            legalEntityType: "individual",
            street: "12 Steward St",
            city: "London",
            postalCode: "E1 6FQ",
            country: "GB",
            apiTrading: true,
            onlineTrading: true,
            phoneTrading: true
        };
        return currencyCloud.accounts.create(account)
            .then((res) => {
                account = res;
                utils.log('accountCreate: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('accountCreate: ' + err.toYAML() + '\n');
                } else {
                    utils.error('accountCreate:\n' + err + '\n');
                }
            });
    },

    retrieveAccount: () => {
        return currencyCloud.accounts.get({
            id: account.id
        })
            .then((res) => {
                account = res;
                utils.log('retrieveAccount: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('retrieveAccount: ' + err.toYAML() + '\n');
                } else {
                    utils.error('retrieveAccount:\n' + err + '\n');
                }
            });
    },

    updateAccount: () => {
        return currencyCloud.accounts.update({
            id: account.id,
            yourReference: "ACCT-REF-" + Math.floor(Math.random() * 1000 + 1000),
            identificationType: "passport",
            identificationValue: Math.floor(Math.random() * 100000000 + 100000000)
        })
            .then((res) => {
                account = res;
                utils.log('updateAccount: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('updateAccount: ' + err.toYAML() + '\n');
                } else {
                    utils.error('updateAccount:\n' + err + '\n');
                }
            });
    },

    getPaymentCharges: () => {
        return currencyCloud.accounts.getPaymentChargesSettings({
            accountId: account.id
        })
            .then((res) => {
                charges = res;
                utils.log('getPaymentCharges: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('getPaymentCharges: ' + err.toYAML() + '\n');
                } else {
                    utils.error('getPaymentCharges:\n' + err + '\n');
                }
            });
    },

    updatePaymentCharges: () => {
        return currencyCloud.accounts.updatePaymentChargesSettings({
            accountId: charges.paymentChargesSettings[0].accountId,
            chargeSettingsId: charges.paymentChargesSettings[0].chargeSettingsId,
            enabled: true,
            default: true
        })
            .then((res) => {
                charges = res;
                utils.log('updatePaymentCharges: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('updatePaymentCharges: ' + err.toYAML() + '\n');
                } else {
                    utils.error('updatePaymentCharges:\n' + err + '\n');
                }
            });
    },

    findAccounts: () => {
        return currencyCloud.accounts.find({})
            .then((res) => {
                account = res;
                utils.log('findAccounts: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('findAccounts: ' + err.toYAML() + '\n');
                } else {
                    utils.error('findAccounts:\n' + err + '\n');
                }
            });
    },

    findBalances: () => {
        return currencyCloud.balances.find({
            orderAscDesc: "desc"
        })
            .then((res) => {
                balance = res;
                utils.log('findBalances: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('findBalances: ' + err.toYAML() + '\n');
                } else {
                    utils.error('findBalances:\n' + err + '\n');
                }
            });
    },

    getBalance: () => {
        return currencyCloud.balances.get({
            currency: balance.balances[0].currency
        })
            .then((res) => {
                balance = res;
                utils.log('getBalance: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('getBalance: ' + err.toYAML() + '\n');
                } else {
                    utils.error('getBalance:\n' + err + '\n');
                }
            });
    },

    topUpMarginBalance: () => {
        return currencyCloud.balances.topUpMargin({
            currency: balance.currency,
            amount: String(Number(balance.amount) + 12345.67)
        })
            .then((res) => {
                utils.log('topUpMarginBalance: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('topUpMarginBalance: ' + err.toYAML() + '\n');
                } else {
                    utils.error('topUpMarginBalance:\n' + err + '\n');
                }
            });
    },

    findBeneficiaries: () => {
        return currencyCloud.beneficiaries.find({
            orderAscDesc: "desc"
        })
            .then((res) => {
                beneficiary = res;
                utils.log('findBeneficiaries: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('findBeneficiaries: ' + err.toYAML() + '\n');
                } else {
                    utils.error('findBeneficiaries:\n' + err + '\n');
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
            paymentTypes: [
                "priority",
                "regular"
            ]
        };
        return currencyCloud.beneficiaries.validate(beneficiary)
            .then((res) => {
                utils.log('validateBeneficiary: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('validateBeneficiary: ' + err.toYAML() + '\n');
                } else {
                    utils.error('validateBeneficiary:\n' + err + '\n');
                }
            });
    },

    createBeneficiary: () => {
        beneficiary.bankAccountHolderName = "Dame Tamara Carlton";
        beneficiary.name = "Fulcrum Fund";
        return currencyCloud.beneficiaries.create(beneficiary)
            .then((res) => {
                beneficiary = res;
                utils.log('createBeneficiary: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('createBeneficiary: ' + err.toYAML() + '\n');
                } else {
                    utils.error('createBeneficiary:\n' + err + '\n');
                }
            });
    },

    getBeneficiary: () => {
        return currencyCloud.beneficiaries.get({
            id: beneficiary.id
        })
            .then((res) => {
                beneficiary = res;
                utils.log('getBeneficiary: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('getBeneficiary: ' + err.toYAML() + '\n');
                } else {
                    utils.error('getBeneficiary:\n' + err + '\n');
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
                beneficiary = res;
                utils.log('updateBeneficiary: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('updateBeneficiary: ' + err.toYAML() + '\n');
                } else {
                    utils.error('updateBeneficiary:\n' + err + '\n');
                }
            });
    },

    findContacts: () => {
        return currencyCloud.contacts.find({
            orderAscDesc: "desc"
        })
            .then((res) => {
                contact = res;
                utils.log('findContacts: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('findContacts: ' + err.toYAML() + '\n');
                } else {
                    utils.error('findContacts:\n' + err + '\n');
                }
            });
    },

    currentContact: () => {
        return currencyCloud.contacts.getCurrent()
            .then((res) => {
                contact = res;
                utils.log('currentContact: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('currentContact: ' + err.toYAML() + '\n');
                } else {
                    utils.error('currentContact:\n' + err + '\n');
                }
            });
    },

    createContact: () => {
        contact = {
            accountId: account.accounts[0].id,
            firstName: "Wirecard",
            lastName: "Development",
            emailAddress: "development." + (Math.random() + 1).toString(36).substring(6) + "@wirecard.com",
            phoneNumber: "+44 20 3326 8173",
            dateOfBirth: "1968-03-23"
        };
        return currencyCloud.contacts.create(contact)
            .then((res) => {
                contact = res;
                utils.log('createContact: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('createContact: ' + err.toYAML() + '\n');
                } else {
                    utils.error('createContact:\n' + err + '\n');
                }
            });
    },

    updateContact: () => {
        return currencyCloud.contacts.update({
            id: contact.id,
            yourReference: "CTCT-REF-" + Math.floor(Math.random() * 1000 + 1000),
            status: "enabled",
            locale: "en-GB"
        })
            .then((res) => {
                contact = res;
                utils.log('updateContact: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('updateContact: ' + err.toYAML() + '\n');
                } else {
                    utils.error('updateContact:\n' + err + '\n');
                }
            });
    },

    getContact: () => {
        return currencyCloud.contacts.get({
            id: contact.id
        })
            .then((res) => {
                contact = res;
                utils.log('getContact: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('getContact: ' + err.toYAML() + '\n');
                } else {
                    utils.error('getContact:\n' + err + '\n');
                }
            });
    },

    findConversions: () => {
        return currencyCloud.conversions.find({
            orderAscDesc: "desc"
        })
            .then((res) => {
                conversion = res;
                utils.log('findConversions: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('findConversions: ' + err.toYAML() + '\n');
                } else {
                    utils.error('findConversions:\n' + err + '\n');
                }
            });
    },

    createConversion: () => {
        conversion = {
            buyCurrency: "EUR",
            sellCurrency: "GBP",
            fixedSide: "buy",
            amount: Math.floor(Math.random() * 1000000 + 500000) / 100,
            reason: "Invoice Payment",
            termAgreement: true,
            uniqueRequestId: uuid()
        };
        return currencyCloud.conversions.create(conversion)
            .then((res) => {
                conversion = res;
                utils.log('createConversion: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('createConversion: ' + err.toYAML() + '\n');
                } else {
                    utils.error('createConversion:\n' + err + '\n');
                }
            });
    },

    getConversion: () => {
        return currencyCloud.conversions.get({
            id: conversion.id
        })
            .then((res) => {
                conversion = res;
                utils.log('getConversion: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('getConversion: ' + err.toYAML() + '\n');
                } else {
                    utils.error('getConversion:\n' + err + '\n');
                }
            });
    },

    quoteDateChangeConversion: () => {
        let date = new Date(conversion.settlementDate);
        date = utils.addWorkDays(date, 5);

        return currencyCloud.conversions.dateChangeQuote({
            id: conversion.id,
            newSettlementDate: date.toISOString()
        })
            .then((res) => {
                utils.log('quoteDateChangeConversion: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('quoteDateChangeConversion: ' + err.toYAML() + '\n');
                } else {
                    utils.error('quoteDateChangeConversion:\n' + err + '\n');
                }
            });
    },

    dateChangeConversion: () => {
        let date = new Date(conversion.settlementDate);
        date = utils.addWorkDays(date, 5);

        return currencyCloud.conversions.dateChange({
            id: conversion.id,
            newSettlementDate: date.toISOString()
        })
            .then((res) => {
                utils.log('dateChangeConversion: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('dateChangeConversion: ' + err.toYAML() + '\n');
                } else {
                    utils.error('dateChangeConversion:\n' + err + '\n');
                }
            });
    },

    splitPreviewConversion: () => {
        return currencyCloud.conversions.splitPreview({
            id: conversion.id,
            amount: Math.round(Number(conversion.clientBuyAmount) * 50) / 100
        })
            .then((res) => {
                utils.log('splitPreviewConversion: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('splitPreviewConversion: ' + err.toYAML() + '\n');
                } else {
                    utils.error('splitPreviewConversion:\n' + err + '\n');
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
                utils.log('splitConversion: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('splitConversion: ' + err.toYAML() + '\n');
                } else {
                    utils.error('splitConversion:\n' + err + '\n');
                }
            });
    },

    splitHistoryConversion: () => {
        return currencyCloud.conversions.splitHistory({
            id: conversion.id
        })
            .then((res) => {
                utils.log('splitHistoryConversion: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('splitHistoryConversion: ' + err.toYAML() + '\n');
                } else {
                    utils.error('splitHistoryConversion:\n' + err + '\n');
                }
            });
    },

    quoteCancelParentConversion: () => {
        return currencyCloud.conversions.cancellationQuote({
            id: split.parentConversion.id
        })
            .then((res) => {
                utils.log('quoteCancelParentConversion: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('quoteCancelParentConversion: ' + err.toYAML() + '\n');
                } else {
                    utils.error('quoteCancelParentConversion:\n' + err + '\n');
                }
            });
    },

    quoteCancelChildConversion: () => {
        return currencyCloud.conversions.cancellationQuote({
            id: split.childConversion.id
        })
            .then((res) => {
                utils.log('quoteCancelChildConversion: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('quoteCancelChildConversion: ' + err.toYAML() + '\n');
                } else {
                    utils.error('quoteCancelChildConversion:\n' + err + '\n');
                }
            });
    },

    profitAndLossConversion: () => {
        return currencyCloud.conversions.profitAndLoss({
            orderAscDesc: "desc"
        })
            .then((res) => {
                utils.log('profitAndLossConversion: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('profitAndLossConversion: ' + err.toYAML() + '\n');
                } else {
                    utils.error('profitAndLossConversion:\n' + err + '\n');
                }
            });
    },

    findFundingAccounts: () => {
        return currencyCloud.funding.findFundingAccounts({
            currency: "GBP"
        })
            .then((res) => {
                utils.log('findFundingAccounts: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('findFundingAccounts: ' + err.toYAML() + '\n');
                } else {
                    utils.error('findFundingAccounts:\n' + err + '\n');
                }
            });
    },

    findIbans: () => {
        return currencyCloud.ibans.find({})
            .then((res) => {
                utils.log('findIbans: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('findIbans: ' + err.toYAML() + '\n');
                } else {
                    utils.error('findIbans:\n' + err + '\n');
                }
            });
    },

    findPayments: () => {
        return currencyCloud.payments.find ({
            orderAscDesc: "desc"
        })
            .then((res) => {
                payment = res;
                utils.log('findPayments: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('findPayments: ' + err.toYAML() + '\n');
                } else {
                    utils.error('findPayments:\n' + err + '\n');
                }
            });
    },

    authorisePayments: () => {
        return currencyCloud.payments.authorise({
            paymentIds: [payment.payments[0].id, payment.payments[1].id, payment.payments[2].id]
        })
            .then((res) => {
                payment = res;
                utils.log('authorisePayments: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('authorisePayments: ' + err.toYAML() + '\n');
                } else {
                    utils.error('authorisePayments:\n' + err + '\n');
                }
            });
    },

    createPaymentPayer: () => {
        payment = {
            currency: "EUR",
            beneficiaryId: beneficiary.id,
            amount: Math.floor(Math.random() * 500000 + 50000) / 100,
            reason: "Invoice",
            reference: "PYMT-REF-" + Math.floor(Math.random() * 1000 + 1000),
            uniqueRequestId: uuid(),
            payerAddress: "Piazza Museo, n° 19",
            payerEntityType: "individual",
            payerCity: "Napoli",
            payerCountry: "IT",
            payerIdentificationType: "passport",
            payerIdentificationValue: "23031968",
            payerFirstName: "Francesco",
            payerLastName: "Bianco",
            payerDateOfBirth: "1968-03-23"
        };
        return currencyCloud.payments.create(payment)
            .then((res) => {
                payment = res;
                utils.log('createPaymentPayer: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('createPaymentPayer: ' + err.toYAML() + '\n');
                } else {
                    utils.error('createPaymentPayer:\n' + err + '\n');
                }
            });
    },

    createPaymentConversion: () => {
        payment = {
            currency: "EUR",
            beneficiaryId: beneficiary.id,
            amount: Math.floor(Math.random() * 500000 + 50000) / 100,
            reason: "Invoice",
            reference: "PYMT-REF-" + Math.floor(Math.random() * 1000 + 1000),
            uniqueRequestId: uuid(),
            conversionId: conversion.id
        };
        return currencyCloud.payments.create(payment)
            .then((res) => {
                payment = res;
                utils.log('createPaymentConversion: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('createPaymentConversion: ' + err.toYAML() + '\n');
                } else {
                    utils.error('createPaymentConversion:\n' + err + '\n');
                }
            });
    },

    getPayment: () => {
        return currencyCloud.payments.get({
            id: payment.id
        })
            .then((res) => {
                payment = res;
                utils.log('getPayment: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('getPayment: ' + err.toYAML() + '\n');
                } else {
                    utils.error('getPayment:\n' + err + '\n');
                }
            });
    },

    getPaymentDeliveryDate: () => {
        return currencyCloud.payments.getPaymentDeliveryDate({
            paymentDate: payment.paymentDate,
            paymentType: payment.paymentType,
            currency: payment.currency,
            bankCountry: beneficiary.bankCountry
        })
            .then((res) => {
                utils.log('getPaymentDeliveryDate: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('getPaymentDeliveryDate: ' + err.toYAML() + '\n');
                } else {
                    utils.error('getPaymentDeliveryDate:\n' + err + '\n');
                }
            });
    },

    quotePaymentFee: () => {
        return currencyCloud.payments.getQuotePaymentFee({
            paymentType: payment.paymentType,
            paymentCurrency: payment.currency,
           paymentDestinationCountry: beneficiary.bankCountry
        })
            .then((res) => {
                utils.log('quotePaymentFee: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('quotePaymentFee: ' + err.toYAML() + '\n');
                } else {
                    utils.error('quotePaymentFee:\n' + err + '\n');
                }
            });
    },

    getPaymentSubmission: () => {
        return currencyCloud.payments.retrieveSubmission({
            id: payment.id
        })
            .then((res) => {
                utils.log('getPaymentSubmission: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('getPaymentSubmission: ' + err.toYAML() + '\n');
                } else {
                    utils.error('getPaymentSubmission:\n' + err + '\n');
                }
            });
    },

    updatePayment: () => {
        return currencyCloud.payments.update({
            id: payment.id,
            reference: "PYMT-REF-" + Math.floor(Math.random() * 1000 + 1000)
        })
            .then((res) => {
                payment = res;
                utils.log('updatePayment: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('updatePayment: ' + err.toYAML() + '\n');
                } else {
                    utils.error('updatePayment:\n' + err + '\n');
                }
            });
    },

    getPaymentConfirmation: () => {
        return currencyCloud.payments.getConfirmation({
            id: payment.id
        })
            .then((res) => {
                utils.log('getPaymentConfirmation: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('getPaymentConfirmation: ' + err.toYAML() + '\n');
                } else {
                    utils.error('getPaymentConfirmation:\n' + err + '\n');
                }
            });
    },

    getPayer: () => {
        return currencyCloud.payers.get({
            id: payment.payerId
        })
            .then((res) => {
                payer = res;
                utils.log('getPayer: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('getPayer: ' + err.toYAML() + '\n');
                } else {
                    utils.error('getPayer:\n' + err + '\n');
                }
            });
    },

    findRates: () => {
        return currencyCloud.rates.find({
            ignoreInvalidPairs: true,
            currencyPair: "GBPEUR,EURGBP,GBPUSD,USDGBP,GBPCAD,CADGBP,GBPAUD,AUDGBP,FOOBAR,BAZBAR"
        })
            .then((res) => {
                utils.log('findRates: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('findRates: ' + err.toYAML() + '\n');
                } else {
                    utils.error('findRates:\n' + err + '\n');
                }
            });
    },

    getRates: () => {
        return currencyCloud.rates.get({
            buyCurrency: "EUR",
            sellCurrency: "GBP",
            fixedSide: "buy",
            amount: Math.floor(Math.random() * 500000 + 50000) / 100
        })
            .then((res) => {
                utils.log('getRates: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('getRates: ' + err.toYAML() + '\n');
                } else {
                    utils.error('getRates:\n' + err + '\n');
                }
            });
    },

    getBeneficiaryRequiredDetails: () => {
        return currencyCloud.reference.getBeneficiaryRequiredDetails({
            currency: "EUR",
            bankAccountCountry: "IT",
            beneficiaryCountry: "IT"
        })
            .then((res) => {
                utils.log('getBeneficiaryRequiredDetails: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('getBeneficiaryRequiredDetails: ' + err.toYAML() + '\n');
                } else {
                    utils.error('getBeneficiaryRequiredDetails:\n' + err + '\n');
                }
            });
    },

    getConversionDates: () => {
        return currencyCloud.reference.getConversionDates({
            conversionPair: "GBPEUR"
        })
            .then((res) => {
                utils.log('getConversionDates: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('getConversionDates: ' + err.toYAML() + '\n');
                } else {
                    utils.error('getConversionDates:\n' + err + '\n');
                }
            });
    },

    getAvailableCurrencies: () => {
        return currencyCloud.reference.getAvailableCurrencies()
            .then((res) => {
                utils.log('getAvailableCurrencies: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('getAvailableCurrencies: ' + err.toYAML() + '\n');
                } else {
                    utils.error('getAvailableCurrencies:\n' + err + '\n');
                }
            });
    },

    getPaymentDates: () => {
        return currencyCloud.reference.getPaymentDates({
            currency: "GBP"
        })
            .then((res) => {
                utils.log('getPaymentDates: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('getPaymentDates: ' + err.toYAML() + '\n');
                } else {
                    utils.error('getPaymentDates:\n' + err + '\n');
                }
            });
    },

    getSettlementAccounts: () => {
        return currencyCloud.reference.getSettlementAccounts({})
            .then((res) => {
                utils.log('getSettlementAccounts: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('getSettlementAccounts: ' + err.toYAML() + '\n');
                } else {
                    utils.error('getSettlementAccounts:\n' + err + '\n');
                }
            });
    },

    getPayerRequiredDetails: () => {
        return currencyCloud.reference.getPayerRequiredDetails({
            payerCountry: "GB",
            payerEntityType: "individual",
            paymentType: "regular"
        })
            .then((res) => {
                utils.log('getPayerRequiredDetails: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('getPayerRequiredDetails: ' + err.toYAML() + '\n');
                } else {
                    utils.error('getPayerRequiredDetails:\n' + err + '\n');
                }
            });
    },

    getPaymentPurposeCodes: () => {
        return currencyCloud.reference.getPaymentPurposeCodes({
            currency: "INR",
            bankAccountCountry: "IN"
        })
            .then((res) => {
                utils.log('getPaymentPurposeCodes: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('getPaymentPurposeCodes: ' + err.toYAML() + '\n');
                } else {
                    utils.error('getPaymentPurposeCodes:\n' + err + '\n');
                }
            });
    },

    getBankDetails: () => {
        return currencyCloud.reference.getBankDetails({
            identifierType: "iban",
            identifierValue: "GB19TCCL00997901654515"
        })
            .then((res) => {
                utils.log('getBankDetails: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('getBankDetails: ' + err.toYAML() + '\n');
                } else {
                    utils.error('getBankDetails:\n' + err + '\n');
                }
            });
    },

    getPaymentFeeRules: () => {
        return currencyCloud.reference.getPaymentFeeRules({})
            .then((res) => {
                utils.log('getPaymentFeeRules: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('getPaymentFeeRules: ' + err.toYAML() + '\n');
                } else {
                    utils.error('getPaymentFeeRules:\n' + err + '\n');
                }
            });
    },

    createConversionReport: () => {
        return currencyCloud.reports.createConversionReport({})
            .then((res) => {
                report = res;
                utils.log('createConversionReport: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('createConversionReport: ' + err.toYAML() + '\n');
                } else {
                    utils.error('createConversionReport:\n' + err + '\n');
                }
            });
    },

    createPaymentReport: () => {
        return currencyCloud.reports.createPaymentReport({})
            .then((res) => {
                report = res;
                utils.log('createPaymentReport: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('createPaymentReport: ' + err.toYAML() + '\n');
                } else {
                    utils.error('createPaymentReport:\n' + err + '\n');
                }
            });
    },

    getReportRequest: () => {
        return currencyCloud.reports.findReportViaId({
            id: report.id
        })
            .then((res) => {
                utils.log('getReportRequest: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('getReportRequest: ' + err.toYAML() + '\n');
                } else {
                    utils.error('getReportRequest:\n' + err + '\n');
                }
            });
    },

    findReportRequest: () => {
        return currencyCloud.reports.findReportRequest({})
            .then((res) => {
                utils.log('findReportRequest: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('findReportRequest: ' + err.toYAML() + '\n');
                } else {
                    utils.error('findReportRequest:\n' + err + '\n');
                }
            });
    },

    findSettlement: () => {
        return currencyCloud.settlements.find({})
            .then((res) => {
                settlement = res;
                utils.log('findSettlement: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('findSettlement: ' + err.toYAML() + '\n');
                } else {
                    utils.error('findSettlement:\n' + err + '\n');
                }
            });
    },

    createSettlement: () => {
        return currencyCloud.settlements.create({})
            .then((res) => {
                settlement = res;
                utils.log('createSettlement: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('createSettlement: ' + err.toYAML() + '\n');
                } else {
                    utils.error('createSettlement:\n' + err + '\n');
                }
            });
    },

    getSettlement: () => {
        return currencyCloud.settlements.get({
            id: settlement.id
        })
            .then((res) => {
                settlement = res;
                utils.log('getSettlement: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('getSettlement: ' + err.toYAML() + '\n');
                } else {
                    utils.error('getSettlement:\n' + err + '\n');
                }
            });
    },

    addConversionSettlement: () => {
        return currencyCloud.settlements.addConversion({
            id: settlement.id,
            conversionId: conversion.id
        })
            .then((res) => {
                settlement = res;
                utils.log('addConversionSettlement: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('addConversionSettlement: ' + err.toYAML() + '\n');
                } else {
                    utils.error('addConversionSettlement:\n' + err + '\n');
                }
            });
    },

    releaseSettlement: () => {
        return currencyCloud.settlements.release({
            id: settlement.id
        })
            .then((res) => {
                settlement = res;
                utils.log('releaseSettlement: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('releaseSettlement: ' + err.toYAML() + '\n');
                } else {
                    utils.error('releaseSettlement:\n' + err + '\n');
                }
            });
    },

    unreleaseSettlement: () => {
        return currencyCloud.settlements.unrelease({
            id: settlement.id
        })
            .then((res) => {
                settlement = res;
                utils.log('unreleaseSettlement: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('unreleaseSettlement: ' + err.toYAML() + '\n');
                } else {
                    utils.error('unreleaseSettlement:\n' + err + '\n');
                }
            });
    },

    removeConversionSettlement: () => {
        return currencyCloud.settlements.removeConversion({
            id: settlement.id,
            conversionId: conversion.id
        })
            .then((res) => {
                settlement = res;
                utils.log('removeConversionSettlement: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('removeConversionSettlement: ' + err.toYAML() + '\n');
                } else {
                    utils.error('removeConversionSettlement:\n' + err + '\n');
                }
            });
    },

    findTransactions: () => {
        return currencyCloud.transactions.find({
            orderAscDesc: "desc"
        })
            .then((res) => {
                transaction = res;
                utils.log('findTransactions: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('findTransactions: ' + err.toYAML() + '\n');
                } else {
                    utils.error('findTransactions:\n' + err + '\n');
                }
            });
    },

    getTransaction: () => {
        return currencyCloud.transactions.get({
            id: transaction.transactions[0].id
        })
            .then((res) => {
                transaction = res;
                utils.log('getTransaction: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('getTransaction: ' + err.toYAML() + '\n');
                } else {
                    utils.error('getTransaction:\n' + err + '\n');
                }
            });
    },

    getTransactionSenderDetails: () => {
        return currencyCloud.transactions.get({
            id: transaction.id
        })
            .then((res) => {
                transaction = res;
                utils.log('getTransactionSenderDetails: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('getTransactionSenderDetails: ' + err.toYAML() + '\n');
                } else {
                    utils.error('getTransactionSenderDetails:\n' + err + '\n');
                }
            });
    },

    findTransfers: () => {
        return currencyCloud.transfers.find({
            orderAscDesc: "desc"
        })
            .then((res) => {
                transfer = res;
                utils.log('findTransfers: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('findTransfers: ' + err.toYAML() + '\n');
                } else {
                    utils.error('findTransfers:\n' + err + '\n');
                }
            });
    },

    createTransfer: () => {
        transfer = {
            sourceAccountId: account.accounts[0].id,
            destinationAccountId: account.accounts[1].id,
            currency: "GBP",
            amount: Math.floor(Math.random() * 200000 + 50000) / 100,
            reason: "Transference ref: TRNF-" + Math.floor(Math.random() * 1000 + 1000)
        };
        return currencyCloud.transfers.create(transfer)
            .then((res) => {
                transfer = res;
                utils.log('createTransfer: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('createTransfer: ' + err.toYAML() + '\n');
                } else {
                    utils.error('createTransfer:\n' + err + '\n');
                }
            });
    },

    getTransfer: () => {
        return currencyCloud.transfers.get({
            id: transfer.id
        })
            .then((res) => {
                transfer = res;
                utils.log('getTransfer: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('getTransfer: ' + err.toYAML() + '\n');
                } else {
                    utils.error('getTransfer:\n' + err + '\n');
                }
            });
    },

    findVirtualAccounts: () => {
        return currencyCloud.vans.find({})
            .then((res) => {
                utils.log('findVirtualAccounts: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('findVirtualAccounts: ' + err.toYAML() + '\n');
                } else {
                    utils.error('findVirtualAccounts:\n' + err + '\n');
                }
            });
    },

    deleteSettlement: () => {
        return currencyCloud.settlements.delete({
            id: settlement.id
        })
            .then((res) => {
                utils.log('deleteSettlement: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('deleteSettlement: ' + err.toYAML() + '\n');
                } else {
                    utils.error('deleteSettlement:\n' + err + '\n');
                }
            });
    },

    deletePayment: () => {
        return currencyCloud.payments.delete({
            id: payment.id
        })
            .then((res) => {
                utils.log('deletePayment: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('deletePayment: ' + err.toYAML() + '\n');
                } else {
                    utils.error('deletePayment:\n' + err + '\n');
                }
            });
    },

    cancelChildConversion: () => {
        return currencyCloud.conversions.cancel({
            id: split.childConversion.id,
            notes: "Reversing transaction - Child"
        })
            .then((res) => {
                utils.log('cancelChildConversion: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('cancelChildConversion: ' + err.toYAML() + '\n');
                } else {
                    utils.error('cancelChildConversion:\n' + err + '\n');
                }
            });
    },

    cancelParentConversion: () => {
        return currencyCloud.conversions.cancel({
            id: split.parentConversion.id,
            notes: "Reversing transaction - Parent"
        })
            .then((res) => {
                utils.log('cancelParentConversion: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('cancelParentConversion: ' + err.toYAML() + '\n');
                } else {
                    utils.error('cancelParentConversion:\n' + err + '\n');
                }
            });
    },

    deleteBeneficiary: () => {
        return currencyCloud.beneficiaries.delete({
            id: beneficiary.id
        })
            .then((res) => {
                utils.log('deleteBeneficiary: ' + JSON.stringify(res, null, 2) + '\n');
            })
            .catch((err) => {
                if (err instanceof currencyCloud.APIerror) {
                    utils.apiError('deleteBeneficiary: ' + err.toYAML() + '\n');
                } else {
                    utils.error('deleteBeneficiary:\n' + err + '\n');
                }
            });
    },
};

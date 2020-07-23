/*
 * Copyright (c) 2019. Ed Addario. All rights reserved.
 */
'use strict';

const currencyCloud = require('currency-cloud');
const api = require('./lib/api');
const utils = require('./lib/utils');

const credentials = {
    loginId: process.argv[2],
    apiKey: process.argv[3]
};

api.login(credentials)
    .then(api.currentAccount)
    .then(api.accountCreate)
    .then(api.retrieveAccount)
    .then(api.updateAccount)
    .then(api.getPaymentCharges)
    .then(api.updatePaymentCharges)
    .then(api.findAccounts)
    .then(api.findBalances)
    .then(api.getBalance)
    .then(api.topUpMarginBalance)
    .then(api.findBeneficiaries)
    .then(api.validateBeneficiary)
    .then(api.createBeneficiary)
    .then(api.getBeneficiary)
    .then(api.updateBeneficiary)
    .then(api.findContacts)
    .then(api.currentContact)
    .then(api.createContact)
    .then(api.updateContact)
    .then(api.getContact)
    .then(api.findConversions)
    .then(api.createConversion)
    .then(api.getConversion)
    .then(api.quoteDateChangeConversion)
    .then(api.dateChangeConversion)
    .then(api.splitPreviewConversion)
    .then(api.splitConversion)
    .then(api.splitHistoryConversion)
    .then(api.quoteCancelParentConversion)
    .then(api.quoteCancelChildConversion)
    .then(api.profitAndLossConversion)
    .then(api.findFundingAccounts)
    .then(api.findIbans)
    .then(api.findPayments)
    .then(api.authorisePayments)
    .then(api.createPaymentPayer)
    .then(api.createPaymentConversion)
    .then(api.getPayment)
    .then(api.getPaymentSubmission)
    .then(api.updatePayment)
    .then(api.getPaymentConfirmation)
    .then(api.getPayer)
    .then(api.findRates)
    .then(api.getRates)
    .then(api.getBeneficiaryRequiredDetails)
    .then(api.getConversionDates)
    .then(api.getAvailableCurrencies)
    .then(api.getPaymentDates)
    .then(api.getSettlementAccounts)
    .then(api.getPayerRequiredDetails)
    .then(api.getPaymentPurposeCodes)
    .then(api.getPaymentFeeRules)
    .then(api.getBankDetails)
    .then(api.createConversionReport)
    .then(api.createPaymentReport)
    .then(api.getReportRequest)
    .then(api.findReportRequest)
    .then(api.findSettlement)
    .then(api.createSettlement)
    .then(api.getSettlement)
    .then(api.addConversionSettlement)
    .then(api.releaseSettlement)
    .then(api.unreleaseSettlement)
    .then(api.removeConversionSettlement)
    .then(api.findTransactions)
    .then(api.getTransaction)
    .then(api.getTransactionSenderDetails)
    .then(api.findTransfers)
    .then(api.createTransfer)
    .then(api.getTransfer)
    .then(api.findVirtualAccounts)
    .then(api.deleteSettlement)
    .then(api.deletePayment)
    .then(api.cancelChildConversion)
    .then(api.cancelParentConversion)
    .then(api.deleteBeneficiary)
    .then(api.logout)
    .catch((err) => {
        if (err instanceof currencyCloud.APIerror) {
            utils.apiError('all-requests: ' + err.toYAML() + '\n');
        } else {
            utils.error('all-requests:\n' + err + '\n');
        }
    });

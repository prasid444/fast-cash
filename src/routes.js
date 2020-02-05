/* eslint-disable prettier/prettier */
import React from 'react';

import LoginPage from './pages/login';
import SendMoneyPage from './pages/send_money';
import HomePage from './pages/home';
import ContactListPage from './pages/contacts_list';
import QrScannerPage from './pages/qr_scanner';
import PinEnterPage from './pages/pin_enter';
import TransactionDetail from './pages/transaction_detail';
import TransactionListPage from './pages/transaction_list';

export const defaultRoute='/landing';
export const defaultWorkspaceRoute='/workspaces';
export const defaultHomepageRoute='/home'

export default {
  '/landing': {
    requireAuth: false,
    component: LoginPage,
  },
  '/home':{
    requireAuth: false,
    component: HomePage,
  },
  '/send_money':{
    requireAuth: false,
    component: SendMoneyPage,
  },
  '/contacts':{
    requireAuth: false,
    component: ContactListPage,
  },
  '/scan':{
    requireAuth:false,
    component:QrScannerPage
  },
  '/pin-enter':{
    requireAuth:false,
    component:PinEnterPage
  },
  '/transactiondetails':{
    requireAuth:false,
    component:TransactionDetail
  },
  '/transactionlist':{
    requireAuth:false,
    component:TransactionListPage
  }
};

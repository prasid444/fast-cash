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
import ReceiveMoneyPage from './pages/request_money';
import MPINSetupPage from './pages/mpin_setup';
import SettingPage from './pages/setting_page';
import MPinEnterPage from './pages/mpin_enter';

export const defaultRoute='/landing';
export const defaultWorkspaceRoute='/workspaces';
export const defaultHomepageRoute='/home'

export default {
  '/landing': {
    requireAuth: false,
    component: LoginPage,
  },
  '/pin-enter':{
    requireAuth:false,
    component:PinEnterPage
  },
  '/home':{
    requireAuth: true,
    component: HomePage,
  },
  '/send_money':{
    requireAuth: true,
    component: SendMoneyPage,
  },
  '/request_money':{
    requireAuth: true,
    component: ReceiveMoneyPage,
  },
  '/confirm-transaction':{
    requireAuth: true,
    component: MPinEnterPage,
  },
  '/contacts':{
    requireAuth: true,
    component: ContactListPage,
  },
  '/scan':{
    requireAuth:true,
    component:QrScannerPage
  },
  '/transactiondetails':{
    requireAuth:true,
    component:TransactionDetail
  },
  '/transactionlist':{
    requireAuth:true,
    component:TransactionListPage
  },
  '/set_mpin':{
    requireAuth:true,
    component:MPINSetupPage
  },
  '/setting':{
    requireAuth:true,
    component:SettingPage
  }
};

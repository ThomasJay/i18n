import React from 'react';
import {View, Text, Platform, NativeModules} from 'react-native';

/**
* @author
* @function I18N

**/

const defaultLanguage = 'en';

let languageResource = {};

let deviceLanguage =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale
    : NativeModules.I18nManager.localeIdentifier;

if (deviceLanguage === undefined) {
  // iOS 13 workaround, take first of AppleLanguages array
  deviceLanguage = NativeModules.SettingsManager.settings.AppleLanguages[0];
  if (deviceLanguage === undefined) {
    deviceLanguage = defaultLanguage; // default language
  }
}

switch (deviceLanguage) {
  case 'en':
    languageResource = require('../languages/en.json');
    break;
  default:
    console.log('No Language found!!!!!');
    break;
}

console.log('deviceLanguage=' + deviceLanguage);

const I18N = key => {
  if (languageResource[key]) {
    return languageResource[key];
  } else {
    return '??';
  }
};

export default I18N;

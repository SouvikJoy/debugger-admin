import { defineRule } from 'vee-validate';
import AllRules from '@vee-validate/rules';

/**
 * @param {String|String[]} rules
 */
const initRule = (rules) => {
  if (typeof rules === 'string') {
    rules = [rules];
  }

  rules.forEach(rule => {
    if (!AllRules[rule]) {
      throw new Error(`No rule found named "${rule}"`);
    }
    defineRule(rule, AllRules[rule]);
  });
};
export {
  initRule
};

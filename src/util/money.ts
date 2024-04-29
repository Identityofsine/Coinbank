export const printMoney = (money: number) => Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(money);

export const moneyRegex = /^(?!\$?(([1-9](\d*|\d{0,2}(,\d{3})*))|0)(\.\d{1,2})?$).*$/;

export const moneyTest = (value: string) => moneyRegex.test(value);



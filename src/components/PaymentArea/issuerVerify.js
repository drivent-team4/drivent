export default function issuerVerify(cardNumber) {
  console.log(cardNumber);
  let issuer;
  const visaRegex = /^4/;
  const mastercardRegex = /^5[1-5]/;
  const amexRegex = /^3[47]/;
  const discoverRegex = /^(6011|65|64[4-9])/;

  if (visaRegex.test(cardNumber)) issuer = 'visa';
  if (mastercardRegex.test(cardNumber)) issuer = 'mastercard';
  if (amexRegex.test(cardNumber)) issuer = 'amex';
  if (discoverRegex.test(cardNumber)) issuer = 'visa';

  return issuer;
}

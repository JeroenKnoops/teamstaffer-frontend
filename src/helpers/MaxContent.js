import vendorPrefix from './VendorPrefix';

const maxContent = () => {
  // Yes, it looks ugly, but...
  // Chrome gets -webkit as vendor prefix, but it actually already implements max-content
  // and so it does not need one. Adding -webkit vendor prefix will make chrome not understanding it.
  // For this reason, we do return the prefixed version for all other browsers but not for Chrome.
  const userAgent = window.navigator.userAgent;
  if (userAgent.indexOf("Chrome") > -1 || (userAgent.indexOf("Firefox/") > -1 && userAgent.indexOf("Seamonkey/") === -1)) {
    return 'max-content';
  }

  return `${vendorPrefix}max-content`;
}

export default maxContent;

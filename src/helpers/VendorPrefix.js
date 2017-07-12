let vendorPrefix = '';

if (typeof window !== 'undefined') {
  const styles = window.getComputedStyle(document.documentElement);

  const prefixString = Array.prototype.slice.call(styles).join('');
  const standardPrefixString = prefixString.match(/-(moz|webkit|ms)-/);
  const operaPrefixString = prefixString.match(styles.OLink === '' && ['', 'o']);
  const prefixMatch = standardPrefixString || operaPrefixString;

  const prefix = prefixMatch ? prefixMatch[1] : '';

  if (prefix !== '') {
    vendorPrefix = `-${prefix}-`;
  }
}

export default vendorPrefix;

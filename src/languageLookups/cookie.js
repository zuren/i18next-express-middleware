import Cookies from 'cookies';

export default {
  name: 'cookie',

  lookup(req, res, options) {
    let found;

    if (options.lookupCookie && typeof req !== 'undefined') {
      if (req.cookies) {
        found = req.cookies[options.lookupCookie];
      } else {
        const cookies = new Cookies(req, res);
        found = cookies.get(options.lookupCookie);
      }
    }

    return found;
  },

  cacheUserLanguage(req, res, lng, options = {}) {
    if (options.lookupCookie && req !== 'undefined') {
      const cookies = new Cookies(req, res);

      let expirationDate = options.cookieExpirationDate;
      if (!expirationDate) {
        expirationDate = new Date();
        expirationDate.setFullYear(expirationDate.getFullYear() + 1);
      }

      cookies.set(options.lookupCookie, lng, { expires: expirationDate, domain: options.cookieDomain, httpOnly : false });
    }
  }
};

export const environment = {
  production: false,
  services: {
    emailServer: {
      baseUri: 'https://api.angular-email.com',
      get signup() {
        return this.baseUri + '/auth/signup';
      },
      get signedin() {
        return this.baseUri + '/auth/signedin';
      },
      get signin() {
        return this.baseUri + '/auth/signin';
      },
      get validateUsername() {
        return this.baseUri + '/auth/username';
      },
      get signout() {
        return this.baseUri + '/auth/signout';
      },

      get listAllEmails() {
        return this.baseUri + '/emails';
      },
    },
  },

  config: {
    authService: {
      initialAuthStatus: <boolean | null>null,
    },
  },
};

module.exports = {
    development: {
      app: {
        port: process.env.PORT || 1234
      },
      samlify: {
        saml: {
          callbackUrl: process.env.SAML_CALLBACK_URL || 'https://e8ffa44eb4b9.ngrok.io/login/callback',
          entityID: process.env.SAML_ENTITY || 'reactonexpress',
          metadata: process.env.METADATA || '../adMetadata/react-on-express.xml'

        }
      }
      
    }
  };
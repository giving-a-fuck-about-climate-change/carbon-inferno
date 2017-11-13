export default function () {
  if (process.env.NODE_ENV === 'production') {
    const analytics = require('universal-ga'); //eslint-disable-line
    analytics.initialize('UA-02768398-1', 'send');
    // sign up stuff
    document.write(
      '<script src="//load.sumome.com/" data-sumo-site-id="218d447ffc47e0e1d9bcf2ec3c2fe1a6f219761eed4cd1980142b9f9d7a5cd5c" async="async"></script>',
    );
  }
}

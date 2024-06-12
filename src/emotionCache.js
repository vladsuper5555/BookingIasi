import createCache from '@emotion/cache';

const nonceValue = 'PLACEHOLDER';

const cache = createCache({
  key: 'my-prefix',
  nonce: nonceValue,
});

export default cache;
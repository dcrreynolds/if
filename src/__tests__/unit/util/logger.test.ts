import {Logger} from 'winston';

import {logger} from '../../../util/logger';

describe('util/logger: ', () => {
  describe('logger(): ', () => {
    it('is instance of winston logger.', () => {
      expect(logger).toBeInstanceOf(Logger);
    });
  });
});

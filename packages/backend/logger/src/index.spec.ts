import { CustomLogger } from './index';

it('Test that the logger prints out the custom startup message', () => {
  const logger = new CustomLogger();
  let log = jest.spyOn(logger, 'log');
  logger.customLog();
  expect(log).toHaveBeenCalledWith('This is the custom log!');
});

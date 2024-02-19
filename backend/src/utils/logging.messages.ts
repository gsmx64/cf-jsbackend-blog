/**
 * Utility class for logging messages.
 */
export class LoggingMessages {
  /**
   * Logs a message with the specified code and optional data.
   * @param message - The message to be logged.
   * @param code - The code associated with the message.
   * @param dataForLog - Optional data to be included in the log.
   */
  public static log(message: any, code: string, dataForLog=null) {
    try {
      if(
          (process.env.NODE_ENV.trim() != 'production') &&
          (String(process.env.APP_LOGGING_ENABLE) === 'true')
      ) {
    
        var repeat = '-';
        var decor = repeat.repeat(96);
        const user: string = (dataForLog != null) ? `User: ${dataForLog.user}` : 'User: Undefined';
        const rol: string = (dataForLog != null) ? ` - Role: ${dataForLog.role}` : ' - Role: Undefined';

        const datetime = ` - Date/Time: ${new Date(Date.now()).toLocaleString()}`;

        console.log(` \n${decor}\n >>> LOGGING RETURN: ${code}\n${decor}\n` + 
                    ` >>> ${user}${rol}${datetime}\n${decor}`);
        console.log(message);
        console.log(`${decor} \n`);
      }
    } catch(error) {
      console.log(error);
    }
  }
}
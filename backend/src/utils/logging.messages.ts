import { useToken } from "./use.token";

export class LoggingMessages {
  public static log(message: any, code: string, currentToken=null) {
    try {
      if(
          (process.env.NODE_ENV.trim() != 'production') &&
          (String(process.env.LOGGING_ENABLE) === 'true')
      ) {
    
        var repeat = '-';
        var decor = repeat.repeat(96);
        const manageToken: any = (currentToken != null) ? useToken(currentToken) : null;
        const user = (currentToken != null) ? `User: ${manageToken.sub}` : 'User: Undefined';
        const rol = (currentToken != null) ? ` - Role: ${manageToken.role}` : ' - Role: Undefined';

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

import app from './app';
import { AppConfig } from './config';

app.listen(AppConfig.applicationPort, () => {
  console.log(`[server]: server started at ${AppConfig.applicationPort}`);
});

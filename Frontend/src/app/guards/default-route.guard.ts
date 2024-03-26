import { CanActivateFn, Router } from '@angular/router';
import { SettingsService } from '../components/services/settings.service';

export const defaultRouteGuard: CanActivateFn = (route, state) => {
  const settingsService = new SettingsService();
  const router = new Router();

  if(settingsService.getUnused()) {
    return true;
  } else {
    router.navigate(['/contact']);
    return false;
  }
};

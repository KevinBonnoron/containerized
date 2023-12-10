import { inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

const recursivelyGetTitle = (activatedRouteSnapShot: ActivatedRouteSnapshot): string | null => {
  const title = activatedRouteSnapShot.data['title'];
  if (title) {
    return title;
  }

  if (activatedRouteSnapShot.children.length) {
    return recursivelyGetTitle(activatedRouteSnapShot.children[0]);
  }

  return null;
}

export const titleResolver = (activatedRouteSnapShot: ActivatedRouteSnapshot) => {
  const translateService = inject(TranslateService);
  const ngTitle = inject(Title);

  const title = translateService.instant(recursivelyGetTitle(activatedRouteSnapShot) ?? 'Default');
  ngTitle.setTitle(title);

  return title;
}

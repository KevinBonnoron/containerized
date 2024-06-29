import { CanMatchFn, defaultUrlMatcher, UrlSegmentGroup } from '@angular/router';

export const isNumberMatcher = (parameterName: string): CanMatchFn => {
  return (route, segments) => {
    const matcher = route.matcher || defaultUrlMatcher;
    const { posParams = {} } = matcher(
      segments,
      new UrlSegmentGroup(segments, {}),
      route
    ) ?? {};

    // Should not happend
    if (!(parameterName in posParams)) {
      return false;
    }

    return `${parseInt(posParams[parameterName].path)}` === posParams[parameterName].path;
  }
}

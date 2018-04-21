/**
 * Created by livia on 2018/4/19.
 */
export const Subs = new SubsManager({
  // will be cached only 45 recently used subscriptions
  cacheLimit: 99,
  // any subscription will be expired after 10 minutes of inactivity
  expireIn: 10
});

// Subs.subscribe('system');

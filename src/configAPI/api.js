const API_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJhNGU1OTBlMC1hMTIwLTAxM2QtZjBlNS0wYWY2MzhlNGMzOTIiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNzM0NzEzNTE1LCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6Ii0yOTIyYzljMS0yYmYwLTQyMjYtOGJkNi0zYzZiZjY2ZjRkOTMifQ.rtndrnVg5ZgUwPMctVpwg2IbKlopg8puQiKJH85okzA";
export const API_CONFIG = {
  API_KEY:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJhNGU1OTBlMC1hMTIwLTAxM2QtZjBlNS0wYWY2MzhlNGMzOTIiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNzM0NzEzNTE1LCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6Ii0yOTIyYzljMS0yYmYwLTQyMjYtOGJkNi0zYzZiZjY2ZjRkOTMifQ.rtndrnVg5ZgUwPMctVpwg2IbKlopg8puQiKJH85okzA",
  BASE_URL: "https://api.pubg.com/shards/psn/",
  HEADERS: {
    Accept: "application/vnd.api+json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

export default API_CONFIG;
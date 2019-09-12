

export const environment = {
  production: true,
  // 1Authority config
  client_id: 'rpp-post-login-boilerplate',
  scope: 'openid profile UserProfile rpp-post-login-boilerplate-api 1RPPPolicyServerApi 1AuthorityApi',
  response_type: 'id_token token',
  authority: 'http://104.45.158.75:8035/',
  redirect_uri: 'http://localhost:4200/',
  acr_values: 'tenant:2A3DF6F5-9D38-44BD-B5D7-98DD6A1CE514',
  // Policy server config
  policy_url: 'http://104.45.158.75:8036/api/userPolicy',
  policy_name: 'rpp-post-login-boilerplate-policy',
  cmsUrl: 'http://172.16.3.131:8080/api/v1/post-login/graphql',
  apiUrl: 'http://104.45.158.75:8044/api/',
  ui_locales: 'en-US',
  siteId: '54e834bd26114c79a834bd26116c7908',
  defaultLanguageCode: 'en',
  baseUrl: 'http://104.45.158.75:8044/api/',
  backchannelUrl: 'http://104.45.158.75:8045/api/',
};

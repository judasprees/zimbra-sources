
- Create "openidconsumer" directory under /opt/zimbra/lib/ext


- Copy "openidconsumer.jar" to /opt/zimbra/lib/ext/openidconsumer directory


- Copy "openid4java-0.9.5.jar" to /opt/zimbra/jetty/common/lib directory


- Copy "formredirection.jsp" file to /opt/zimbra/jetty/webapps/zimbra/public directory


- Configure allowed OpenID Provider URLs for the domain:

    zmprov md <domain> +zimbraOpenidConsumerAllowedOPEndpointURL <op_endpoint_url>

    e.g.

      zmprov md <domain> +zimbraOpenidConsumerAllowedOPEndpointURL https://open.login.yahooapis.com/openid/op/auth


- If the zimbraOpenidConsumerStatelessModeEnabled server attribute is set to FALSE (TRUE by default), setup memcached


- zmmaiboxdctl restart


- To associate/link an "open id" with a user's account (to provision OpenID-based login in future) when the user is
  already logged-in into Zimbra web client, browse to:

    <zimbra_host_base_url>/service/extension/openid/consumer?openid_identifier=<user-supplied-identifier>

    e.g.

      <zimbra_host_base_url>/service/extension/openid/consumer?openid_identifier=yahoo.com

  You should end up with a "Success" page. Essentially, this step results in the "open id" being added to account's
  zimbraForeignPrincipal attribute.

  OpenID Consumer tries to discover the OpendID Provider Endpoint URL using the user-supplied-identifier. If the
  discovery process fails to discover any endpoints then the user-supplied-identifier is assumed to be the OpenID
  Provider Endpoint URL.


- To initiate OpenID-based login (instead of the usual username/password-based login), again browse to:

    <zimbra_host_base_url>/service/extension/openid/consumer?openid_identifier=<user-supplied-identifier>
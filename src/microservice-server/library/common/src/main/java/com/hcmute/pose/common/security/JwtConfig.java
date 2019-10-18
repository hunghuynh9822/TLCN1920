package com.hcmute.pose.common.security;

import org.springframework.beans.factory.annotation.Value;

import java.util.ArrayList;
import java.util.List;

public class JwtConfig {
    @Value("${security.jwt.uris:/auth/**,/oauth2**}")
    private String[] uris;

    @Value("${security.jwt.header:Authorization}")
    private String header;

    @Value("${security.jwt.prefix:Bearer }")
    private String prefix;

    @Value("${security.jwt.expiration:#{24*60*60}}")
    private int expiration;

    @Value("${security.jwt.secret:JwtSecretKey}")
    private String secret;

    @Value("#{'${security.oauth2.authorizedRedirectUris:http://localhost:3000/oauth2/redirect}'.split(',')}")
    private List<String> authorizedRedirectUris = new ArrayList<>();

    public String[] getUris() {
        return uris;
    }

    public String getHeader() {
        return header;
    }

    public String getPrefix() {
        return prefix;
    }

    public int getExpiration() {
        return expiration;
    }

    public String getSecret() {
        return secret;
    }

    public List<String> getAuthorizedRedirectUris() {
        return authorizedRedirectUris;
    }
}

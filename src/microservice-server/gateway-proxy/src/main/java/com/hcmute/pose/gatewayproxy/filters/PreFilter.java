package com.hcmute.pose.gatewayproxy.filters;

import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cloud.netflix.zuul.filters.support.FilterConstants;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.servlet.http.HttpServletRequest;

import static com.hcmute.pose.common.security.AuthCommon.USER_ID_HEADER;

public class PreFilter extends ZuulFilter {
    private static final Logger LOGGER = LoggerFactory.getLogger(PreFilter.class);
    @Override
    public String filterType() {
        return FilterConstants.PRE_TYPE;
    }

    @Override
    public int filterOrder() {
        return 1;
    }

    @Override
    public boolean shouldFilter() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication != null && authentication.getPrincipal() != null;
    }

    @Override
    public Object run() {
        RequestContext requestContext = RequestContext.getCurrentContext();
        HttpServletRequest request = requestContext.getRequest();
        LOGGER.info("Request Method : " + request.getMethod() + " Request URL : " + request.getRequestURL().toString());
        if(SecurityContextHolder.getContext().getAuthentication().getPrincipal().equals("anonymousUser")){
            return null;
        }
        requestContext.addZuulRequestHeader(USER_ID_HEADER, (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        return null;
    }
}
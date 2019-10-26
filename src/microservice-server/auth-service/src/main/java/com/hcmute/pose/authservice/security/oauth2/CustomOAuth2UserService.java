package com.hcmute.pose.authservice.security.oauth2;

import com.hcmute.pose.authservice.dao.RoleDao;
import com.hcmute.pose.authservice.dao.UserDao;
import com.hcmute.pose.authservice.exception.OAuth2AuthenticationProcessingException;
import com.hcmute.pose.authservice.model.UserModel;
import com.hcmute.pose.authservice.security.UserPrincipal;
import com.hcmute.pose.authservice.security.oauth2.user.OAuth2UserInfo;
import com.hcmute.pose.authservice.security.oauth2.user.OAuth2UserInfoFactory;
import com.hcmute.pose.common.security.AuthProvider;
import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.database.connector.helper.DatabaseHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.sql.SQLException;
import java.util.Optional;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
    private static Logger LOGGER = LoggerFactory.getLogger(CustomOAuth2UserService.class);
    @Autowired
    private UserDao userDao;
    @Autowired
    private RoleDao roleDao;

    @Autowired
    private DatabaseHelper databaseHelper;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);
        try {
            return processOAuth2User(oAuth2UserRequest, oAuth2User);
        } catch (AuthenticationException ex) {
            throw ex;
        } catch (Exception | TransactionException ex) {
            // Throwing an instance of AuthenticationException will trigger the OAuth2AuthenticationFailureHandler
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) throws SQLException, TransactionException {
        OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(oAuth2UserRequest.getClientRegistration().getRegistrationId(), oAuth2User.getAttributes());
        if(StringUtils.isEmpty(oAuth2UserInfo.getEmail())) {
            throw new OAuth2AuthenticationProcessingException("Email not found from OAuth2 provider");
        }
        Optional<UserModel> userOptional = userDao.getUserForLogin(oAuth2UserInfo.getEmail());
        UserModel user;
        if(userOptional.isPresent()) {
            user = userOptional.get();
            user.setRoles(roleDao.getRoleUser(user.getId()));
            if(!user.getProvider().equals(AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()))) {
                user = updateExistingUser(user, oAuth2UserRequest, oAuth2UserInfo);
            }
        } else {
            throw new OAuth2AuthenticationProcessingException("Can't find user with email " + oAuth2UserInfo.getEmail());
        }
        return UserPrincipal.create(user, oAuth2User.getAttributes());
    }

    private UserModel updateExistingUser(UserModel existingUser,OAuth2UserRequest oAuth2UserRequest, OAuth2UserInfo oAuth2UserInfo) throws SQLException, TransactionException {
        try {
            databaseHelper.beginTransaction();
            existingUser.setProvider(AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()));
            existingUser.setProviderId(oAuth2UserInfo.getId());
            existingUser.setOauth2Name(oAuth2UserInfo.getName());
            existingUser.setImageUrl(oAuth2UserInfo.getImageUrl());
            userDao.updateUser(existingUser);
            databaseHelper.commit();
            return existingUser;
        } catch (SQLException | TransactionException e) {
            LOGGER.error("[updateExistingUser] GOT EXCEPTION : ",e);
            throw e;
        } finally {
            databaseHelper.closeConnection();
        }
    }

}

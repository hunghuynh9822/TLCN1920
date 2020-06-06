package com.hcmute.pose.webhook.service.impl;

import com.hcmute.pose.webhook.dao.WebHookDao;
import com.hcmute.pose.webhook.service.WebHookService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WebHookServiceImpl implements WebHookService {
    private static Logger LOGGER = LoggerFactory.getLogger(WebHookServiceImpl.class);
    @Autowired
    private WebHookDao webHookDao;
}

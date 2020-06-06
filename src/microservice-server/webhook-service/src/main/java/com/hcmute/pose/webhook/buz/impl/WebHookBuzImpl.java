package com.hcmute.pose.webhook.buz.impl;

import com.hcmute.pose.database.connector.helper.DatabaseHelper;
import com.hcmute.pose.webhook.buz.WebHookBuz;
import com.hcmute.pose.webhook.service.WebHookService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WebHookBuzImpl implements WebHookBuz {
    private static Logger LOGGER = LoggerFactory.getLogger(WebHookBuzImpl.class);
    @Autowired
    private DatabaseHelper databaseHelper;
    @Autowired
    private WebHookService webHookService;
}

package com.hcmute.pose.wiki.buz.impl;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.database.connector.helper.DatabaseHelper;
import com.hcmute.pose.wiki.buz.WikiBuz;
import com.hcmute.pose.wiki.model.WikiPage;
import com.hcmute.pose.wiki.model.WikiState;
import com.hcmute.pose.wiki.payload.request.WikiRequest;
import com.hcmute.pose.wiki.payload.response.WikiResponse;
import com.hcmute.pose.wiki.service.WikiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WikiBuzImpl implements WikiBuz {
    @Autowired
    private WikiService wikiService;
    @Autowired
    private DatabaseHelper databaseHelper;

    @Override
    public WikiResponse createWiki(WikiRequest wikiRequest) throws Exception, TransactionException {
        try {
            databaseHelper.beginTransaction();
            String title = wikiRequest.getTitle();
            Long projectId = wikiRequest.getProjectId();
            Long createdUser = wikiRequest.getCreatedUser();
            String path = wikiRequest.getPath();
            String content = wikiRequest.getContent();
            WikiPage wikiPage = wikiService.createWikiPage(title, projectId, createdUser, path, content, WikiState.ACTIVE);
            databaseHelper.commit();
            WikiResponse wikiResponse = new WikiResponse();
            wikiResponse.setId(wikiPage.getId());
            return wikiResponse;
        } finally {
            databaseHelper.closeConnection();
        }
    }
}

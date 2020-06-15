package com.hcmute.pose.wiki.buz.impl;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.database.connector.helper.DatabaseHelper;
import com.hcmute.pose.wiki.buz.WikiBuz;
import com.hcmute.pose.wiki.model.WikiPage;
import com.hcmute.pose.wiki.model.WikiState;
import com.hcmute.pose.wiki.payload.request.WikiRequest;
import com.hcmute.pose.wiki.payload.response.ListWikiResponse;
import com.hcmute.pose.wiki.payload.response.WikiResponse;
import com.hcmute.pose.wiki.service.WikiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

    @Override
    public ListWikiResponse getWiki(Long id, Long projectId, String path) throws Exception {
        try {
            if(id != null) {
                WikiPage wikiPage = wikiService.getWikiPage(id);
                return getListResponse(new ArrayList<WikiPage>(){{
                    add(wikiPage);
                }});
            }
            if(projectId != null) {
                List<WikiPage> wikiPages = wikiService.getWikiPageByProject(projectId);
                return getListResponse(wikiPages);
            }
            if(!StringUtils.isEmpty(path)) {
                List<WikiPage> wikiPages =  wikiService.getWikiPageByPath(path);
                return getListResponse(wikiPages);
            }
            return getListResponse(wikiService.getWikiPages());
        } finally {
            databaseHelper.closeConnection();
        }
    }

    private ListWikiResponse getListResponse(List<WikiPage> wikiPages) {
        if(wikiPages == null || wikiPages.isEmpty()) {
            return new ListWikiResponse();
        }
        ListWikiResponse listWikiResponse = new ListWikiResponse();
        for (WikiPage wikiPage : wikiPages
        ) {
            WikiResponse wikiResponse = new WikiResponse(wikiPage.getId(), wikiPage.getTitle(), wikiPage.getProjectId(),
                    wikiPage.getCreatedUser(), wikiPage.getPath(), wikiPage.getContent(), wikiPage.getState(),
                    wikiPage.getCreatedAt(), wikiPage.getUpdatedAt());
            listWikiResponse.add(wikiResponse);
        }
        return listWikiResponse;
    }
}

package com.hcmute.pose.wiki.buz;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.wiki.payload.request.WikiRequest;
import com.hcmute.pose.wiki.payload.response.ListWikiResponse;
import com.hcmute.pose.wiki.payload.response.WikiResponse;

public interface WikiBuz {
    WikiResponse createWiki(WikiRequest wikiRequest) throws Exception, TransactionException;

    ListWikiResponse getWiki(Long id, Long projectId, String path) throws Exception;
}

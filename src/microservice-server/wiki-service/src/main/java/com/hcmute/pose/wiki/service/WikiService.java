package com.hcmute.pose.wiki.service;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.wiki.model.WikiPage;
import com.hcmute.pose.wiki.model.WikiState;

import java.sql.SQLException;
import java.util.List;

public interface WikiService {
    WikiPage createWikiPage(String title, Long projectId, Long createdUser, String path, String content, WikiState state) throws Exception, TransactionException;
    void updateWikiPage(Long id, String title, String content) throws SQLException, TransactionException;
    void deleteWikiPage(Long id) throws SQLException, TransactionException;
    WikiPage getWikiPage(Long id) throws Exception;
    List<WikiPage> getWikiPageByProject(Long projectId) throws SQLException;
    List<WikiPage> getWikiPageByPath(String path) throws SQLException;
    List<WikiPage> getWikiPages() throws SQLException;
}

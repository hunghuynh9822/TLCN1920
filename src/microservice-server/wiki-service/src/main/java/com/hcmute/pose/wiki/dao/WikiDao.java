package com.hcmute.pose.wiki.dao;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.wiki.model.WikiPage;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

public interface WikiDao {
    Optional<Long> getLastID();
    void createWikiPage(WikiPage wikiPage) throws SQLException, TransactionException;
    void updateWikiPage(WikiPage wikiPage) throws SQLException, TransactionException;
    void deleteWikiPage(Long id) throws SQLException, TransactionException;
    Optional<WikiPage> selectWikiPage(Long id) throws SQLException;
    Optional<WikiPage> selectWikiPageByProject(Long id) throws SQLException;
    List<WikiPage> selectWikiPageByPath(String path) throws SQLException;
}

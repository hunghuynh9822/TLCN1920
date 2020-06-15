package com.hcmute.pose.wiki.service.impl;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.wiki.dao.WikiDao;
import com.hcmute.pose.wiki.model.WikiPage;
import com.hcmute.pose.wiki.model.WikiState;
import com.hcmute.pose.wiki.service.WikiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;

@Service
public class WikiServiceImpl implements WikiService {
    @Autowired
    private WikiDao wikiDao;

    @Override
    public WikiPage createWikiPage(String title, Long projectId, Long createdUser, String path, String content, WikiState state) throws Exception, TransactionException {
        Long id = wikiDao.getLastID().orElseThrow(() -> new Exception("Not found id wiki"));
        WikiPage wikiPage = new WikiPage();
        wikiPage.setId(id);
        wikiPage.setTitle(title);
        wikiPage.setProjectId(projectId);
        wikiPage.setCreatedUser(createdUser);
        wikiPage.setPath(path);
        wikiPage.setContent(content);
        wikiPage.setState(state);
        wikiDao.createWikiPage(wikiPage);
        return wikiPage;
    }

    @Override
    public void updateWikiPage(Long id, String title, String content) throws SQLException, TransactionException {
        WikiPage wikiPage = new WikiPage();
        wikiPage.setId(id);
        wikiPage.setTitle(title);
        wikiPage.setContent(content);
        wikiDao.updateWikiPage(wikiPage);
    }

    @Override
    public void deleteWikiPage(Long id) throws SQLException, TransactionException {
        wikiDao.deleteWikiPage(id);
    }

    @Override
    public WikiPage getWikiPage(Long id) throws Exception {
        return wikiDao.selectWikiPage(id).orElseThrow(() -> new Exception("Not found wiki with id " + id));
    }

    @Override
    public List<WikiPage> getWikiPageByProject(Long projectId) throws SQLException {
        return wikiDao.selectWikiPageByProject(projectId);
    }

    @Override
    public List<WikiPage> getWikiPageByPath(String path) throws SQLException {
        return wikiDao.selectWikiPageByPath(path);
    }

    @Override
    public List<WikiPage> getWikiPages() throws SQLException {
        return wikiDao.selectAllWiki();
    }
}

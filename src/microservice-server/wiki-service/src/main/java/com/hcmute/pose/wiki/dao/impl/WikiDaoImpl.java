package com.hcmute.pose.wiki.dao.impl;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.database.connector.helper.DatabaseHelper;
import com.hcmute.pose.genuid.GenerateUID;
import com.hcmute.pose.wiki.dao.WikiDao;
import com.hcmute.pose.wiki.model.WikiPage;
import com.hcmute.pose.wiki.model.WikiState;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Repository
public class WikiDaoImpl implements WikiDao {
    private static Logger LOGGER = LoggerFactory.getLogger(WikiDaoImpl.class);
    private static String SQL_INSERT_WIKI = "INSERT INTO wiki(wiki_id, wiki_title, project_id, created_by, path, content, state, created_at, updated_at) VALUES(?,?,?,?,?,?,?,?,?)";
    private static String SQL_UPDATE_WIKI = "UPDATE wiki SET wiki_title = ?, content = ?, updated_at = ? WHERE wiki_id = ?";
    private static String SQL_DELETE_WIKI = "UPDATE wiki SET state = ? WHERE wiki_id = ?";
    private static String SQL_SELECT_WIKI_ACTIVE = "SELECT * FROM wiki WHERE wiki_id = ? AND state = ? ORDER BY wiki_id";
    private static String SQL_SELECT_WIKI_BY_PROJECT = "SELECT * FROM wiki WHERE project_id = ? AND state = ? ORDER BY wiki_id";
    private static String SQL_SELECT_WIKI_BY_PATH = "SELECT * FROM wiki WHERE path = ? AND state = ? ORDER BY wiki_id";
    private static String SQL_SELECT_ALL_WIKI = "SELECT * FROM wiki ORDER BY wiki_id";
    @Autowired
    private DatabaseHelper databaseHelper;

    @Autowired
    private GenerateUID generateUID;

    @Override
    public Optional<Long> getLastID() {
        return generateUID.genUID();
    }

    @Override
    public void createWikiPage(WikiPage wikiPage) throws SQLException, TransactionException {
        databaseHelper.executeNonQuery(SQL_INSERT_WIKI,
                wikiPage.getId(),
                wikiPage.getTitle(),
                wikiPage.getProjectId(),
                wikiPage.getCreatedUser(),
                wikiPage.getPath(),
                wikiPage.getContent(),
                wikiPage.getState().ordinal(),
                wikiPage.getCreatedAt(),
                wikiPage.getUpdatedAt()
        );
    }

    @Override
    public void updateWikiPage(WikiPage wikiPage) throws SQLException, TransactionException {
        databaseHelper.executeNonQuery(SQL_UPDATE_WIKI,
                wikiPage.getTitle(),
                wikiPage.getContent(),
                wikiPage.getUpdatedAt(),
                wikiPage.getId());
    }

    @Override
    public void deleteWikiPage(Long id) throws SQLException, TransactionException {
        databaseHelper.executeNonQuery(SQL_DELETE_WIKI,
                WikiState.INACTIVE.ordinal(),
                id);
    }

    @Override
    public Optional<WikiPage> selectWikiPage(Long id) throws SQLException {
        return databaseHelper.executeQueryObject(WikiPage.class, SQL_SELECT_WIKI_ACTIVE,
                id,
                WikiState.ACTIVE.ordinal());
    }

    @Override
    public List<WikiPage> selectWikiPageByProject(Long id) throws SQLException {
         return databaseHelper.executeQueryListObject(WikiPage[].class, SQL_SELECT_WIKI_BY_PROJECT,
                 id,
                 WikiState.ACTIVE.ordinal());
    }

    @Override
    public List<WikiPage> selectWikiPageByPath(String path) throws SQLException {
        return databaseHelper.executeQueryListObject(WikiPage[].class, SQL_SELECT_WIKI_BY_PATH,
                path,
                WikiState.ACTIVE.ordinal());
    }

    @Override
    public List<WikiPage> selectAllWiki() throws SQLException {
        return databaseHelper.executeQueryListObject(WikiPage[].class, SQL_SELECT_ALL_WIKI);
    }
}
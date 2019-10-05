import com.hcmute.pose.database.connector.DataSource;
import com.hcmute.pose.database.connector.helper.DatabaseHelper;
import com.hcmute.pose.database.connector.helper.impl.DatabaseHelperImpl;
import com.hcmute.pose.database.connector.impl.DataSourceImpl;
import org.junit.Before;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.SQLException;

public class DatabaseTest {
    private static Logger LOGGER = LoggerFactory.getLogger(DatabaseTest.class);

    private String DBUrl = "jdbc:postgresql://localhost:5432/pose";
    private String DBUsername="postgres";
    private String DBPassword="postgres";

    private DataSource dataSource;
    private DatabaseHelper databaseHelper;

    @Before
    public void init() throws SQLException {
        dataSource = new DataSourceImpl(DBUrl,DBUsername,DBPassword);
        databaseHelper = new DatabaseHelperImpl(dataSource);
    }

    @Test
    public void testConnection() throws SQLException {
        Connection connection = dataSource.getConnection();
        LOGGER.info("Connection on {}",connection.getMetaData().getDatabaseProductName());
    }
}

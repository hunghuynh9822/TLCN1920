package com.hcmute.tlcn.workmanagement.dbconn;

import java.sql.Connection;
import java.sql.SQLException;

public interface DataSource {
    Connection getConnection() throws SQLException;
}

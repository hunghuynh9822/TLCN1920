package com.hcmute.tlcn.workmanagement.dao;

import com.hcmute.tlcn.workmanagement.dbconn.DataSource;

public class BaseDao {
    protected DataSource dataSource;
    protected BaseDao(DataSource dataSource){
        this.dataSource = dataSource;
    }
}

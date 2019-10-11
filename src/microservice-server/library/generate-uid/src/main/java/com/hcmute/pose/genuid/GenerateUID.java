package com.hcmute.pose.genuid;

import com.hcmute.pose.database.connector.DataSource;
import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.database.connector.helper.DatabaseHelper;
import com.hcmute.pose.database.connector.helper.impl.DatabaseHelperImpl;
import com.hcmute.pose.database.connector.impl.DataSourceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.SQLException;
import java.util.Optional;

public class


 GenerateUID {
    private static Logger LOGGER = LoggerFactory.getLogger(GenerateUID.class);

    private String dbUrl;
    private String dbUsername;
    private String dbPassword;

    private final String SQL_SELECT_INDEX = "SELECT index as value FROM genuid WHERE id = ? FOR UPDATE";
    private final String SQL_UPDATE_INDEX = "UPDATE genuid SET index = ?, count = count + 1 WHERE id = ?";
    private final String SQL_RESET_INDEX = "UPDATE genuid SET index = 0, count = 0 WHERE id = ?";

    private DataSource dataSource;
    private DatabaseHelper databaseHelper;
    private Integer serviceId;
    public GenerateUID(String dbUrl, String dbUsername,String dbPassword,Integer serviceId) throws SQLException {
        this.dbUrl = dbUrl;
        this.dbUsername = dbUsername;
        this.dbPassword = dbPassword;
        this.serviceId = serviceId;
        dataSource = new DataSourceImpl(dbUrl,dbUsername,dbPassword);
        databaseHelper = new DatabaseHelperImpl(dataSource);
    }

    public Optional<Long> genUID(){
        try{
            databaseHelper.beginTransaction();
            SingleInteger value = databaseHelper.executeQueryObject(SingleInteger.class,SQL_SELECT_INDEX,this.serviceId).orElse(new SingleInteger(0));
            Integer nextIndex = Math.floorMod(value.getValue(),10) > 8 ? 0 : Math.floorMod(value.getValue(),10) + 1;
            databaseHelper.executeNonQuery(SQL_UPDATE_INDEX,new Object[]{nextIndex,this.serviceId});
            databaseHelper.commit();
            return Optional.of(Long.parseLong(String.format("%d%d",System.currentTimeMillis(),nextIndex)));
        }catch (SQLException | TransactionException e){
            LOGGER.error("[GenerateUID]:[genUID] GOT EXCEPTION ",e);
            return Optional.empty();
        }finally {
            databaseHelper.closeConnection();
        }
    }

//    public void resetGenUID(){
//        try{
//            databaseHelper.beginTransaction();
//            databaseHelper.executeNonQuery(SQL_RESET_INDEX,this.serviceId);
//            databaseHelper.commit();
//        }catch (SQLException | TransactionException e){
//            LOGGER.error("[GenerateUID]:[genUID] GOT EXCEPTION ",e);
//        }finally {
//            databaseHelper.closeConnection();
//        }
//    }
}

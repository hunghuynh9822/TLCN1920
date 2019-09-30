package com.hcmute.tlcn.workmanagement.controller;

import com.hcmute.tlcn.workmanagement.dbconn.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLException;

@RestController
public class MainController {
    @Autowired
    DataSource dataSource;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    @ResponseBody
    public String welcome() {
        return "Welcome to RestTemplate Example.";
    }

    @RequestMapping(value = "/test", method = RequestMethod.GET)
    @ResponseBody
    public String test() {
        return "This is test content";
    }

    @RequestMapping(value = "/testdbconn")
    @ResponseBody
    public  String testDBConnection() {
        try {
            if(dataSource.getConnection().isValid(10)){
                return "Valid Connection";
            }
            return "Invalid Connection";
        } catch (SQLException e) {
            return e.getSQLState();
        }
    }
}

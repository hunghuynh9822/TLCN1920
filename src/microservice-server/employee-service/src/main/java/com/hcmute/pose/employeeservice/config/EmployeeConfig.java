package com.hcmute.pose.employeeservice.config;

import com.hcmute.pose.database.connector.DataSource;
import com.hcmute.pose.database.connector.helper.DatabaseHelper;
import com.hcmute.pose.database.connector.helper.impl.DatabaseHelperImpl;
import com.hcmute.pose.database.connector.impl.DataSourceImpl;
import com.hcmute.pose.employeeservice.buz.EmployeeBuz;
import com.hcmute.pose.employeeservice.buz.impl.EmployeeBuzImpl;
import com.hcmute.pose.employeeservice.dao.EmployeeDao;
import com.hcmute.pose.employeeservice.dao.RoleDao;
import com.hcmute.pose.employeeservice.dao.impl.EmployeeDaoImpl;
import com.hcmute.pose.employeeservice.dao.impl.RoleDaoImpl;
import com.hcmute.pose.employeeservice.service.EmployeeService;
import com.hcmute.pose.employeeservice.service.RoleService;
import com.hcmute.pose.employeeservice.service.impl.EmployeeServiceImpl;
import com.hcmute.pose.employeeservice.service.impl.RoleServiceImpl;
import com.hcmute.pose.genuid.GenerateUID;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;

import java.sql.SQLException;

@Configuration
public class EmployeeConfig {
    @Bean
    @LoadBalanced
    public RestTemplate restTemplate(){
        return new RestTemplate();
    }

    @Bean
    @LoadBalanced
    public WebClient.Builder builder(){
        return WebClient.builder();
    }

    @Value("${psql.url}")
    private String DBUrl;
    @Value("${psql.username}")
    private String DBUsername;
    @Value("${psql.password}")
    private String DBPassword;

    @Bean
    public DataSource dataSource() throws SQLException {
        return new DataSourceImpl(this.DBUrl, this.DBUsername, this.DBPassword);
    }

    @Bean
    public DatabaseHelper databaseHelper(DataSource dataSource){
        return new DatabaseHelperImpl(dataSource);
    }

    private Integer serviceId = 1;
    @Bean
    public GenerateUID generateUID() throws SQLException {
        return new GenerateUID(DBUrl,DBUsername,DBPassword,serviceId);
    }

    @Bean
    public EmployeeDao employeeDao(){
        return new EmployeeDaoImpl();
    }

    @Bean
    public RoleDao roleDao(){
        return new RoleDaoImpl();
    }

    @Bean
    public EmployeeService employeeService(){
        return new EmployeeServiceImpl();
    }

    @Bean
    public RoleService roleService(){
        return new RoleServiceImpl();
    }

    @Bean
    public EmployeeBuz employeeBuz(){
        return new EmployeeBuzImpl();
    }
}

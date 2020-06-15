package com.hcmute.pose.notifyservice.config;

import com.hcmute.pose.database.connector.DataSource;
import com.hcmute.pose.database.connector.helper.DatabaseHelper;
import com.hcmute.pose.database.connector.helper.impl.DatabaseHelperImpl;
import com.hcmute.pose.database.connector.impl.DataSourceImpl;
import com.hcmute.pose.genuid.GenerateUID;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;

import java.sql.SQLException;

@Configuration
public class NotifyConfig {

}

package com.hcmute.pose.employeeservice;

//import com.hcmute.pose.employeeservice.config.TestConfig;
import com.hcmute.pose.database.connector.helper.DatabaseHelper;
import com.hcmute.pose.employeeservice.buz.EmployeeBuz;
import com.hcmute.pose.employeeservice.dao.EmployeeDao;
import com.hcmute.pose.employeeservice.dao.RoleDao;
import com.hcmute.pose.employeeservice.model.Employee;
import com.hcmute.pose.employeeservice.model.RoleName;
import com.hcmute.pose.employeeservice.payload.EmployeeRequest;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.junit4.SpringRunner;

import java.sql.SQLException;
import java.util.Arrays;
import java.util.Collections;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@RunWith(SpringRunner.class)
@SpringBootTest
//@Import(TestConfig.class)
public class EmployeeServiceApplicationTests {
	private static Logger LOGGER = LoggerFactory.getLogger(EmployeeServiceApplicationTests.class);

	@Autowired
	private DatabaseHelper databaseHelper;
	@Autowired
	private EmployeeBuz employeeBuz;
	@Test
	public void contextLoads() {
	}

	@Test
	public void testInsertEmployee() throws InterruptedException {
		ExecutorService executor = Executors.newFixedThreadPool(8);
		CountDownLatch latch = new CountDownLatch(8);
		for (int i = 0; i < 8; i++) {
			Runnable worker = new Runnable() {
				@Override
				public void run() {
					try {
						for (int i = 0; i < 1; i++) {
							EmployeeRequest employee = new EmployeeRequest("tlcn1920", "tlcn1920@gmail.com", "tlcn1920", Arrays.asList(1L), "Huỳnh", "Lê Hữu", "Hưng");
							if (employeeBuz.createEmployee(employee).isPresent()) {
								LOGGER.info("SUCCESS");
							} else {
								LOGGER.info("FAIL");
							}
						}
					}catch (Exception e){
						LOGGER.error("[EmployeeServiceApplicationTests]:[testInsertEmployee]",e);
					}finally {

						latch.countDown();
					}

				}
			};
			executor.execute(worker);
		}
		latch.await();
		executor.shutdown();
		System.out.println("Finished all threads");
	}
}

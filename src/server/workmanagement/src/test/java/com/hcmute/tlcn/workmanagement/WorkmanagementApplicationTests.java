package com.hcmute.tlcn.workmanagement;

import com.hcmute.tlcn.workmanagement.common.SpringApplicationContext;
import com.hcmute.tlcn.workmanagement.dao.EmployeeDao;
import com.hcmute.tlcn.workmanagement.model.Employee;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.sql.SQLException;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadPoolExecutor;

@RunWith(SpringRunner.class)
@SpringBootTest
public class WorkmanagementApplicationTests {

    private static Logger LOGGER = LoggerFactory.getLogger(WorkmanagementApplicationTests.class);
    @Test
    public void contextLoads() {
    }

    @Test
    public void testInsertEmployee() throws InterruptedException {
        EmployeeDao employeeDao = SpringApplicationContext.getBean(EmployeeDao.class);
        ExecutorService executor = Executors.newFixedThreadPool(8);
        CountDownLatch latch = new CountDownLatch(8);
        for (int i = 0; i < 8; i++) {
            Runnable worker = new Runnable() {
                @Override
                public void run() {
                    for (int i = 0; i < 100; i++) {
                        Employee employee = new Employee("Huỳnh", "Lê Hữu", "Hưng");
                        if (employeeDao.createEmployee(employee)) {
                            LOGGER.info("SUCCESS");
                        } else {
                            LOGGER.info("FAIL");
                        }
                    }
                    latch.countDown();
                }
            };
            executor.execute(worker);
        }
        latch.await();
        executor.shutdown();
        System.out.println("Finished all threads");
    }
}

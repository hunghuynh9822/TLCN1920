package com.hcmute.tlcn.workmanagement;

import com.hcmute.tlcn.workmanagement.common.SpringApplicationContext;
import com.hcmute.tlcn.workmanagement.dao.EmployeeDao;
import com.hcmute.tlcn.workmanagement.dao.RoleDao;
import com.hcmute.tlcn.workmanagement.dao.impl.EmployeeDaoImpl;
import com.hcmute.tlcn.workmanagement.model.Employee;
import com.hcmute.tlcn.workmanagement.model.Role;
import com.hcmute.tlcn.workmanagement.model.RoleName;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.sql.SQLException;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

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
        RoleDao roleDao = SpringApplicationContext.getBean(RoleDao.class);
        ExecutorService executor = Executors.newFixedThreadPool(8);
        CountDownLatch latch = new CountDownLatch(8);
        for (int i = 0; i < 1; i++) {
            Runnable worker = new Runnable() {
                @Override
                public void run() {
                    for (int i = 0; i < 1; i++) {
                        Employee employee = new Employee("tlcn1920", "tlcn1920@gmail.com", "tlcn1920", Collections.singleton(roleDao.findByName(RoleName.ROLE_ADMIN.name()).orElse(null)),"Huỳnh","Lê Hữu","Hưng");
                        try {
                            if (employeeDao.createEmployee(employee).isPresent()) {
                                LOGGER.info("SUCCESS");
                            } else {
                                LOGGER.info("FAIL");
                            }
                        } catch (SQLException e) {
                            LOGGER.info("FAIL ROLLBACK {}",e.getMessage());
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

    @Test
    public void testInsertRole(){
        RoleDao roleDao = SpringApplicationContext.getBean(RoleDao.class);
        List<String> roleNames = Arrays.asList("ROLE_ADMIN","ROLE_EMPLOYEE");
        for (String roleName : roleNames
             ) {
            try {
                if (roleDao.createRole(roleName)) {
                    LOGGER.info("SUCCESS");
                } else {
                    LOGGER.info("FAIL");
                }
            } catch (SQLException e) {
                LOGGER.info("{}",e.getMessage());
            }
        }
    }
}

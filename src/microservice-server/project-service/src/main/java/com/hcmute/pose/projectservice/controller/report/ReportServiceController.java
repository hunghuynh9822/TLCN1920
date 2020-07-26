package com.hcmute.pose.projectservice.controller.report;

import com.hcmute.pose.projectservice.buz.project.ProjectServiceBuz;
import com.hcmute.pose.projectservice.buz.task.TaskServiceBuz;
import com.hcmute.pose.projectservice.controller.task.AdminTaskServiceController;
import com.hcmute.pose.projectservice.payload.task.ReportResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/report")
public class ReportServiceController {
    private static Logger LOGGER = LoggerFactory.getLogger(ReportServiceController.class);

    @Autowired
    private ProjectServiceBuz projectServiceBuz;
    @Autowired
    private TaskServiceBuz taskServiceBuz;

    @GetMapping("/test")
    public ResponseEntity testApi(){
        return new ResponseEntity("Test successfully", HttpStatus.OK);
    }

    @GetMapping("/task_of_employee_in_project")
    public ResponseEntity getNumberTaskOfEmployeeInProject(){
        try{
            ReportResponse response = projectServiceBuz.getNumberTaskOfEmployeeInProject();
            return new ResponseEntity(response, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/count")
    public ResponseEntity getReportCount(){
        try{
            Map<String, Object> report = projectServiceBuz.getReport();
            return new ResponseEntity(report, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/number_task_on_project")
    public ResponseEntity getNumberTaskOfProject(){
        try{
            ReportResponse response = taskServiceBuz.getNumberTaskOfProject();
            return new ResponseEntity(response, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/number_task_on_project_by_employee")
    public ResponseEntity getNumberTaskOfProject(@RequestParam(name="employee") Long employeeId){
        try{
            ReportResponse response = taskServiceBuz.getNumberTaskOfProjectOfEmployee(employeeId);
            return new ResponseEntity(response, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/task_of_employee_of_project")
    public ResponseEntity getNumberTaskOfEmployeeOfProject(@RequestParam(name="project") Long projectId){
        try{
            ReportResponse response = taskServiceBuz.getNumberTaskOfEmployeeInProject(projectId);
            return new ResponseEntity(response, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }
}

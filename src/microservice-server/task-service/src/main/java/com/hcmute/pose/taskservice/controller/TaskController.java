package com.hcmute.pose.taskservice.controller;

import com.hcmute.pose.taskservice.model.ListTasks;
import com.hcmute.pose.taskservice.model.Task;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    @RequestMapping("/{employeeId}")
    public ListTasks getEmployeeTasks(@PathVariable("employeeId") Long employeeId){
        List<Task> tasks = Arrays.asList(
                new Task(1L,employeeId,"Test1",new Date(),3),
                new Task(2L,employeeId,"Test2",new Date(),3)
        );
        ListTasks listTasks = new ListTasks(tasks);
        return listTasks;
    }
}

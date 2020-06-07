package com.hcmute.pose.projectservice.buz.project.impl;

import com.google.gson.Gson;
import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.database.connector.helper.DatabaseHelper;
import com.hcmute.pose.projectservice.buz.project.ProjectServiceBuz;
import com.hcmute.pose.projectservice.buz.task.TaskServiceBuz;
import com.hcmute.pose.projectservice.model.project.PerOfProject;
import com.hcmute.pose.projectservice.model.project.Project;
import com.hcmute.pose.projectservice.model.project.ProjectRole;
import com.hcmute.pose.projectservice.model.project.ProjectState;
import com.hcmute.pose.projectservice.payload.project.*;
import com.hcmute.pose.projectservice.payload.task.AllTasksProjectResponse;
import com.hcmute.pose.projectservice.service.project.PerOfProjectService;
import com.hcmute.pose.projectservice.service.project.ProjectService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ProjectServiceBuzImpl implements ProjectServiceBuz {
    private static Logger LOGGER = LoggerFactory.getLogger(ProjectServiceBuzImpl.class);
    private static final String EMPLOYEE_SERVICE = "http://employee-service/api/employees";
    @Autowired
    private DatabaseHelper databaseHelper;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private PerOfProjectService perOfProjectService;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private TaskServiceBuz taskServiceBuz;

    @Override
    public ProjectResponse createProject(ProjectRequest projectRequest) throws Exception, TransactionException {
        try{
            databaseHelper.beginTransaction();
            Project project = projectService.createProject(projectRequest.getTitle(),projectRequest.getDescription());
            perOfProjectService.createPOP(project.getId(), projectRequest.getEmployeeId(), ProjectRole.OWNER);
            if(projectRequest.getProjectAdmin() != null) {
                for (Long employeeId : projectRequest.getProjectAdmin()) {
                    perOfProjectService.createPOP(project.getId(), employeeId, ProjectRole.ADMIN);
                }
            }
            if(projectRequest.getProjectMember() != null) {
                for (Long employeeId : projectRequest.getProjectMember()) {
                    perOfProjectService.createPOP(project.getId(), employeeId, ProjectRole.MEMBER);
                }
            }
            ProjectResponse response = getProjectResponse(project);
            databaseHelper.commit();
            return response;
        }catch (Exception | TransactionException e){
            LOGGER.error("[createProject]",e);
            throw e;
        } finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    public AllProjectResponse getListProject() throws Exception {
        try {
            List<ProjectResponse> projectResponses = new ArrayList<>();
            List<Project> projects =  projectService.getListPro();
            for(Project project : projects) {
                projectResponses.add(getProjectResponse(project));
            }
            return new AllProjectResponse(projectResponses);
        } finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    public ProjectResponse getProject(Long id) throws Exception {
        try {
            Project project = projectService.getProject(id);
            return getProjectResponse(project);
        } finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    public EmployeeProjectResponse getProjectsOfEmployee(Long employeeId) throws Exception {
        try {
            List<PerOfProject> owner = perOfProjectService.getListOwner(employeeId);
            List<PerOfProject> join = perOfProjectService.getListJoin(employeeId);
            List<ProjectResponse> ownProjects = getProjects(owner);
            List<ProjectResponse> joinProjects = getProjects(join);
            return new EmployeeProjectResponse(ownProjects, joinProjects);
        } finally {
            databaseHelper.closeConnection();
        }
    }

    private List<ProjectResponse> getProjects(List<PerOfProject> perOfProjects) throws Exception {
        List<ProjectResponse> projects = new ArrayList<>();
        for (PerOfProject per : perOfProjects) {
            try {
                Project project = projectService.getProject(per.getProjectId());
                projects.add(getProjectResponse(project));
            } catch (Exception e) {
                throw e;
            }
        }
        return projects;
    }

    private ProjectResponse getProjectResponse(Project project) throws Exception {
        List<EmployeeResponse> members = new ArrayList<>();
        List<PerOfProject> perOfProjects = perOfProjectService.getListPOP(project.getId());
        for (PerOfProject per : perOfProjects) {
            String url = EMPLOYEE_SERVICE + "/{id}";
            Map<String, String> params = new HashMap<>();
            params.put("id", per.getEmployeeId().toString());
            EmployeeResponse employeeResponse = restTemplate.getForObject(url, EmployeeResponse.class, params);
            assert employeeResponse != null;
            employeeResponse.setRole(per.getRole());
            members.add(employeeResponse);
        }
        AllTasksProjectResponse allTasksByProject = taskServiceBuz.getDataOfProject(project.getId());
        return new ProjectResponse(project, members, allTasksByProject.getTasks());
    }

    @Override
    public void updateProject(ProjectUpdateRequest projectUpdateRequest) throws Exception, TransactionException {
        Long projectId = projectUpdateRequest.getProjectId();
        try{
            databaseHelper.beginTransaction();
            projectService.updateProject(projectId, projectUpdateRequest.getTitle(), projectUpdateRequest.getDescription(), projectUpdateRequest.getState());
            databaseHelper.commit();
        }catch (Exception | TransactionException e){
            LOGGER.error("[updateProject]",e);
            throw e;
        }finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    public void updateState(Long id, ProjectState state) throws SQLException, TransactionException {
        try{
            databaseHelper.beginTransaction();
            projectService.updateState(id, state);
            databaseHelper.commit();
        }catch (Exception | TransactionException e){
            LOGGER.error("[updateState]",e);
            throw e;
        }finally {
            databaseHelper.closeConnection();
        }
    }



    @Override
    public void createPOP(PerOfProjectRequest perOfProjectRequest) throws Exception, TransactionException {
        try{
            databaseHelper.beginTransaction();
            perOfProjectService.createPOP(perOfProjectRequest.getProjectId(), perOfProjectRequest.getEmployeeId(), perOfProjectRequest.getRole());
            databaseHelper.commit();
        }catch (Exception | TransactionException e){
            LOGGER.error("[createPOP]",e);
            throw e;
        }finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    public List<PerOfProject> getListPOP(Long projectId) throws SQLException {
        try {
            return perOfProjectService.getListPOP(projectId);
        } finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    public void deletePOP(PerOfProjectRequest perOfProjectRequest) throws SQLException, TransactionException {
        try{
            databaseHelper.beginTransaction();
            perOfProjectService.deletePOP(perOfProjectRequest.getProjectId(), perOfProjectRequest.getEmployeeId());
            databaseHelper.commit();
        }catch (Exception | TransactionException e){
            LOGGER.error("[deletePOP]",e);
            throw e;
        }finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    public AllEmployeeResponse getEmployeesFreeForProject(Long projectId) throws Exception {
        try {
            Project project = projectService.getProject(projectId);
            List<PerOfProject> perOfProjects = perOfProjectService.getListPOP(project.getId());
            String url = EMPLOYEE_SERVICE + "/";
            AllEmployeeResponse allEmployeeResponse = restTemplate.getForObject(url, AllEmployeeResponse.class);
            List<EmployeeResponse> employeeResponses = allEmployeeResponse.getEmployees();
            List<EmployeeResponse> employees = new ArrayList<>();
            for (EmployeeResponse employee : employeeResponses) {
                boolean contain = false;
                for (PerOfProject per : perOfProjects) {
                    if (per.getEmployeeId().equals(employee.getId())) {
                        contain = true;
                        break;
                    }
                }
                if (!contain) {
                    employees.add(employee);
                }
            }
            LOGGER.info("Employee free : {}", new Gson().toJson(employees));
            return new AllEmployeeResponse(employees);
        } catch (Exception e){
            LOGGER.error("[getEmployeesFreeForProject]",e);
            throw e;
        } finally {
            databaseHelper.closeConnection();
        }
    }
}

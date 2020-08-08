package com.hcmute.pose.projectservice.buz.project.impl;

import com.google.gson.Gson;
import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.database.connector.helper.DatabaseHelper;
import com.hcmute.pose.projectservice.buz.project.ProjectServiceBuz;
import com.hcmute.pose.projectservice.buz.task.TaskServiceBuz;
import com.hcmute.pose.projectservice.feign.EmployeeClient;
import com.hcmute.pose.projectservice.model.project.PerOfProject;
import com.hcmute.pose.projectservice.model.project.Project;
import com.hcmute.pose.projectservice.model.project.ProjectRole;
import com.hcmute.pose.projectservice.model.project.ProjectState;
import com.hcmute.pose.projectservice.modelmap.QueryReport;
import com.hcmute.pose.projectservice.modelmap.QueryReportItem;
import com.hcmute.pose.projectservice.payload.project.*;
import com.hcmute.pose.projectservice.payload.task.AllTasksProjectResponse;
import com.hcmute.pose.projectservice.payload.task.ReportResponse;
import com.hcmute.pose.projectservice.service.project.PerOfProjectService;
import com.hcmute.pose.projectservice.service.project.ProjectService;
import com.hcmute.pose.projectservice.service.task.TaskService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.*;

@Service
public class ProjectServiceBuzImpl implements ProjectServiceBuz {
    private static Logger LOGGER = LoggerFactory.getLogger(ProjectServiceBuzImpl.class);
    @Autowired
    private DatabaseHelper databaseHelper;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private PerOfProjectService perOfProjectService;

    @Autowired
    private TaskService taskService;

    @Autowired
    private TaskServiceBuz taskServiceBuz;

    @Autowired
    private EmployeeClient employeeClient;
    @Override
    public ProjectDetailResponse createProject(ProjectRequest projectRequest) throws Exception, TransactionException {
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
            ProjectDetailResponse response = getProjectResponse(project);
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
    public AllProjectDetailResponse getListProjectDetail() throws Exception {
        try {
            List<ProjectDetailResponse> projectDetailResponse = new ArrayList<>();
            List<Project> projects =  projectService.getListPro();
            for(Project project : projects) {
                projectDetailResponse.add(getProjectResponse(project));
            }
            return new AllProjectDetailResponse(projectDetailResponse);
        } finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    public ProjectsResponse getListProject() throws Exception {
        try {
            List<Project> projects =  projectService.getListPro();
            List<ProjectResponse> projectResponses = new ArrayList<>();
            for(Project project : projects) {
                ProjectResponse projectResponse = new ProjectResponse(project.getId(), project.getTitle(), null,project.getState(), project.getCreatedAt(), project.getUpdatedAt());
                projectResponses.add(projectResponse);
            }
            return new ProjectsResponse(projectResponses);
        } finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    public ProjectDetailResponse getProject(Long id) throws Exception {
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
            List<ProjectDetailResponse> ownProjects = getProjects(owner);
            List<ProjectDetailResponse> joinProjects = getProjects(join);
            return new EmployeeProjectResponse(ownProjects, joinProjects);
        } finally {
            databaseHelper.closeConnection();
        }
    }

    private List<ProjectDetailResponse> getProjects(List<PerOfProject> perOfProjects) throws Exception {
        List<ProjectDetailResponse> projects = new ArrayList<>();
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

    private ProjectDetailResponse getProjectResponse(Project project) throws Exception {
        List<EmployeeResponse> members = new ArrayList<>();
        List<PerOfProject> perOfProjects = perOfProjectService.getListPOP(project.getId());
        for (PerOfProject per : perOfProjects) {
            EmployeeResponse employeeResponse = employeeClient.getEmployee(per.getEmployeeId().toString());
            assert employeeResponse != null;
            employeeResponse.setRole(per.getRole());
            members.add(employeeResponse);
        }
        AllTasksProjectResponse allTasksByProject = taskServiceBuz.getDataTasksOfProject(project.getId());
        ProjectDetailResponse projectDetailResponse =  new ProjectDetailResponse(project, members, allTasksByProject.getTasks());
        projectDetailResponse.setMore(allTasksByProject.getTasksInfo());
        return projectDetailResponse;
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
    public void deleteProject(Long id) throws SQLException, TransactionException {
        try {
            databaseHelper.beginTransaction();
            projectService.deleteProject(id);
            databaseHelper.commit();
        } catch (Exception | TransactionException e) {
            LOGGER.error("[updateState]",e);
            throw e;
        } finally {
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
    public void deletePOP(PerOfProjectRequest perOfProjectRequest) throws Exception, TransactionException {
        try{
            databaseHelper.beginTransaction();
            PerOfProject owner = perOfProjectService.getOwner(perOfProjectRequest.getProjectId());
            perOfProjectService.deletePOP(perOfProjectRequest.getProjectId(), perOfProjectRequest.getEmployeeId());
            taskService.updateTaskToOwner(perOfProjectRequest.getProjectId(), owner.getEmployeeId(), perOfProjectRequest.getEmployeeId());
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
            AllEmployeeResponse allEmployeeResponse = employeeClient.getAllEmployee();
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

    private Integer getIndex(List<QueryReport> data, Long id) throws Exception {
        for(int i = 0; i < data.size(); i++) {
            if(data.get(i).getId().equals(id)) {
                return i;
            }
        }
        throw new Exception("Not found id " + id);
    }

    @Override
    public ReportResponse getNumberTaskOfEmployeeInProject() throws Exception {
        try{
            ReportResponse reportResponse = new ReportResponse();
            List<QueryReport> listPro = projectService.getListProSort();
            List<QueryReport> listEmployee = projectService.getListEmployeeSort();
            List<QueryReportItem> listItem = new ArrayList<>();
            for(QueryReport pro : listPro) {
                List<QueryReport> numberTaskOfProject = projectService.getNumberTaskOfEmployeeInProject(pro.getId());
                QueryReport[] numberTaskOfProjectSort = new QueryReport[numberTaskOfProject.size()];
                for (QueryReport employee : numberTaskOfProject
                     ) {
                    numberTaskOfProjectSort[getIndex(listEmployee, employee.getId())] = employee;
                }
                listItem.add(new QueryReportItem(pro.getId(), pro.getName(), Arrays.asList(numberTaskOfProjectSort)));
            }
            reportResponse.putData("taskEmployee", listItem);
            return reportResponse;
        } finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    public Map<String, Object> getReport() throws SQLException {
        return projectService.getReport();
    }
}

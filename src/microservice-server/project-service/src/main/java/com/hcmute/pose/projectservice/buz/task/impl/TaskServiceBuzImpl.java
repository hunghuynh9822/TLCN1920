package com.hcmute.pose.projectservice.buz.task.impl;

import com.google.gson.Gson;
import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.database.connector.helper.DatabaseHelper;
import com.hcmute.pose.projectservice.buz.task.TaskServiceBuz;
import com.hcmute.pose.projectservice.model.task.*;
import com.hcmute.pose.projectservice.modelmap.QueryReport;
import com.hcmute.pose.projectservice.payload.task.*;
import com.hcmute.pose.projectservice.service.task.TaskCommentService;
import com.hcmute.pose.projectservice.service.task.TaskService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.sql.SQLException;
import java.text.DecimalFormat;
import java.util.*;

@Service
public class TaskServiceBuzImpl implements TaskServiceBuz {
    private static Logger LOGGER = LoggerFactory.getLogger(TaskServiceBuzImpl.class);
    @Autowired
    private DatabaseHelper databaseHelper;

    @Autowired
    private TaskService taskService;

    @Autowired
    private TaskCommentService taskCommentService;

    @Override
    public Optional<Task> createTask(TaskRequest taskRequest) throws TransactionException {
        try{
            databaseHelper.beginTransaction();
            Task task = taskService.createTask(taskRequest.getPreTaskId(),taskRequest.getProjectId(),taskRequest.getEmployeeCreator(),taskRequest.getEmployeeAssignee(), taskRequest.getTitle(), taskRequest.getDescription(), taskRequest.getStartedAt().getTime(), taskRequest.getDuration());
            databaseHelper.commit();
            return Optional.of(task);
        }catch (Exception e) {
            return Optional.empty();
        }finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    public Task getTasksById(Long taskId) throws Exception {
        try{
            return taskService.getTasksById(taskId);
        } finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    public AllTasksProjectResponse getDataOfProject(Long projectId) throws Exception {
        List<Task> tasks = taskService.getTasksByProject(projectId);
        List<TaskResponse> taskResponses = new ArrayList<>();
        List<TaskLink> links = new ArrayList<>();
        long index = 1L;
        for (Task task : tasks
        ) {
            TaskResponse taskResponse = new TaskResponse(task.getId(), task.getProjectId(), task.getEmployeeCreator(), task.getEmployeeAssignee(), task.getTitle(), task.getDescription(), task.getPreTaskId(), task.getStartedAt(), task.getDuration(), task.getDescription(), task.getPoint(), task.getCreatedAt(), task.getUpdatedAt());
            taskResponse.setProcess(0.2*task.getState().ordinal());
            taskResponses.add(taskResponse);
            String preTaskIds = task.getPreTaskId();
            if (StringUtils.isEmpty(preTaskIds)) {
                continue;
            }
            for (String taskId : preTaskIds.split(",")) {
                if (StringUtils.isEmpty(taskId)) {
                    continue;
                }
                TaskLink taskLink = null;
                taskLink = new TaskLink(index, new Long(taskId), task.getId(), 0, System.currentTimeMillis(), System.currentTimeMillis());
                links.add(taskLink);
                index = index + 1;
            }
        }
        List<MessageError> messages = new ArrayList<>();
        MessageError messageError;
        for (TaskLink taskLink : links) {
            Task source = taskService.getTasksById(taskLink.getSource());
            Task target = taskService.getTasksById(taskLink.getTarget());
            Calendar date_end_source = Calendar.getInstance();
            date_end_source.setTimeInMillis(source.getStartedAt());
            date_end_source.add(Calendar.DATE , source.getDuration() == null ? 0 : source.getDuration());
            Calendar date_start_target = Calendar.getInstance();
            date_start_target.setTimeInMillis(target.getStartedAt());
            Date sourceTime = date_end_source.getTime();
            Date targetTime = date_start_target.getTime();
            if (targetTime.compareTo(sourceTime) < 0) {
                messageError = new MessageError("Cần kiểm tra thời gian Task {{0}} -> Task {{1}}", new ArrayList<String>(){{
                    add(source.getTitle());
                    add(target.getTitle());
                }});
                messages.add(messageError);
            }
        }
//      =========================================
//      Get List END_Task
        List<Task> listEndTask = new ArrayList<>();
        for (Task task : tasks){
            boolean isEnd = true;
            for (TaskLink taskLink : links){
                if (task.getId().equals(taskLink.getSource())){
                    isEnd = false;
                    break;
                }
            }
            if(isEnd) {
                listEndTask.add(task);
            }
        }
        LOGGER.info("End_task {}",new Gson().toJson(listEndTask));

//      Find list gantt
        List<List<Task>> list_gantt = new ArrayList<>();
        List<Integer> list_gantt_dur = new ArrayList<>();
        for ( Task task_end : listEndTask){
            int duration = 0;
            List<Task> list_Gantt_Task = new ArrayList<>();
            LOGGER.info("task_end {}",new Gson().toJson(task_end));

            list_Gantt_Task.add(task_end);
            Task next_Task = task_end;
            while (next_Task != null){
                duration = duration + task_end.getDuration();
                next_Task = get_preTask_max_dur(next_Task);
                if (next_Task != null){
                    list_Gantt_Task.add(next_Task);
                }else {
                    list_gantt.add(list_Gantt_Task);
                    list_gantt_dur.add(duration);
                }
            }
        }
//      find gantt
        int max_dur = 0;
        int indexMax = 0;
        for (int i=0; i < list_gantt_dur.size() ; i++){
            if(max_dur < list_gantt_dur.get(i)){
                max_dur = list_gantt_dur.get(i);
                indexMax = i;
            }
        }
        List<Task> listGantt = new ArrayList<>(list_gantt.get(indexMax));
        LOGGER.info("List gannt {}",new Gson().toJson(listGantt));
//      ===================================
        return new AllTasksProjectResponse(projectId, taskResponses, links, messages , listGantt);
    }
    Task get_preTask_max_dur(Task task) throws Exception {
        List<Task> list_pre_end = new ArrayList<>();
        if (StringUtils.isEmpty(task.getPreTaskId())){
            return null;
        }
        for (String taskId : task.getPreTaskId().split(",")) {
            if (StringUtils.isEmpty(taskId)) {
                continue;
            }
            Task task_pre_end = taskService.getTasksById(new Long(taskId));
            list_pre_end.add(task_pre_end);
        }
        if (list_pre_end == null || list_pre_end.isEmpty())
        {
            return null;
        }
        int dur=0;
        Task task_resufl = null;
        for (Task task_pre : list_pre_end){
            if (dur < task_pre.getDuration()){
                dur = task_pre.getDuration();
                task_resufl = task_pre;
            }
        }
        return task_resufl;
    }
    private static DecimalFormat df = new DecimalFormat("0.00");

    @Override
    public AllTasksProjectResponse getDataTasksOfProject(Long projectId) throws SQLException {
        List<Task> tasks = taskService.getTasksByProject(projectId);
        List<TaskResponse> taskResponses = new ArrayList<>();
        Map<String, Object> taskInfo = new HashMap<>();
        Map<TaskState, Integer> taskState = new HashMap<>();
        Integer number = 0;
        Double process = 0D;
        for (Task task : tasks
        ) {
            TaskResponse taskResponse = new TaskResponse(task.getId(), task.getProjectId(), task.getEmployeeCreator(), task.getEmployeeAssignee(), task.getTitle(), task.getDescription(), task.getPreTaskId(), task.getStartedAt(), task.getDuration(), task.getState().name(), task.getPoint(), task.getCreatedAt(), task.getUpdatedAt());
            taskResponse.setProcess(new Double(df.format(0.2*task.getState().ordinal())));
            taskResponses.add(taskResponse);
            number = taskState.get(task.getState());
            if(number == null) {
                taskState.put(task.getState(), 1);
            } else {
                taskState.put(task.getState(), number + 1);
            }
            process = process + taskResponse.getProcess();
        }
        taskInfo.put("taskState", taskState);
        taskInfo.put("total", tasks.size());
        taskInfo.put("finish", taskState.get(TaskState.FINISH) == null ? 0 : taskState.get(TaskState.FINISH));
        if(process.equals(0D)) {
            taskInfo.put("process", process);
        } else {
            taskInfo.put("process", new Double(df.format(process / tasks.size() * 100)));
        }
        AllTasksProjectResponse allTasksProjectResponse = new AllTasksProjectResponse(projectId, taskResponses);
        allTasksProjectResponse.setTasksInfo(taskInfo);
        return allTasksProjectResponse;
    }

    @Override
    public AllTasksProjectResponse getAllTasksByProject(Long projectId) throws Exception {
        try{
            return getDataOfProject(projectId);
        } finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    public TasksWithState getAllTasksWithStateByProject(Long projectId) throws SQLException {
        try{
            List<Task> tasks = taskService.getTasksByProject(projectId);
            return getTasksWithState(tasks);
        } finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    public ProjectTasksResponse getTasksByProject(Long projectId) throws SQLException {
        List<CreatorTasksResponse> creatorTasks = new ArrayList<>();
        try{
            List<AssigneeTasksResponse> assigneeTasks = getAssigneeTasks(projectId);
            creatorTasks.add(new CreatorTasksResponse(0L, assigneeTasks));
            return new ProjectTasksResponse(projectId, creatorTasks);
        } finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    public ProjectTasksResponse getTasksByCreator(Long projectId, Long creatorId) throws SQLException {
        List<CreatorTasksResponse> creatorTasks = new ArrayList<>();
        try{
            List<AssigneeTasksResponse> assigneeTasks = getAssigneeTasks(projectId, creatorId);
            creatorTasks.add(new CreatorTasksResponse(creatorId, assigneeTasks));
            return new ProjectTasksResponse(projectId, creatorTasks);
        } finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    public ProjectTasksAssigneeWithStateResponse getTasksAssigneeWithStateByProject(Long projectId) throws SQLException {
        List<AssigneeTasksWithStateResponse> assigneeTasks = new ArrayList<>();
        try{
            List<Long> assignIds = taskService.getAsigneeByProject(projectId);
            for(Long assigneeId : assignIds) {
                List<Task> tasks = taskService.getTasksByAssignee(projectId, assigneeId);
                assigneeTasks.add(new AssigneeTasksWithStateResponse(assigneeId, getTasksWithState(tasks)));
            }
            return new ProjectTasksAssigneeWithStateResponse(projectId, assigneeTasks);
        } finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    public void deleteTask(Long taskId, Long projectId) throws SQLException, TransactionException {
        List<Task> tasks = taskService.getTasksByProject(projectId);
        String newpreTask = "";
        databaseHelper.beginTransaction();
        for (Task task : tasks){
            String preTaskId = task.getPreTaskId();
            if (StringUtils.isEmpty(preTaskId)) {
                continue;
            }
            for (String pretaskId : preTaskId.split(",")) {
                if (pretaskId != (taskId).toString()){
                    newpreTask = preTaskId + ",";
                }
            }
            if (newpreTask.length() != 0) {
                newpreTask = newpreTask.substring(0, newpreTask.length() - 1);
            }
            taskService.updatePreTaskId(task.getId(), newpreTask);
        }
        taskService.deleteTask(taskId);
        databaseHelper.commit();
    }

    private List<AssigneeTasksResponse> getAssigneeTasks(Long projectId, Long creatorId) throws SQLException {
        List<AssigneeTasksResponse> assigneeTasksResponses = new ArrayList<>();
        try{
            List<Long> assigneeIds = taskService.getAssigneeByCreator(projectId, creatorId);
            for(Long assigneeId : assigneeIds) {
                List<Task> tasks = taskService.getTasksByAssigneeAndCreator(projectId, assigneeId, creatorId);
                assigneeTasksResponses.add(new AssigneeTasksResponse(assigneeId, tasks));
            }
            return assigneeTasksResponses;
        } finally {
            databaseHelper.closeConnection();
        }
    }

    private List<AssigneeTasksResponse> getAssigneeTasks(Long projectId) throws SQLException {
        List<AssigneeTasksResponse> assigneeTasksResponses = new ArrayList<>();
        try{
            List<Long> assigneeIds = taskService.getAssigneeByProject(projectId);
            for(Long assigneeId : assigneeIds) {
                List<Task> tasks = taskService.getTasksByAssignee(projectId, assigneeId);
                assigneeTasksResponses.add(new AssigneeTasksResponse(assigneeId, tasks));
            }
            return assigneeTasksResponses;
        } finally {
            databaseHelper.closeConnection();
        }
    }

//    private List<AssigneeTasksWithStateResponse> getAssigneeTasksWithState(Long projectId, Long creatorId) throws SQLException {
//        List<AssigneeTasksWithStateResponse> assigneeTasksWithStateResponses = new ArrayList<>();
//        try{
//            List<Long> assigneeIds = taskService.getAssigneeByCreator(projectId, creatorId);
//            for(Long assigneeId : assigneeIds) {
//                List<Task> tasks = taskService.getTasksByAssignee(projectId, assigneeId);
//                assigneeTasksWithStateResponses.add(new AssigneeTasksWithStateResponse(assigneeId, getTasksWithState(tasks)));
//            }
//            return assigneeTasksWithStateResponses;
//        } finally {
//            databaseHelper.closeConnection();
//        }
//    }

    @Override
    public AssigneeTasksResponse getTasksByAssignee(Long projectId, Long assigneeId) throws SQLException {
        try{
            List<Task> tasks = taskService.getTasksByAssignee(projectId, assigneeId);
            return new AssigneeTasksResponse(assigneeId, tasks);
        } finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    public TasksWithState getTasksWithStateByAssignee(Long projectId, Long assigneeId) throws SQLException {
        try{
            List<Task> tasks = taskService.getTasksByAssignee(projectId, assigneeId);
            return getTasksWithState(tasks);
        } finally {
            databaseHelper.closeConnection();
        }
    }

    private TasksWithState getTasksWithState(List<Task> tasks) {
        Map<TaskState, List<Task>> tasksWithState = new HashMap<>();
        for (Task task: tasks
        ) {
            if(tasksWithState.containsKey(task.getState())) {
                tasksWithState.get(task.getState()).add(task);
            } else {
                List<Task> tasksState = new ArrayList<>();
                tasksState.add(task);
                tasksWithState.put(task.getState(), tasksState);
            }
        }
        return new TasksWithState(tasksWithState);
    }

    @Override
    //Long taskId, Long creatorId, Integer point
    public void updatePoint(TaskUpdateRequest request) throws TransactionException, SQLException {
        try{
            databaseHelper.beginTransaction();
            taskService.updatePoint(request.getTaskId(), request.getEmployeeId(), request.getPoint());
            databaseHelper.commit();
        } finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    //Long taskId, Long employeeId, TaskState state
    public void updateState(TaskUpdateRequest request) throws SQLException, TransactionException {
        try{
            databaseHelper.beginTransaction();
            taskService.updateState(request.getTaskId(), request.getEmployeeId(), TaskState.values()[request.getState()]);
            databaseHelper.commit();
        } finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    //Long taskId, Long employeeId
    public void updateAssignee(TaskUpdateRequest request) throws SQLException, TransactionException {
        try{
            databaseHelper.beginTransaction();
            taskService.updateAssignee(request.getTaskId(), request.getEmployeeId());
            databaseHelper.commit();
        } finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    //Long taskId, String title, String description, Long startedAt, Integer duration, TaskState state
    public void updateTask(TaskUpdateRequest request) throws SQLException, TransactionException {
        try{
            databaseHelper.beginTransaction();
            taskService.updateTask(request.getTaskId(),request.getPreTaskId(), request.getEmployeeId(), request.getTitle(), request.getDescription(), request.getStartedAt(), request.getDuration(), TaskState.values()[request.getState()]);
            databaseHelper.commit();
        } finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    //Long taskId, Long startedAt, Integer duration
    public void updateTaskTime(TaskUpdateRequest request) throws SQLException, TransactionException {
        try{
            databaseHelper.beginTransaction();
            taskService.updateTaskTime(request.getTaskId(), request.getStartedAt(), request.getDuration());
            databaseHelper.commit();
        } finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    public Optional<TaskComments> createTaskComment(TaskCommentRequest taskCommentRequest) {
        try{
            databaseHelper.beginTransaction();
            TaskComments taskComments = taskCommentService.createTaskComment(taskCommentRequest.getTaskId(),taskCommentRequest.getEmployeeId(),taskCommentRequest.getComment());
            databaseHelper.commit();
            return Optional.of(taskComments);
        }catch (Exception | TransactionException e){

        }finally {
            databaseHelper.closeConnection();
        }
        return null;
    }

    @Override
    public List<TaskComments> getListTaskComment(Long taskId) throws SQLException {
        try{
            List<TaskComments> taskComments = taskCommentService.getListTaskComment(taskId);
            return taskComments;
        } finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    //Long taskId, Long employeeId, String comment
    public void updateTaskComment(TaskCommentRequest request) throws SQLException, TransactionException {
        try{
            databaseHelper.beginTransaction();
            taskCommentService.updateTaskComment(request.getTaskId(), request.getEmployeeId(), request.getComment());
            databaseHelper.commit();
        } finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    public ReportResponse getNumberTaskOfProject() throws SQLException {
        try{
            List<QueryReport> numberTaskOfProject = taskService.getNumberTaskOfProject();
            ReportResponse reportResponse = new ReportResponse();
            int total = 0;
            for (QueryReport report:numberTaskOfProject
            ) {
                total += report.getNumber();
            }
            reportResponse.putData("numberTasks", numberTaskOfProject);
            reportResponse.putData("total", total);
            return reportResponse;
        } finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    public ReportResponse getNumberTaskOfProjectOfEmployee(Long employeeId) throws SQLException {
        try{
            List<QueryReport> numberTaskOfProject = taskService.getNumberTaskOfProjectOfEmployee(employeeId);
            ReportResponse reportResponse = new ReportResponse();
            int total = 0;
            for (QueryReport report:numberTaskOfProject
            ) {
                total += report.getNumber();
            }
            reportResponse.putData("numberTasks", numberTaskOfProject);
            reportResponse.putData("total", total);
            return reportResponse;
        } finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    public ReportResponse getNumberTaskOfEmployeeInProject(Long projectId) throws SQLException {
        try{
            List<QueryReport> numberTaskOfProject = taskService.getNumberTaskOfEmployeeInProject(projectId);
            ReportResponse reportResponse = new ReportResponse();
            reportResponse.putData("taskOfEmployee", numberTaskOfProject);
            return reportResponse;
        } finally {
            databaseHelper.closeConnection();
        }
    }
}

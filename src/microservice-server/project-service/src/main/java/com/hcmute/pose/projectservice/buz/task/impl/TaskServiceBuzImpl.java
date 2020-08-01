package com.hcmute.pose.projectservice.buz.task.impl;

import com.google.gson.Gson;
import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.database.connector.helper.DatabaseHelper;
import com.hcmute.pose.projectservice.buz.task.TaskServiceBuz;
import com.hcmute.pose.projectservice.model.task.*;
import com.hcmute.pose.projectservice.modelmap.CountStateReport;
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

    private Task getTask(List<Task> tasks, Long id) throws Exception {
        for (Task task : tasks) {
            if(task.getId().equals(id)) {
                return task;
            }
        }
        throw new Exception("Can not get task id : " + id);
    }

    public Integer getActivity(List<Activity> activities, Long id) {
        int index = 0;
        for (Activity activity : activities
             ) {
            if(activity.getId().equals(id)) {
                return index;
            }
            index ++ ;
        }
        return null;
    }

    public ProcessActivity getActivities(List<Task> tasks) {
        List<Activity> activities = new ArrayList<>();
        Long startTime = 0L;
        Long endTime = 0L;
        for (Task task : tasks
             ) {
            Activity activity = new Activity(task.getId(), task.getTitle(), task.getStartedAt(), task.getDuration());
            activities.add(activity);
            if(StringUtils.isEmpty(task.getPreTaskId())) {
                if(startTime.equals(0L)) {
                    startTime = task.getStartedAt();
                } else if(startTime > task.getStartedAt()){
                    startTime = task.getStartedAt();
                }
            } else {
                for (String taskId : task.getPreTaskId().split(",")) {
                    Integer preIndex = getActivity(activities, new Long(taskId));
                    if(preIndex == null) {
                        LOGGER.error("Not found {}", taskId);
                        continue;
                    }
                    activities.get(preIndex).getSuccessors().add(activity);
                    activity.getPredecessors().add(activities.get(preIndex));
                }
            }
            Long temp = plusDate(task.getStartedAt(),task.getDuration());
            if(endTime.compareTo(temp) < 0) {
                endTime = temp;
            }
        }
        return new ProcessActivity(startTime, endTime, activities);
    }

    private ProcessActivity walkListAhead(ProcessActivity processActivity) {
        Long startTime = processActivity.getStartTime();
        Long endTime = processActivity.getEndTime();
        List<Activity> list = processActivity.getActivities();
        int na = list.size();
        list.get(0).setEet(list.get(0).getEst() + list.get(0).getDuration());
        for(int i = 1; i < na; i++)
        {
            Activity currentActivity = list.get(i);
            if(list.get(i).getPredecessors().size() == 0) {
                Integer subDate = subDate(startTime, currentActivity.getStartedAt());
                list.get(i).setEst(subDate);
            }
            for(Activity activity : list.get(i).getPredecessors())
            {
                if(list.get(i).getEst() < activity.getEet()) {
                    list.get(i).setEst(activity.getEet()); // //subDate(startTime, list.get(i).getStartedAt())
                }
            }

            list.get(i).setEet(list.get(i).getEst() + list.get(i).getDuration());
        }
        processActivity.setActivities(list);
        return processActivity;
    }

    private ProcessActivity walkListAback(ProcessActivity processActivity) {
        List<Activity> list = processActivity.getActivities();
        int na = list.size();
        list.get(na - 1).setLet(list.get(na - 1).getEet());
        list.get(na - 1).setLst(list.get(na - 1).getLet() - list.get(na - 1).getDuration());

        for(int i = na - 2; i >= 0; i--)
        {
            for(Activity activity : list.get(i).getSuccessors())
            {
                if(list.get(i).getLet() == 0) {
                    list.get(i).setLet(activity.getLst());
                } else if(list.get(i).getLet() > activity.getLst()) {
                    list.get(i).setLet(activity.getLst());
                }
            }
            list.get(i).setLst(list.get(i).getLet() - list.get(i).getDuration());
        }
        processActivity.setActivities(list);
        return processActivity;
    }

    private List<Long> getCriticalPath(List<Task> tasks) {
        if(tasks == null || tasks.isEmpty()) {
            LOGGER.info("No task -> Not find critical path");
            return new ArrayList<>();
        }
        List<Activity> criticalPath = new ArrayList<>();
        List<Long> criticalPathId = new ArrayList<>();
        ProcessActivity processActivity = getActivities(tasks);
        walkListAhead(processActivity);
        walkListAback(processActivity);
        List<Activity> list = processActivity.getActivities();
        LOGGER.info("{} {} {}", processActivity.getStartTime(), processActivity.getEndTime(), subDate(processActivity.getStartTime(), processActivity.getEndTime()));
        LOGGER.info("          Critical Path: ");
        if(list.isEmpty()) {
            LOGGER.info("Not find critical path");
            return new ArrayList<>();
        }
        Activity firstActivity = list.get(0);
        if(!isCriticalActivity(processActivity.getStartTime(), processActivity.getEndTime(), firstActivity)) {
            LOGGER.info("First activity {} {} {} previous {} after {} EST {} LST {} EET {} LET {}",
                    firstActivity.getId(), firstActivity.getTitle(), firstActivity.getDuration(), firstActivity.getPredecessors().size(), firstActivity.getSuccessors().size(), firstActivity.getEst(), firstActivity.getLst(), firstActivity.getEet(), firstActivity.getLet());
            LOGGER.info("First activity not start the critical path");
            return new ArrayList<>();
        }
        for(Activity activity : list) {
            LOGGER.info("Activity {} {} {} previous {} after {} EST {} LST {} EET {} LET {}",
                    activity.getId(), activity.getTitle(), activity.getDuration(), activity.getPredecessors().size(), activity.getSuccessors().size(), activity.getEst(), activity.getLst(), activity.getEet(), activity.getLet());
            if(isCriticalActivity(processActivity.getStartTime(), processActivity.getEndTime(), activity)) {
                if(activity.getPredecessors().size() == 0) {
                    if(activity.getEst() == 0) {
                        criticalPath.add(activity);
                        criticalPathId.add(activity.getId());
                        LOGGER.info("{} ", activity.getTitle());
                    }
                } else {
                    for(Activity pre : activity.getPredecessors()) {
                        if(criticalPath.contains(pre)) {
                            criticalPath.add(activity);
                            criticalPathId.add(activity.getId());
                            LOGGER.info("{} ", activity.getTitle());
                            break;
                        }
                    }
                }
            }
        }
        Activity last = criticalPath.get(criticalPath.size() - 1);
        if(!plusDate(last.getStartedAt(), last.getDuration()).equals(processActivity.getEndTime())) {
            LOGGER.info("Not end activity of the critical path");
            return new ArrayList<>();
        }
        LOGGER.info("         Total duration: {}\n", criticalPath.get(criticalPath.size() - 1).getEet());
        return criticalPathId;
    }

    private Boolean isCriticalActivity(Long startTime, Long endTime, Activity activity) {
        return (activity.getEet() - activity.getLet() == 0) && (activity.getEst() - activity.getLst() == 0) && (subDate(startTime, activity.getStartedAt()) == activity.getEst());
    }

    private Integer subDate(Long date1, Long date2) {
        long subDate = date2 - date1;
        return Math.toIntExact(subDate / (24 * 60 * 60 * 1000));
    }

    private Long plusDate(Long date, Integer duration) {
        Calendar date_end_source = Calendar.getInstance();
        date_end_source.setTimeInMillis(date);
        date_end_source.add(Calendar.DATE, duration == null ? 0 : duration);
        return date_end_source.getTimeInMillis();
    }

    @Override
    public AllTasksProjectResponse getDataOfProject(Long projectId) throws Exception {
        List<Task> tasks = taskService.getTasksByProject(projectId);
        List<TaskResponse> taskResponses = new ArrayList<>();
        List<TaskLink> links = new ArrayList<>();
        long index = 1L;
        List<MessageError> messages = new ArrayList<>();
        MessageError messageError;
        for (Task task : tasks
        ) {
            TaskResponse taskResponse = new TaskResponse(task.getId(), task.getProjectId(), task.getEmployeeCreator(), task.getEmployeeAssignee(), task.getTitle(), task.getDescription(), task.getPreTaskId(), task.getStartedAt(), task.getDuration(), task.getDescription(), task.getPoint(), task.getCreatedAt(), task.getUpdatedAt());
            taskResponse.setProcess(0.2 * task.getState().ordinal());
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
                //
            }
        }

//      =========================================
        for (TaskLink taskLink : links) {
            Task source = taskService.getTasksById(taskLink.getSource());
            Task target = taskService.getTasksById(taskLink.getTarget());
            Calendar date_end_source = Calendar.getInstance();
            date_end_source.setTimeInMillis(source.getStartedAt());
            date_end_source.add(Calendar.DATE, source.getDuration() == null ? 0 : source.getDuration());
            Calendar date_start_target = Calendar.getInstance();
            date_start_target.setTimeInMillis(target.getStartedAt());
            Date sourceTime = date_end_source.getTime();
            Date targetTime = date_start_target.getTime();
            if (targetTime.compareTo(sourceTime) < 0) {
                messageError = new MessageError("Cần kiểm tra thời gian Task {{0}} -> Task {{1}}", new ArrayList<String>() {{
                    add(source.getTitle());
                    add(target.getTitle());
                }});
                messages.add(messageError);
            }
        }
//      Find list gantt
        List<Long> criticalPath = new ArrayList<>();
        if(messages.isEmpty()) {
            criticalPath = getCriticalPath(tasks);
        }
//      ===================================
        return new AllTasksProjectResponse(projectId, taskResponses, links, messages, criticalPath);
    }

    List<Task> getPreTasks(List<Task> tasks, Task task) throws Exception {
        List<Task> listPreTasks = new ArrayList<>();
        if (StringUtils.isEmpty(task.getPreTaskId())){
            return listPreTasks;
        }
        for (String taskId : task.getPreTaskId().split(",")) {
            if (StringUtils.isEmpty(taskId)) {
                continue;
            }
            Task preTask = getTask(tasks, new Long(taskId));
            listPreTasks.add(preTask);
        }
        return listPreTasks;
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
        try{
            List<AssigneeTasksResponse> assigneeTasks = getAssigneeTasks(projectId);
            return new ProjectTasksResponse(projectId, assigneeTasks);
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

    @Override
    public ReportResponse getCountReport(Long userId) throws SQLException {
        try{
            List<CountStateReport> countStateTaskCreateByMe = taskService.getCountStateTaskCreateByMe(userId);
            List<CountStateReport> countStateTaskAssignToMe = taskService.getCountStateTaskAssignToMe(userId);
            ReportResponse reportResponse = new ReportResponse();
            reportResponse.putData("createByMe", countStateTaskCreateByMe);
            reportResponse.putData("assignToMe", countStateTaskAssignToMe);
            return reportResponse;
        } finally {
            databaseHelper.closeConnection();
        }
    }
}

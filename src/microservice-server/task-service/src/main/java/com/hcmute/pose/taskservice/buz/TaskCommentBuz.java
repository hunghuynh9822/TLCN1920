package com.hcmute.pose.taskservice.buz;

import com.hcmute.pose.taskservice.model.TaskComments;
import com.hcmute.pose.taskservice.payload.TaskCommentRequest;

import java.util.List;
import java.util.Optional;

public interface TaskCommentBuz {
    Optional<TaskComments> createTC (TaskCommentRequest taskCommentRequest) ;
    List<TaskComments> getListTC (Long taskId);
    void updateTC (Long taskId, Long employeeId, String comment);
}

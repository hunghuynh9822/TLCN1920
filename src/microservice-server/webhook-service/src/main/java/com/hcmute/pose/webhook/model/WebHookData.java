package com.hcmute.pose.webhook.model;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;

public class WebHookData implements Serializable {
    @SerializedName("id_webhook")
    private Long id;
    @SerializedName("id_project")
    private Long idPro;
    @SerializedName("bot_token")
    private String botToken;
    @SerializedName("chat_id")
    private String chatId;
    @SerializedName("create_task")
    private boolean createTask;
    @SerializedName("update_task")
    private boolean updateTask;
    @SerializedName("update_state")
    private boolean updateState;

    public WebHookData(Long id, Long idPro, String botToken, String chatId, boolean createTask, boolean updateTask, boolean updateState) {
        this.id = id;
        this.idPro = idPro;
        this.botToken = botToken;
        this.chatId = chatId;
        this.createTask = createTask;
        this.updateTask = updateTask;
        this.updateState = updateState;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdPro() {
        return idPro;
    }

    public void setIdPro(Long idPro) {
        this.idPro = idPro;
    }

    public String getBotToken() {
        return botToken;
    }

    public void setBotToken(String botToken) {
        this.botToken = botToken;
    }

    public String getChatId() {
        return chatId;
    }

    public void setChatId(String chatId) {
        this.chatId = chatId;
    }

    public boolean isCreateTask() {
        return createTask;
    }

    public void setCreateTask(boolean createTask) {
        this.createTask = createTask;
    }

    public boolean isUpdateTask() {
        return updateTask;
    }

    public void setUpdateTask(boolean updateTask) {
        this.updateTask = updateTask;
    }

    public boolean isUpdateState() {
        return updateState;
    }

    public void setUpdateState(boolean updateState) {
        this.updateState = updateState;
    }


}

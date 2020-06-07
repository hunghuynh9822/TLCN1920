package com.hcmute.pose.webhook.payload;

public class WebHookRequest {
    private Long id;
    private Long idPro;
    private String name;
    private String botToken;
    private String chatId;
    private Boolean createTask;
    private Boolean updateTask;
    private Boolean updateState;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getIdPro() {
        return idPro;
    }

    public void setIdPro(Long idPro) {
        this.idPro = idPro;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Boolean getCreateTask() {
        return createTask;
    }

    public void setCreateTask(Boolean createTask) {
        this.createTask = createTask;
    }

    public Boolean getUpdateTask() {
        return updateTask;
    }

    public void setUpdateTask(Boolean updateTask) {
        this.updateTask = updateTask;
    }

    public Boolean getUpdateState() {
        return updateState;
    }

    public void setUpdateState(Boolean updateState) {
        this.updateState = updateState;
    }



}

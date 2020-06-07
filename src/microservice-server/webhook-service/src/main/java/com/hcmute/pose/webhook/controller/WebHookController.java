package com.hcmute.pose.webhook.controller;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.webhook.buz.WebHookBuz;
import com.hcmute.pose.webhook.model.WebHookData;
import com.hcmute.pose.webhook.payload.AllWebHookReponse;
import com.hcmute.pose.webhook.payload.WebHookRequest;
import com.hcmute.pose.webhook.payload.WebHookRequestSendNotify;
import okhttp3.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;
import java.io.IOException;

@RestController
@RequestMapping("/api/webhook")
public class WebHookController {
    private static Logger LOGGER = LoggerFactory.getLogger(WebHookController.class);

    static OkHttpClient client = new OkHttpClient();
    @Autowired
    private WebHookBuz webHookBuz;

    @GetMapping("/")
    public ResponseEntity testApi(){
        return new ResponseEntity("This is GET method WebHook", HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity getProjectOfEmployee(){
        try{
            AllWebHookReponse allWebHookReponse = webHookBuz.getListWebhook();
            return new ResponseEntity(allWebHookReponse, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{projectId}/all")
    public ResponseEntity getWebhookByPro(@PathVariable("projectId") Long projectId){
        try{
            AllWebHookReponse allWebHookReponse = webHookBuz.getWebhook(projectId);
            return new ResponseEntity(allWebHookReponse, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/create")
    public ResponseEntity createWebhook(@Valid @RequestBody WebHookRequest webHookRequest){
        try{
            WebHookData webHookData = webHookBuz.createWebhook(webHookRequest);
            return new ResponseEntity(webHookData, HttpStatus.OK);
        }catch (Exception | TransactionException e){
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateWebhook(@Valid @RequestBody WebHookRequest request){
        try{
            webHookBuz.updateWebhook(request);
            String message = String.format("Update project %d successfully", request.getId());
            return new ResponseEntity<>(message, HttpStatus.OK);
        }catch (Exception | TransactionException e){
            String message = String.format("Update project %d failed", request.getId());
            return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/send/create_task")
    public ResponseEntity SendCreateTask(@Valid @RequestBody WebHookRequestSendNotify webHookRequestSendNotify) throws IOException {
        try {
            AllWebHookReponse allWebHookReponse = webHookBuz.getWebhook(webHookRequestSendNotify.getIdPro());
            for (WebHookData webHookData: allWebHookReponse.getWebHookReponseList()) {
                if (webHookData.isCreateTask() == true) {
                    String BASE_URL = "https://api.telegram.org/" + webHookData.getBotToken();
                    okhttp3.RequestBody formBody = new FormBody.Builder()
                            .add("chat_id", webHookData.getChatId())
                            .add("parse_mode" , "HTML")
                            .add("text", "Project : " +webHookRequestSendNotify.getProName()+ "\nUser : "+webHookRequestSendNotify.getUser()+"\nText : "+webHookRequestSendNotify.getData()).build();

                    final Request request = new Request.Builder()
                            .url(BASE_URL + "/sendMessage")
                            .post(formBody).build();

                    final Call call = client.newCall(request);
                    final Response response = call.execute();
                    return new ResponseEntity(response, HttpStatus.OK);
                }
            }
            return new ResponseEntity("Not webhook register", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @PostMapping("/send/update_task")
    public ResponseEntity SendUpdateTask(@Valid @RequestBody WebHookRequestSendNotify webHookRequestSendNotify) throws IOException {
        try {
            AllWebHookReponse allWebHookReponse = webHookBuz.getWebhook(webHookRequestSendNotify.getIdPro());
            for (WebHookData webHookData: allWebHookReponse.getWebHookReponseList()) {
                if (webHookData.isUpdateTask() == true) {
                    String BASE_URL = "https://api.telegram.org/" + webHookData.getBotToken();
                    okhttp3.RequestBody formBody = new FormBody.Builder()
                            .add("chat_id", webHookData.getChatId())
                            .add("parse_mode" , "HTML")
                            .add("text", "Project : " +webHookRequestSendNotify.getProName()+ "\nUser : "+webHookRequestSendNotify.getUser()+"\nText : "+webHookRequestSendNotify.getData()).build();

                    final Request request = new Request.Builder()
                            .url(BASE_URL + "/sendMessage")
                            .post(formBody).build();

                    final Call call = client.newCall(request);
                    final Response response = call.execute();
                    return new ResponseEntity(response, HttpStatus.OK);
                }
            }
            return new ResponseEntity("Not webhook register", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @PostMapping("/send/update_state")
    public ResponseEntity SendUpdateState(@Valid @RequestBody WebHookRequestSendNotify webHookRequestSendNotify) throws IOException {
        try {
            AllWebHookReponse allWebHookReponse = webHookBuz.getWebhook(webHookRequestSendNotify.getIdPro());
            for (WebHookData webHookData: allWebHookReponse.getWebHookReponseList()) {
                if (webHookData.isUpdateState() == true) {
                    String BASE_URL = "https://api.telegram.org/" + webHookData.getBotToken();
                    okhttp3.RequestBody formBody = new FormBody.Builder()
                            .add("chat_id", webHookData.getChatId())
                            .add("parse_mode" , "HTML")
                            .add("text", "Project : " +webHookRequestSendNotify.getProName()+ "\nUser : "+webHookRequestSendNotify.getUser()+"\nText : "+webHookRequestSendNotify.getData()).build();

                    final Request request = new Request.Builder()
                            .url(BASE_URL + "/sendMessage")
                            .post(formBody).build();

                    final Call call = client.newCall(request);
                    final Response response = call.execute();
                    return new ResponseEntity(response, HttpStatus.OK);
                }
            }
            return new ResponseEntity("Not webhook register", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}

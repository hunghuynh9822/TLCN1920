package com.hcmute.pose.webhook.controller;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.webhook.buz.WebHookBuz;
import com.hcmute.pose.webhook.payload.WebHookRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/webhook")
public class WebHookController {
    private static Logger LOGGER = LoggerFactory.getLogger(WebHookController.class);
    @Autowired
    private WebHookBuz webHookBuz;

    @GetMapping("/")
    public ResponseEntity testApi(){
        return new ResponseEntity("This is GET method WebHook", HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity createProject(@Valid @RequestBody WebHookRequest webHookRequest){
        return new ResponseEntity("This is POST method WebHook", HttpStatus.OK);
    }
}

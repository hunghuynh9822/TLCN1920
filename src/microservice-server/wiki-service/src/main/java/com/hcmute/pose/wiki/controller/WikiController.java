package com.hcmute.pose.wiki.controller;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.wiki.buz.WikiBuz;
import com.hcmute.pose.wiki.payload.request.WikiRequest;
import com.hcmute.pose.wiki.payload.response.WikiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/wiki")
public class WikiController {
    private static Logger LOGGER = LoggerFactory.getLogger(WikiController.class);
    @Autowired
    private WikiBuz wikiBuz;

    @GetMapping("/test")
    public ResponseEntity testApi(){
        return new ResponseEntity("Test successfully", HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity createProject(@Valid @RequestBody WikiRequest wikiRequest) {
        try {
            WikiResponse wikiResponse = wikiBuz.createWiki(wikiRequest);
            return new ResponseEntity(wikiResponse, HttpStatus.OK);
        } catch (Exception | TransactionException e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}

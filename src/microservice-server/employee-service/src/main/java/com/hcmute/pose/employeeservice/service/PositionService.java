package com.hcmute.pose.employeeservice.service;

import com.hcmute.pose.employeeservice.exception.DatabaseException;
import com.hcmute.pose.employeeservice.model.Position;
import com.hcmute.pose.employeeservice.model.Role;

import java.sql.SQLException;
import java.util.Set;

public interface PositionService {
    Position createPosition(String name) throws DatabaseException;
    Position findByName(String name) throws DatabaseException;
    Position findById(Long id) throws DatabaseException;
}

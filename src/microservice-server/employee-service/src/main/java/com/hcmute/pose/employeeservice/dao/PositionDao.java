package com.hcmute.pose.employeeservice.dao;

import com.hcmute.pose.employeeservice.exception.DatabaseException;
import com.hcmute.pose.employeeservice.model.Position;
import com.hcmute.pose.employeeservice.model.Role;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface PositionDao {
    List<Position> getAllPosition() throws SQLException;
    Optional<Position> createPosition(String name) throws DatabaseException;
    Optional<Position> findByName(String name);
    Optional<Position> findById(Long id);
}

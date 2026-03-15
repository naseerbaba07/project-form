package com.example.myapp.repo;

import com.example.myapp.entity.DataEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DataRepository extends JpaRepository<DataEntity, Long> {
    boolean existsByRollno(String rollno);

}
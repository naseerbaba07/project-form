package com.example.myapp.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "data_table")
public class DataEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "roll_no", nullable = false, unique = true)
    private String rollno;

    @Column(name = "section", nullable = false, unique = true)
    private String section;

    @Column(name = "abstract_name", nullable = false, unique = true)
    private String abstractname;

    @Column(name = "github_url", nullable = false, unique = true)
    private String github;

    @Column(name = "frontend", nullable = false, unique = true)
    private String frontend;

    @Column(name = "backend", nullable = false, unique = true)
    private String backend;
}
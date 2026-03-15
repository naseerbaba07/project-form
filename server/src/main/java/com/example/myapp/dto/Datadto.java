package com.example.myapp.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class Datadto {
    private Long id;
    @NotBlank(message = "Roll number is required")
    private String rollno;
    @NotBlank(message = "section is required")
    private String section;
    @NotBlank(message = "abstract is required")
    private String abstractname;
    @NotBlank(message = "github url is required")
    @Pattern(
        regexp = "^(http|https)://.*$",
        message = "Github link must start with http:// or https://"
    )
    private String github;
    @NotBlank(message = "frontend urlis required")
    @Pattern(
        regexp = "^(http|https)://.*$",
        message = "frontend link must start with http:// or https://"
    )
    private String frontend;
    @NotBlank(message = "backend url is required")
    @Pattern(
        regexp = "^(http|https)://.*$",
        message = "backend link must start with http:// or https://"
    )
    private String backend;
}

package com.fortunatis.estateservice.controller;

import com.fortunatis.estateservice.enums.FileUploadType;
import com.fortunatis.estateservice.service.FileStoreService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/v1/upload")
@RequiredArgsConstructor
@Tag(name = "File Upload Controller", description = "User's file upload resource")
public class FileUploadController {
    private final FileStoreService fileStoreService;

    @PostMapping(value = "/single-file")
    @Operation(summary = "Upload single file")
    public ResponseEntity<?> uploadSingleFile(@RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok(fileStoreService.uploadFile(file, FileUploadType.USERS_FILES));
    }

    @PostMapping(value = "/multiple-files")
    @Operation(summary = "Upload multiple files")
    public ResponseEntity<?> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files) {
        return ResponseEntity.ok(fileStoreService.uploadMultipleFiles(files, FileUploadType.USERS_FILES));
    }
}

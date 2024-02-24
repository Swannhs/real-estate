package com.fortunatis.estateservice.service;

import com.fortunatis.estateservice.enums.FileUploadType;
import com.fortunatis.estateservice.pojo.response.FileStoreResponseDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FileStoreService {
    List<FileStoreResponseDto> uploadMultipleFiles(MultipartFile[] files, FileUploadType uploadType);
    FileStoreResponseDto uploadFile(MultipartFile file, FileUploadType uploadType);
    String getStoragePath(FileUploadType uploadType);
    void deleteFile(String fileName, FileUploadType uploadType);
}

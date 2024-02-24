package com.fortunatis.estateservice.service.Impl;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.fortunatis.estateservice.config.ServiceProperties;
import com.fortunatis.estateservice.enums.FileUploadType;
import com.fortunatis.estateservice.pojo.response.FileStoreResponseDto;
import com.fortunatis.estateservice.service.FileStoreService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class FileStoreServiceImpl implements FileStoreService {
    @Value("${cloud.aws.s3.bucket}")
    private String s3BucketName;
    private final ServiceProperties serviceProperties;
    private final AmazonS3 amazonS3;

    @Override
    public List<FileStoreResponseDto> uploadMultipleFiles(MultipartFile[] files, FileUploadType uploadType) {
        List<FileStoreResponseDto> fileStorageDTOList = new ArrayList<>();
        for (MultipartFile file : files) {
            fileStorageDTOList.add(uploadFile(file, uploadType));
        }
        return fileStorageDTOList;
    }

    @Override
    public FileStoreResponseDto uploadFile(MultipartFile file, FileUploadType uploadType) {
        FileStoreResponseDto fileStorageDTO = new FileStoreResponseDto();

        fileStorageDTO.setFileOriginalName(file.getOriginalFilename());
        fileStorageDTO.setFileSize(file.getSize());
        fileStorageDTO.setFileExtension(StringUtils.getFilenameExtension(file.getOriginalFilename()));
        fileStorageDTO.setFileModifiedName(modifiedNameBuilder(file.getOriginalFilename()));

        ObjectMetadata objectMetadata = new ObjectMetadata();
        if (file.getContentType() != null) {
            objectMetadata.setContentType(file.getContentType());
        }

        try {
            amazonS3.putObject(
                    s3BucketName,
                    getStoragePath(uploadType) + fileStorageDTO.getFileModifiedName(),
                    file.getInputStream(),
                    objectMetadata
            );
            fileStorageDTO.setIsUploadSuccess(true);
        } catch (IOException e) {
            fileStorageDTO.setIsUploadSuccess(false);
            log.warn(e.getMessage(), e);
        }
        return fileStorageDTO;
    }

    @Override
    public String getStoragePath(FileUploadType uploadType) {
        String dir = switch (uploadType) {
            case ADMIN_FILES -> serviceProperties.getFileStorage().getAdminDir();
            case USERS_FILES -> serviceProperties.getFileStorage().getUsersDir();
        };
        if (!new File(dir).exists()) {
            new File(dir).mkdirs();
        }
        return dir;
    }

    @Override
    public void deleteFile(String fileName, FileUploadType uploadType) {
        try {
            amazonS3.deleteObject(s3BucketName, fileName);
        } catch (Exception e) {
            log.info(e.getMessage(), e);
        }
    }

    private String modifiedNameBuilder(String originalFileName) {
        return System.currentTimeMillis() + "_" + originalFileName.toLowerCase();
    }
}
